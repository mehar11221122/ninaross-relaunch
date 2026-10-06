import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, pred, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "exported-images", "page-images", "dist"].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

const urls = [
  "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291375/ninaross/landing/img/trichologist-scalp-scope-exam-clinic-nina-ross-atlanta.jpg",
  "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/dr-nina-ross-nd-portrait-logo-scrubs-nina-ross-atlanta.png",
];
for (const u of urls) {
  const r = await fetch(u, { method: "HEAD" });
  console.log(r.status, u);
}

const re = /(?:src|srcset|imagesrcset|content|href)=["']([^"']+)["']/gi;
let leftover = 0;
for (const file of walk(path.join(ROOT, "public"), (f) => f.endsWith(".html"))) {
  const t = fs.readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(t))) {
    const val = m[1];
    const parts = val.includes(",") ? val.split(",").map((p) => p.trim().split(/\s+/)[0]) : [val];
    for (const p of parts) {
      if (!/\.(webp|png|jpe?g|gif|svg|avif)(?:\?|$)/i.test(p)) continue;
      if (p.startsWith("https://res.cloudinary.com/")) continue;
      leftover++;
      if (leftover <= 20) console.log("LEFTOVER", path.relative(ROOT, file), p);
    }
  }
}
console.log("public leftover image attrs", leftover);

let srcLeftover = 0;
for (const file of walk(path.join(ROOT, "src"), (f) => /\.(ts|tsx|js|html)$/.test(f))) {
  const t = fs.readFileSync(file, "utf8");
  if (/preview--ninarosshair|\/__l5e\//.test(t)) {
    srcLeftover++;
    console.log("SRC leftover host", path.relative(ROOT, file));
  }
}
console.log("src files with lovable host", srcLeftover);
