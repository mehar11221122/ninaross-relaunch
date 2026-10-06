import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== "node_modules") walk(full, acc);
    else if (/\.(ts|tsx)$/.test(ent.name)) acc.push(full);
  }
  return acc;
}

const re = /^const \w+ = "https:\/\/preview--ninarosshair\.lovable\.app[^"]+";\n/;
let n = 0;
for (const file of walk(path.join(ROOT, "src"))) {
  let t = fs.readFileSync(file, "utf8");
  const consts = [];
  while (true) {
    const m = t.match(re);
    if (!m) {
      const idx = t.search(/^const \w+ = "https:\/\/preview--ninarosshair\.lovable\.app/m);
      if (idx < 0) break;
      const lineEnd = t.indexOf("\n", idx);
      consts.push(t.slice(idx, lineEnd + 1));
      t = t.slice(0, idx) + t.slice(lineEnd + 1);
      continue;
    }
    break;
  }
  // collect all remaining image const lines anywhere near the top
  const all = [...t.matchAll(/^const \w+ = "https:\/\/preview--ninarosshair\.lovable\.app[^"]+";\n/gm)];
  if (!all.length && !consts.length) continue;
  for (const m of all) consts.push(m[0]);
  t = t.replace(/^const \w+ = "https:\/\/preview--ninarosshair\.lovable\.app[^"]+";\n/gm, "");
  const lines = t.split("\n");
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i]) || /^import["']/.test(lines[i])) lastImport = i;
  }
  const block = consts.map((c) => c.replace(/\n$/, ""));
  if (lastImport < 0) t = block.join("\n") + "\n" + t;
  else {
    lines.splice(lastImport + 1, 0, "", ...block);
    t = lines.join("\n");
  }
  fs.writeFileSync(file, t);
  n++;
}
console.log("reordered", n);
