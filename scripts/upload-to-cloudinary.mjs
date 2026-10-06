// Upload every local site image to Cloudinary and write a rewrite map.
// Requires CLOUDINARY_* in .env (loaded from repo root).
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = path.join(ROOT, "exported-images", "cloudinary-map.json");
const CONCURRENCY = 4;

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

loadEnv();

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
if (!CLOUD || !API_KEY || !API_SECRET) {
  console.error("Missing CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET in .env");
  process.exit(1);
}

function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

function sign(params) {
  const str =
    Object.keys(params)
      .filter((k) => params[k] !== undefined && params[k] !== "")
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&") + API_SECRET;
  return crypto.createHash("sha1").update(str).digest("hex");
}

async function uploadFile(localPath, publicId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { public_id: publicId, overwrite: "true", timestamp };
  const signature = sign(params);
  const form = new FormData();
  const buf = fs.readFileSync(localPath);
  form.append("file", new Blob([buf]), path.basename(localPath));
  form.append("api_key", API_KEY);
  form.append("timestamp", String(timestamp));
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: "POST",
    body: form,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON ${res.status}: ${text.slice(0, 200)}`);
  }
  if (!res.ok) throw new Error(`${publicId}: ${json.error?.message || text.slice(0, 200)}`);
  return json.secure_url;
}

function stripExt(p) {
  return p.replace(/\.[^.]+$/, "");
}

/** @type {{ uploads: Array<{keys: string[], publicId: string, local: string, url?: string, error?: string}> }} */
const jobs = [];

// Public folder images → keys like /landing/img/foo.webp
for (const file of walk(path.join(ROOT, "public"), (f) => /\.(webp|png|jpe?g|gif|svg|avif)$/i.test(f))) {
  const sitePath = "/" + path.relative(path.join(ROOT, "public"), file).replace(/\\/g, "/");
  const publicId = "ninaross" + stripExt(sitePath);
  jobs.push({
    keys: [sitePath],
    publicId,
    local: file,
  });
}

// Lovable exported assets
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "exported-images", "manifest.json"), "utf8"));
for (const item of manifest.files) {
  if (item.status !== "ok" && item.status !== "skip") continue;
  const local = path.join(ROOT, "exported-images", item.destRel);
  if (!fs.existsSync(local)) {
    console.warn("missing export", item.destRel);
    continue;
  }
  const publicId = "ninaross/lovable/" + stripExt(item.destRel.replace(/\\/g, "/"));
  const keys = [];
  if (item.lovableUrl) keys.push(item.lovableUrl);
  if (item.url) keys.push(item.url);
  // Also map bare filename when unique later
  jobs.push({ keys, publicId, local, filename: path.basename(item.destRel) });
}

// Resume from existing map
let existing = { byKey: {}, uploads: [] };
if (fs.existsSync(MAP_PATH)) {
  try {
    existing = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  } catch {}
}

const already = new Map(Object.entries(existing.byKey || {}));
let done = 0;
let skipped = 0;
let failed = 0;

async function runPool(items, n, worker) {
  let i = 0;
  async function next() {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: n }, () => next()));
}

console.log(`Uploading ${jobs.length} images to cloud ${CLOUD}…`);

await runPool(jobs, CONCURRENCY, async (job) => {
  const cached = job.keys.find((k) => already.has(k));
  if (cached && already.get(cached)) {
    job.url = already.get(cached);
    skipped++;
    return;
  }
  // Also skip if publicId already mapped via any key with same url stored under publicId index
  try {
    const url = await uploadFile(job.local, job.publicId);
    job.url = url;
    for (const k of job.keys) already.set(k, url);
    done++;
    if ((done + skipped) % 20 === 0) console.log(`  progress ${done + skipped}/${jobs.length} (ok ${done}, skip ${skipped}, fail ${failed})`);
  } catch (e) {
    job.error = String(e.message || e);
    failed++;
    console.error("FAIL", job.publicId, job.error);
  }
});

const byKey = {};
for (const job of jobs) {
  if (!job.url) continue;
  for (const k of job.keys) byKey[k] = job.url;
}

// Filename → url only when unique across all uploads
const byFilename = {};
const fnameCount = new Map();
for (const job of jobs) {
  if (!job.url) continue;
  const name = path.basename(job.local).toLowerCase();
  fnameCount.set(name, (fnameCount.get(name) || 0) + 1);
}
for (const job of jobs) {
  if (!job.url) continue;
  const name = path.basename(job.local).toLowerCase();
  if (fnameCount.get(name) === 1) byFilename[name] = job.url;
}

const out = {
  cloud: CLOUD,
  uploadedAt: new Date().toISOString(),
  totals: { jobs: jobs.length, uploaded: done, skipped, failed },
  byKey,
  byFilename,
  uploads: jobs.map((j) => ({
    publicId: j.publicId,
    local: path.relative(ROOT, j.local).replace(/\\/g, "/"),
    keys: j.keys,
    url: j.url || null,
    error: j.error || null,
  })),
};

fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
fs.writeFileSync(MAP_PATH, JSON.stringify(out, null, 2));
console.log(`Wrote ${MAP_PATH}`);
console.log(out.totals);
if (failed) process.exit(1);
