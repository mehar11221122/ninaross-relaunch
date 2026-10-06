// Download every Lovable cloud image from src/assets .asset.json sidecars
// into exported-images/ for Cloudinary upload.
//
// Usage:
//   node scripts/download-lovable-assets.mjs
//   LOVABLE_HOST=https://preview--ninarosshair.lovable.app node scripts/download-lovable-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = (process.env.LOVABLE_HOST || "https://preview--ninarosshair.lovable.app").replace(/\/$/, "");
const OUT = path.join(ROOT, "exported-images");
const MANIFEST = path.join(OUT, "manifest.json");
const CONCURRENCY = 8;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.endsWith(".asset.json")) out.push(full);
  }
  return out;
}

async function fetchOne(meta, destRel) {
  const url = HOST + meta.url;
  const dest = path.join(OUT, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { status: "skip", destRel, url, bytes: fs.statSync(dest).size };
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { status: "ok", destRel, url, bytes: buf.length, contentType: res.headers.get("content-type") };
}

const assets = walk(path.join(ROOT, "src", "assets")).map((f) => {
  const meta = JSON.parse(fs.readFileSync(f, "utf8"));
  const filename = path.basename(meta.url || meta.original_filename);
  // Keep folder structure under src/assets for easy mapping later
  const relDir = path.relative(path.join(ROOT, "src", "assets"), path.dirname(f));
  const destRel = path.join(relDir, filename).replace(/\\/g, "/");
  return { file: path.relative(ROOT, f).replace(/\\/g, "/"), meta, destRel };
});

fs.mkdirSync(OUT, { recursive: true });
console.log(`Host: ${HOST}`);
console.log(`Assets: ${assets.length}`);
console.log(`Out: ${OUT}`);

const results = [];
let i = 0;
async function worker() {
  while (i < assets.length) {
    const idx = i++;
    const a = assets[idx];
    try {
      const r = await fetchOne(a.meta, a.destRel);
      results.push({
        ...r,
        asset_id: a.meta.asset_id,
        sidecar: a.file,
        lovableUrl: a.meta.url,
      });
      const n = results.length;
      if (n % 10 === 0 || n === assets.length) {
        process.stdout.write(`\rDownloaded ${n}/${assets.length}`);
      }
    } catch (err) {
      results.push({
        status: "error",
        destRel: a.destRel,
        sidecar: a.file,
        asset_id: a.meta.asset_id,
        lovableUrl: a.meta.url,
        error: String(err.message || err),
      });
      console.error(`\nFAIL ${a.destRel}: ${err.message || err}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
console.log("\n");

const ok = results.filter((r) => r.status === "ok" || r.status === "skip");
const err = results.filter((r) => r.status === "error");
fs.writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      host: HOST,
      downloadedAt: new Date().toISOString(),
      total: assets.length,
      ok: ok.length,
      errors: err.length,
      files: results.sort((a, b) => a.destRel.localeCompare(b.destRel)),
    },
    null,
    2,
  ),
);

console.log(`OK/skip: ${ok.length}`);
console.log(`Errors: ${err.length}`);
console.log(`Manifest: ${MANIFEST}`);
if (err.length) process.exit(1);
