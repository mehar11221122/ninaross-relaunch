/**
 * Image presence audit: every referenced image vs files on disk.
 * Cloud assets are represented by .asset.json sidecars (binaries live on Lovable CDN).
 * Local images live under public/.
 *
 * Run: node scripts/audit-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_EXT = /\.(webp|png|jpe?g|gif|svg|avif|ico)(?:\?[^"'\s)]*)?$/i;
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".output", ".tanstack", ".nitro", ".wrangler"]);

const findings = { ok: [], missing: [], warnings: [], byPage: {} };

function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, out);
    else if (pred(full, ent.name)) out.push(full);
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, "/");
}

function note(page, status, msg) {
  let bucket = findings.byPage[page];
  if (!bucket) {
    bucket = { ok: [], missing: [], warnings: [] };
    findings.byPage[page] = bucket;
  }
  bucket[status].push(msg);
  findings[status].push(`[${page}] ${msg}`);
}

// --- Index public files ---
const publicRoot = path.join(ROOT, "public");
const publicFiles = new Set(
  walk(publicRoot, (f) => IMG_EXT.test(f)).map((f) =>
    ("/" + path.relative(publicRoot, f).replace(/\\/g, "/")).replace(/\\/g, "/"),
  ),
);

// --- Index asset.json sidecars ---
const assetFiles = walk(path.join(ROOT, "src", "assets"), (f) => f.endsWith(".asset.json"));
const assetsById = new Map(); // asset_id -> meta
const assetsByUrl = new Map();
const assetsByFilename = new Map(); // basename -> [meta]
for (const f of assetFiles) {
  const meta = JSON.parse(fs.readFileSync(f, "utf8"));
  meta._path = rel(f);
  assetsById.set(meta.asset_id, meta);
  if (meta.url) assetsByUrl.set(meta.url, meta);
  const base = path.basename(meta.original_filename || meta.url || f);
  let list = assetsByFilename.get(base);
  if (!list) {
    list = [];
    assetsByFilename.set(base, list);
  }
  list.push(meta);
}

function publicExists(urlPath) {
  const clean = urlPath.split("?")[0];
  return publicFiles.has(clean);
}

function resolveL5e(url) {
  const m = url.match(/^\/__l5e\/assets-v1\/([a-f0-9-]+)\/(.+)$/i);
  if (!m) return { ok: false, reason: "malformed __l5e url" };
  const meta = assetsById.get(m[1]);
  if (!meta) return { ok: false, reason: `no .asset.json for asset_id ${m[1]} (${m[2]})` };
  return { ok: true, meta };
}

function checkLocalOrCloud(ref, page, context) {
  if (!ref || typeof ref !== "string") return;
  const r = ref.trim();
  if (!r || r.startsWith("data:") || r.startsWith("#")) return;
  if (/^https?:\/\//i.test(r)) {
    // External (YouTube thumbs, etc.) — note only, not "missing files"
    if (!/i\.ytimg\.com|youtube\.com|instagram\.com|cdn\.|supabase/i.test(r)) {
      note(page, "warnings", `external URL ${context}: ${r}`);
    }
    return;
  }
  if (r.startsWith("/__l5e/")) {
    const res = resolveL5e(r);
    if (res.ok) note(page, "ok", `cloud asset ${context}: ${r} → ${res.meta._path}`);
    else note(page, "missing", `cloud asset ${context}: ${r} — ${res.reason}`);
    return;
  }
  if (r.startsWith("/")) {
    if (publicExists(r)) note(page, "ok", `public ${context}: ${r}`);
    else note(page, "missing", `public ${context}: ${r} — not in public/`);
    return;
  }
  // relative img/... — caller should resolve; treat bare as warning unless remapped
  note(page, "warnings", `relative path not resolved at check site ${context}: ${r}`);
}

// Extract image-like strings from text
function extractRefs(text) {
  const refs = new Set();
  const add = (s) => {
    if (!s) return;
    // Split srcset / imagesrcset lists: "url 480w, url 720w"
    for (const part of String(s).split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url && /\.(webp|png|jpe?g|gif|svg|avif|ico)(?:\?|$)/i.test(url)) refs.add(url);
      else if (url && url.startsWith("/__l5e/")) refs.add(url);
    }
  };
  const patterns = [
    /(?:src|href|content|poster|srcset|imagesrcset)=["']([^"']+)["']/gi,
    /url\(\s*['"]?([^'")\s]+)['"]?\s*\)/gi,
    /["'](\/__l5e\/assets-v1\/[^"']+)["']/gi,
    /["'](\/(?:landing|landing-2|ccca|trichologist)\/img\/[^"']+)["']/gi,
    /["'](@\/assets\/[^"']+\.asset\.json)["']/gi,
    /from\s+["'](@\/assets\/[^"']+\.asset\.json)["']/gi,
    /["'](img\/[^"']+\.(?:webp|png|jpe?g|gif|svg))["']/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) add(m[1]);
  }
  return [...refs];
}

// --- 1) Verify every .asset.json import path in source ---
const srcCode = walk(
  path.join(ROOT, "src"),
  (f) => /\.(ts|tsx|js|jsx|html|json)$/.test(f) && !f.includes(`${path.sep}assets${path.sep}`),
);

const importRe = /from\s+["'](@\/assets\/[^"']+\.asset\.json)["']/g;
for (const file of srcCode) {
  const text = fs.readFileSync(file, "utf8");
  const page = rel(file);
  let m;
  while ((m = importRe.exec(text))) {
    const importPath = m[1].replace("@/assets/", "src/assets/");
    const abs = path.join(ROOT, importPath);
    if (fs.existsSync(abs)) note(page, "ok", `import exists: ${m[1]}`);
    else note(page, "missing", `import missing: ${m[1]}`);
  }
}

// --- 2) Remap maps in adapters (nr-article, blog-hero, nr-hub, nr-detail, nr-trichology, nr-about, nr-category, nr-videos) ---
function loadRemaps() {
  const remaps = new Map(); // logical key -> resolved url or asset path
  const adapterFiles = [
    "src/lib/nr-article.ts",
    "src/lib/blog-hero.ts",
    "src/lib/nr-hub.ts",
    "src/lib/nr-detail.ts",
    "src/lib/nr-trichology.ts",
    "src/lib/nr-about.ts",
    "src/lib/nr-category.ts",
    "src/lib/nr-videos.ts",
  ];
  for (const af of adapterFiles) {
    const abs = path.join(ROOT, af);
    if (!fs.existsSync(abs)) continue;
    const text = fs.readFileSync(abs, "utf8");
    // "img/foo.png": someImport.url  OR replaceAll("img/foo", x.url)
    for (const m of text.matchAll(/["'](img\/[^"']+)["']\s*:\s*(\w+)\.url/g)) {
      remaps.set(m[1], { via: af, varName: m[2] });
    }
    for (const m of text.matchAll(/replaceAll\(\s*["'](img\/[^"']+)["']/g)) {
      remaps.set(m[1], { via: af, varName: "(replaceAll)" });
    }
    for (const m of text.matchAll(/\.split\(\s*["'](img\/[^"']+)["']\s*\)/g)) {
      remaps.set(m[1], { via: af, varName: "(split)" });
    }
  }
  return remaps;
}
const remaps = loadRemaps();

// --- 3) Static public HTML pages (one by one) ---
const staticPages = [
  { page: "/landing", html: "public/landing/index.html", base: "/landing/" },
  { page: "/landing-2", html: "public/landing-2/index.html", base: "/landing-2/" },
  { page: "/ccca-treatment-atlanta", html: "public/ccca/index.html", base: "/ccca/" },
  { page: "/black-trichologist-atlanta", html: "public/trichologist/index.html", base: "/trichologist/" },
  { page: "/traction-alopecia-treatment-atlanta", html: "public/traction/index.html", base: "/traction/" },
  { page: "/prp-hair-treatment-atlanta", html: "public/prp/index.html", base: "/prp/" },
  { page: "/hair-restoration-sandy-springs", html: "public/sandysprings/index.html", base: "/sandysprings/" },
  { page: "/hair-loss-treatment-atlanta", html: "public/hairloss/index.html", base: "/hairloss/" },
  { page: "/hair-doctor-atlanta", html: "public/hairdoctor/index.html", base: "/hairdoctor/" },
  { page: "/functional-medicine (static kit)", html: "public/functionalmedicine/index.html", base: "/functionalmedicine/" },
  { page: "/alopecia-areata-doctor-atlanta", html: "public/alopecia/index.html", base: "/alopecia/" },
];

for (const sp of staticPages) {
  const abs = path.join(ROOT, sp.html);
  if (!fs.existsSync(abs)) {
    note(sp.page, "missing", `HTML kit missing: ${sp.html}`);
    continue;
  }
  const text = fs.readFileSync(abs, "utf8");
  const refs = extractRefs(text);
  // also CSS url() in linked stylesheets next to the page
  const pageDir = path.dirname(abs);
  const cssFiles = walk(pageDir, (f) => f.endsWith(".css"));
  for (const css of cssFiles) {
    const cssText = fs.readFileSync(css, "utf8");
    for (const r of extractRefs(cssText)) refs.push(r);
  }
  // JS that may set image paths
  const jsFiles = walk(pageDir, (f) => f.endsWith(".js"));
  for (const js of jsFiles) {
    const jsText = fs.readFileSync(js, "utf8");
    for (const r of extractRefs(jsText)) refs.push(r);
  }

  for (const ref of new Set(refs)) {
    if (/^https?:\/\//i.test(ref)) {
      checkLocalOrCloud(ref, sp.page, "html/css/js");
      continue;
    }
    if (ref.startsWith("/__l5e/") || (ref.startsWith("/") && !ref.startsWith("/img"))) {
      checkLocalOrCloud(ref, sp.page, "html/css/js");
      continue;
    }
    // relative: resolve against page base
    let resolved;
    if (ref.startsWith("img/") || ref.startsWith("./img/") || ref.startsWith("../")) {
      resolved = path.posix.normalize(sp.base + ref.replace(/^\.\//, ""));
    } else if (ref.startsWith("/")) {
      resolved = ref;
    } else {
      resolved = path.posix.normalize(sp.base + ref);
    }
    if (resolved.startsWith("/__l5e/")) checkLocalOrCloud(resolved, sp.page, "html/css/js");
    else if (publicExists(resolved)) note(sp.page, "ok", `public: ${ref} → ${resolved}`);
    else if (remaps.has(ref) || remaps.has(ref.replace(/^\.\//, ""))) {
      note(sp.page, "ok", `remapped logical: ${ref}`);
    } else {
      note(sp.page, "missing", `public: ${ref} → ${resolved} — not found`);
    }
  }
}

// --- 4) Content JSON (posts, concerns, treatments, hubs) ---
const contentFiles = walk(path.join(ROOT, "src", "content"), (f) => f.endsWith(".json"));
for (const cf of contentFiles) {
  const page = rel(cf);
  const text = fs.readFileSync(cf, "utf8");
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    note(page, "warnings", "invalid JSON");
    continue;
  }
  const refs = extractRefs(text);
  // also walk known image fields
  const collect = (obj, trail = "") => {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) return obj.forEach((v, i) => collect(v, `${trail}[${i}]`));
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && IMG_EXT.test(v)) refs.push(v);
      else if (typeof v === "object") collect(v, `${trail}.${k}`);
    }
  };
  collect(data);
  for (const ref of new Set(refs)) {
    if (ref.startsWith("img/")) {
      if (remaps.has(ref)) note(page, "ok", `logical hero/image remapped: ${ref}`);
      else note(page, "missing", `logical image key has no remap: ${ref}`);
    } else {
      checkLocalOrCloud(ref, page, "content");
    }
  }
}

// --- 5) React site components + data ---
const reactTargets = [
  ...walk(path.join(ROOT, "src", "components"), (f) => /\.(tsx|ts|jsx|js)$/.test(f)),
  ...walk(path.join(ROOT, "src", "data"), (f) => /\.(tsx|ts|jsx|js)$/.test(f)),
  ...walk(path.join(ROOT, "src", "lib"), (f) => /\.(tsx|ts|jsx|js|html)$/.test(f)),
  ...walk(path.join(ROOT, "src", "routes"), (f) => /\.(tsx|ts)$/.test(f)),
];

for (const file of reactTargets) {
  const page = rel(file);
  const text = fs.readFileSync(file, "utf8");
  // skip already-checked import paths; check string literals
  for (const ref of extractRefs(text)) {
    if (ref.endsWith(".asset.json") || ref.startsWith("@/assets/")) continue;
    if (ref.startsWith("img/")) {
      if (remaps.has(ref)) note(page, "ok", `logical remapped: ${ref}`);
      else {
        // templates may leave placeholders that adapters rewrite — still flag if never remapped
        note(page, "missing", `logical image key has no remap: ${ref}`);
      }
      continue;
    }
    checkLocalOrCloud(ref, page, "source");
  }
}

// --- 6) (hardcoded __l5e covered by source scan of nr-render.js) ---

// --- 7) Orphan check: public images never referenced? (informational) ---
const referencedPublic = new Set();
for (const line of findings.ok) {
  const m = line.match(/public(?:[^:]*):\s*(\/[^ ]+)/);
  if (m) referencedPublic.add(m[1].replace(/→.*$/, "").trim().split("→").pop().trim());
  const m2 = line.match(/→\s*(\/(?:landing|landing-2|ccca|trichologist)\/img\/\S+)/);
  if (m2) referencedPublic.add(m2[1]);
  const m3 = line.match(/public[^:]*:\s*(\/(?:landing|landing-2|ccca|trichologist|favicon)[^\s,]*)/);
  if (m3) referencedPublic.add(m3[1]);
}
// Better: re-scan all findings for absolute public paths
const allText = [...findings.ok, ...findings.missing].join("\n");
for (const p of publicFiles) {
  if (allText.includes(p)) referencedPublic.add(p);
}
const unusedPublic = [...publicFiles].filter((p) => !referencedPublic.has(p) && p !== "/favicon.ico");

// --- 8) Unused asset.json (never imported) ---
const importedAssets = new Set();
for (const line of findings.ok) {
  const m = line.match(/import exists: (@\/assets\/\S+\.asset\.json)/);
  if (m) importedAssets.add(m[1].replace("@/assets/", "src/assets/"));
}
const unusedAssets = assetFiles
  .map(rel)
  .filter((p) => ![...importedAssets].some((i) => i.replace(/\\/g, "/") === p));

// --- Report ---
const pages = Object.keys(findings.byPage).sort();
let report = [];
report.push("# Image presence audit");
report.push(`Root: ${ROOT}`);
report.push(`Public images on disk: ${publicFiles.size}`);
report.push(`Cloud asset sidecars (.asset.json): ${assetFiles.length}`);
report.push(`Pages/modules checked: ${pages.length}`);
report.push("");
report.push(`## Totals`);
report.push(`- OK checks: ${findings.ok.length}`);
report.push(`- MISSING: ${findings.missing.length}`);
report.push(`- WARNINGS: ${findings.warnings.length}`);
report.push(`- Unused public images (not referenced in scanned sources): ${unusedPublic.length}`);
report.push(`- Unused .asset.json (not imported): ${unusedAssets.length}`);
report.push("");

if (findings.missing.length) {
  report.push("## MISSING (action needed)");
  for (const m of findings.missing) report.push(`- ${m}`);
  report.push("");
} else {
  report.push("## MISSING");
  report.push("None — every referenced image resolved to a public file or .asset.json sidecar.");
  report.push("");
}

if (findings.warnings.length) {
  report.push("## Warnings");
  for (const w of findings.warnings) report.push(`- ${w}`);
  report.push("");
}

report.push("## Page-by-page");
for (const page of pages) {
  const b = findings.byPage[page];
  const miss = b.missing.length;
  const status = miss ? `FAIL (${miss} missing)` : "PASS";
  report.push(`### ${page} — ${status}`);
  report.push(`- ok: ${b.ok.length}, missing: ${b.missing.length}, warnings: ${b.warnings.length}`);
  for (const m of b.missing) report.push(`  - MISSING: ${m}`);
  report.push("");
}

if (unusedPublic.length) {
  report.push("## Unused public images (informational)");
  for (const p of unusedPublic.sort()) report.push(`- ${p}`);
  report.push("");
}

if (unusedAssets.length) {
  report.push("## Unused .asset.json sidecars (informational)");
  for (const p of unusedAssets.sort()) report.push(`- ${p}`);
  report.push("");
}

const outPath = path.join(ROOT, "scripts", "image-audit-report.md");
fs.writeFileSync(outPath, report.join("\n"));
console.log(report.join("\n"));
console.log(`\nWrote ${outPath}`);
process.exit(findings.missing.length ? 1 : 0);
