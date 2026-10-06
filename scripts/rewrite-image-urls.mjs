// Rewrite site images from .asset.json / relative paths to absolute URLs.
// Origin: https://preview--ninarosshair.lovable.app  (swap later to Cloudinary)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://preview--ninarosshair.lovable.app";

function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "exported-images", "page-images", "dist"].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

function abs(p) {
  if (!p) return p;
  if (/^(https?:|data:)/i.test(p)) return p;
  return ORIGIN + (p.startsWith("/") ? p : "/" + p);
}

const assets = walk(path.join(ROOT, "src", "assets"), (f) => f.endsWith(".asset.json")).map((f) => {
  const meta = JSON.parse(fs.readFileSync(f, "utf8"));
  return {
    sidecar: path.relative(ROOT, f).replace(/\\/g, "/"),
    importPath: "@/assets/" + path.relative(path.join(ROOT, "src", "assets"), f).replace(/\\/g, "/"),
    url: abs(meta.url),
    pathUrl: meta.url,
    filename: path.basename(meta.url || meta.original_filename),
    id: meta.asset_id,
  };
});
const byImport = new Map(assets.map((a) => [a.importPath, a]));
const byId = new Map(assets.map((a) => [a.id, a]));
const byFile = new Map(assets.map((a) => [a.filename.toLowerCase(), a]));

function rewriteTs(file) {
  let text = fs.readFileSync(file, "utf8");
  const names = [];
  text = text.replace(
    /import\s+(\w+)\s+from\s+["'](@\/assets\/[^"']+\.asset\.json)["'];?\n/g,
    (_, name, spec) => {
      const a = byImport.get(spec);
      if (!a) throw new Error(`Unknown asset import ${spec} in ${file}`);
      names.push(name);
      return `const ${name} = ${JSON.stringify(a.url)};\n`;
    },
  );
  if (!names.length) return false;
  for (const n of names) {
    text = text.replaceAll(`${n}.url`, n);
  }
  text = text.replace(/\$\{HOST\}\$\{(\w+)\}/g, (m, n) => (names.includes(n) ? `\${${n}}` : m));
  fs.writeFileSync(file, text);
  return true;
}

function rewriteHtmlish(file) {
  let text = fs.readFileSync(file, "utf8");
  const orig = text;

  text = text.replace(
    /(https?:\/\/[^"'?\s]*)?\/__l5e\/assets-v1\/([a-f0-9-]+)\/([^"'?\s)]+)/gi,
    (_all, _host, id, rest) => {
      const hit = byId.get(id) || byFile.get(path.basename(rest).toLowerCase());
      const pathUrl = hit ? hit.pathUrl : `/__l5e/assets-v1/${id}/${rest}`;
      return abs(pathUrl);
    },
  );

  // Files in public/ stay site-relative (/landing/img/...). Only /__l5e/ is hosted on the preview origin.

  if (text !== orig) fs.writeFileSync(file, text);
  return text !== orig;
}

let tsCount = 0;
for (const f of walk(path.join(ROOT, "src"), (p) => /\.(ts|tsx)$/.test(p))) {
  if (rewriteTs(f)) tsCount++;
}

let htmlCount = 0;
for (const f of walk(ROOT, (p) => /\.(html|js|ts|tsx)$/.test(p) && !p.includes(`${path.sep}scripts${path.sep}`))) {
  if (f.includes(`${path.sep}cdn.ts`)) continue;
  if (rewriteHtmlish(f)) htmlCount++;
}

console.log(`Converted asset.json imports in ${tsCount} TS files`);
console.log(`Prefixed image paths in ${htmlCount} html/js/ts files`);
