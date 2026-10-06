// Rewrite image URLs in the codebase to Cloudinary using exported-images/cloudinary-map.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP = JSON.parse(fs.readFileSync(path.join(ROOT, "exported-images", "cloudinary-map.json"), "utf8"));
const ORIGIN = "https://preview--ninarosshair.lovable.app";

function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "exported-images", "page-images", "dist", ".output"].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

/** Build longest-first replacement list */
const pairs = [];
for (const [from, to] of Object.entries(MAP.byKey || {})) {
  if (!from || !to) continue;
  pairs.push([from, to]);
  // Also map preview-origin + site path for public images that might still be absolute
  if (from.startsWith("/") && !from.startsWith("/__l5e/")) {
    pairs.push([ORIGIN + from, to]);
  }
  if (from.startsWith("/__l5e/")) {
    pairs.push([ORIGIN + from, to]);
  }
}
pairs.sort((a, b) => b[0].length - a[0].length);

const uniquePairs = [];
const seen = new Set();
for (const [from, to] of pairs) {
  if (seen.has(from)) continue;
  seen.add(from);
  uniquePairs.push([from, to]);
}

function rewriteText(text) {
  let out = text;
  let n = 0;
  for (const [from, to] of uniquePairs) {
    if (!out.includes(from)) continue;
    const parts = out.split(from);
    if (parts.length > 1) {
      n += parts.length - 1;
      out = parts.join(to);
    }
  }
  // Strip ?v=N after cloudinary URLs accidentally left attached from site paths
  out = out.replace(
    /(https:\/\/res\.cloudinary\.com\/[^"'?\s]+)\?v=\d+/g,
    "$1",
  );
  return { out, n };
}

const files = walk(ROOT, (f, name) =>
  /\.(html|js|ts|tsx|css|json|mjs)$/.test(name) && !f.includes(`${path.sep}scripts${path.sep}`),
);

let fileCount = 0;
let replaceCount = 0;
for (const file of files) {
  // Skip the map itself and package lock noise
  if (file.endsWith("cloudinary-map.json") || file.endsWith("package-lock.json")) continue;
  const text = fs.readFileSync(file, "utf8");
  const { out, n } = rewriteText(text);
  if (n > 0 && out !== text) {
    fs.writeFileSync(file, out);
    fileCount++;
    replaceCount += n;
    console.log(`${n}\t${path.relative(ROOT, file)}`);
  }
}

console.log(`Updated ${fileCount} files, ${replaceCount} replacements, ${uniquePairs.length} map keys`);
