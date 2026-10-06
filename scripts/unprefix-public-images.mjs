import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://preview--ninarosshair.lovable.app";
const RE = /https:\/\/preview--ninarosshair\.lovable\.app(\/(?:landing|landing-2|ccca|trichologist)\/img\/)/g;

function walk(dir, pred, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "exported-images", "page-images", "dist"].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

let files = 0;
let hits = 0;
for (const file of walk(ROOT, (f) => /\.(html|js|ts|tsx|css)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  const next = text.replace(RE, (_, p) => {
    hits++;
    return p;
  });
  if (next !== text) {
    fs.writeFileSync(file, next);
    files++;
  }
}
console.log("files", files, "replacements", hits, "origin", ORIGIN);
