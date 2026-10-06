import fs from "node:fs";
const html = fs.readFileSync("public/landing/index.html", "utf8");
const sections = [...html.matchAll(/<!--\s*=+\s*(.*?)\s*=+\s*-->/g)].map((m) => m[1].trim());
console.log("markers", sections.length);
sections.forEach((s, i) => console.log(String(i + 1).padStart(2), s));
const ids = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
console.log("ids", [...new Set(ids)].join(", "));
