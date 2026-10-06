// Sort every page's images into page-images/<page>/ numbered in on-page order.
// Sources: route HTML kits, adapter remaps, content JSON, React blog index.
//
// Run: node scripts/organize-page-images.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "page-images");
const EXPORTED = path.join(ROOT, "exported-images");
const PUBLIC = path.join(ROOT, "public");
const HOSTS = ["https://www.ninaross.co", "http://www.ninaross.co", "https://ninaross.co"];

function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, acc);
    else if (pred(full, ent.name)) acc.push(full);
  }
  return acc;
}

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

function loadJson(p) {
  return JSON.parse(read(p));
}

function stem(name) {
  return path.basename(name).replace(/\.[^.]+$/, "").replace(/-(480|720|960)$/, "");
}

function isImageUrl(u) {
  if (!u) return false;
  const c = u.split("?")[0].split("#")[0];
  if (/\.(woff2?|ttf|otf|eot|css|js|html|json|map)$/i.test(c)) return false;
  return (
    /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i.test(c) ||
    c.includes("/__l5e/assets-v1/") ||
    /i\.ytimg\.com\//.test(c)
  );
}

function extractOrderedUrls(html) {
  const out = [];
  const re =
    /(?:src|srcset|imagesrcset|content|poster)=["']([^"']+)["']|url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1] || m[2] || "";
    for (const part of raw.split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (isImageUrl(url)) out.push(url);
    }
  }
  return out;
}

// --- asset lookups ---
const assets = walk(path.join(ROOT, "src", "assets"), (f) => f.endsWith(".asset.json")).map((f) => {
  const meta = JSON.parse(fs.readFileSync(f, "utf8"));
  const relDir = path.relative(path.join(ROOT, "src", "assets"), path.dirname(f)).replace(/\\/g, "/");
  const filename = path.basename(meta.url || meta.original_filename);
  const exportedRel = (relDir ? relDir + "/" : "") + filename;
  const exportedAbs = path.join(EXPORTED, exportedRel.replace(/\//g, path.sep));
  return { meta, sidecar: path.relative(ROOT, f).replace(/\\/g, "/"), exportedAbs, exportedRel, filename };
});

const byAssetId = new Map();
const byL5eUrl = new Map();
const byFilename = new Map();
const byStem = new Map();
for (const a of assets) {
  byAssetId.set(a.meta.asset_id, a);
  if (a.meta.url) byL5eUrl.set(a.meta.url, a);
  byFilename.set(a.filename.toLowerCase(), a);
  byStem.set(stem(a.filename).toLowerCase(), a);
  if (a.meta.original_filename) {
    byFilename.set(path.basename(a.meta.original_filename).toLowerCase(), a);
    byStem.set(stem(a.meta.original_filename).toLowerCase(), a);
  }
}

const publicByUrl = new Map();
for (const f of walk(PUBLIC, (p) => /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i.test(p))) {
  const url = "/" + path.relative(PUBLIC, f).replace(/\\/g, "/");
  publicByUrl.set(url, f);
}

function parseAdapterRemaps(relFile) {
  const text = read(relFile);
  const imports = new Map();
  for (const m of text.matchAll(/import\s+(\w+)\s+from\s+["'](@\/assets\/[^"']+\.asset\.json)["']/g)) {
    imports.set(m[1], m[2].replace("@/assets/", "src/assets/"));
  }
  const remaps = {};
  const add = (logical, varName) => {
    const sidecar = imports.get(varName);
    if (!sidecar) return;
    const meta = JSON.parse(fs.readFileSync(path.join(ROOT, sidecar), "utf8"));
    remaps[logical] = meta.url;
  };
  for (const m of text.matchAll(/["'](img\/[^"']+)["']\s*:\s*(\w+)\.url/g)) add(m[1], m[2]);
  for (const m of text.matchAll(/\.split\(\s*["'](img\/[^"']+)["']\s*\)\s*\.join\(\s*(\w+)\.url/g)) add(m[1], m[2]);
  for (const m of text.matchAll(/replaceAll\(\s*["'](img\/[^"']+)["']\s*,\s*(\w+)\.url/g)) add(m[1], m[2]);
  return remaps;
}

const remapArticle = {
  ...parseAdapterRemaps("src/lib/nr-article.ts"),
  ...parseAdapterRemaps("src/lib/blog-hero.ts"),
};
const remapCategory = { ...remapArticle, ...parseAdapterRemaps("src/lib/nr-category.ts") };
const remapAbout = parseAdapterRemaps("src/lib/nr-about.ts");
const remapHub = parseAdapterRemaps("src/lib/nr-hub.ts");
const remapDetail = parseAdapterRemaps("src/lib/nr-detail.ts");
const remapTrichology = parseAdapterRemaps("src/lib/nr-trichology.ts");
const remapDefault = { ...remapArticle, ...remapAbout, ...remapHub, ...remapDetail, ...remapTrichology, ...remapCategory };

let activeRemaps = remapDefault;

function findExported(a) {
  if (a && fs.existsSync(a.exportedAbs)) return a.exportedAbs;
  return null;
}

function resolveLocal(ref, pageBase) {
  if (!ref) return { kind: "skip" };
  let u = ref.trim();
  if (!u || u.startsWith("data:") || u.startsWith("#") || u.includes("${")) return { kind: "skip" };

  if (/^https?:\/\//i.test(u)) {
    if (/i\.ytimg\.com|youtube\.com|fonts\.googleapis/i.test(u)) return { kind: "external", ref: u };
    const host = HOSTS.find((h) => u.startsWith(h));
    if (host) u = u.slice(host.length) || "/";
    else return { kind: "external", ref: u };
  }

  u = u.split("?")[0].split("#")[0];
  if (/^\/img\/(og-|HERO-)/i.test(u)) return { kind: "skip" };

  if (u.startsWith("img/")) {
    const mapped = activeRemaps[u];
    if (mapped) return resolveLocal(mapped, pageBase);
    const hit = byFilename.get(path.basename(u).toLowerCase()) || byStem.get(stem(u).toLowerCase());
    const file = findExported(hit);
    if (file) return { kind: "ok", file, ref: u, via: "filename" };
    return { kind: "missing", ref: u };
  }

  if (u.startsWith("/__l5e/")) {
    const id = (u.match(/\/assets-v1\/([a-f0-9-]+)\//i) || [])[1];
    const fileName = path.basename(u);
    const hit = (id && byAssetId.get(id)) || byL5eUrl.get(u) || byFilename.get(fileName.toLowerCase()) || byStem.get(stem(fileName).toLowerCase());
    const file = findExported(hit);
    if (file) return { kind: "ok", file, ref: u, via: id && byAssetId.get(id) ? "asset_id" : "stale-id-filename" };
    return { kind: "missing", ref: u };
  }

  if (u.startsWith("/")) {
    const pub = publicByUrl.get(u);
    if (pub) return { kind: "ok", file: pub, ref: u, via: "public" };
    const hit = byFilename.get(path.basename(u).toLowerCase()) || byStem.get(stem(u).toLowerCase());
    const file = findExported(hit);
    if (file) return { kind: "ok", file, ref: u, via: "public-fallback-export" };
    return { kind: "missing", ref: u };
  }

  const resolved = path.posix.normalize((pageBase || "/") + u.replace(/^\.\//, ""));
  return resolveLocal(resolved.startsWith("/") ? resolved : "/" + resolved, pageBase);
}

function uniqFirst(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const key = it.file || it.ref;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

function collect(urls, pageBase, rolePrefix, remaps) {
  const prev = activeRemaps;
  if (remaps) activeRemaps = remaps;
  const items = [];
  let i = 0;
  for (const url of urls) {
    const r = resolveLocal(url, pageBase);
    if (r.kind === "skip") continue;
    items.push({ ...r, orderHint: ++i, role: rolePrefix || "on-page" });
  }
  activeRemaps = prev;
  return items;
}

const pages = [];

function addPage(folder, url, items, notes) {
  pages.push({ folder, url, items: uniqFirst(items), notes: notes || [] });
}

function fromHtmlFile(relHtml, pageBase) {
  const html = read(relHtml);
  return collect(extractOrderedUrls(html), pageBase, null, {});
}

// ---------- static kits ----------
addPage("home", "/", fromHtmlFile("public/landing/index.html", "/landing/"), [
  "Live homepage (/) serves public/landing/index.html",
]);
addPage("landing", "/landing", fromHtmlFile("public/landing/index.html", "/landing/"), [
  "Same HTML as home, noindex route",
]);
addPage("landing-2", "/landing-2", fromHtmlFile("public/landing-2/index.html", "/landing-2/"));
addPage("ccca-treatment-atlanta", "/ccca-treatment-atlanta", fromHtmlFile("public/ccca/index.html", "/ccca/"));
addPage("black-trichologist-atlanta", "/black-trichologist-atlanta", fromHtmlFile("public/trichologist/index.html", "/trichologist/"));
addPage("traction-alopecia-treatment-atlanta", "/traction-alopecia-treatment-atlanta", fromHtmlFile("public/traction/index.html", "/traction/"));
addPage("prp-hair-treatment-atlanta", "/prp-hair-treatment-atlanta", fromHtmlFile("public/prp/index.html", "/prp/"));
addPage("hair-restoration-sandy-springs", "/hair-restoration-sandy-springs", fromHtmlFile("public/sandysprings/index.html", "/sandysprings/"));
addPage("hair-loss-treatment-atlanta", "/hair-loss-treatment-atlanta", fromHtmlFile("public/hairloss/index.html", "/hairloss/"));
addPage("hair-doctor-atlanta", "/hair-doctor-atlanta", fromHtmlFile("public/hairdoctor/index.html", "/hairdoctor/"));
addPage("functional-medicine", "/functional-medicine", fromHtmlFile("public/functionalmedicine/index.html", "/functionalmedicine/"));
addPage("alopecia-areata-doctor-atlanta", "/alopecia-areata-doctor-atlanta", fromHtmlFile("public/alopecia/index.html", "/alopecia/"));

// ---------- about (adapter order from nr-about-render.js) ----------
addPage(
  "about",
  "/about",
  collect(
    [
      "img/nina-portrait.webp",
      "img/scope-healthy.webp",
      "img/functional-medicine-consult.webp",
      "img/clinic-lobby.webp",
      "img/treatment-room.jpg",
      "img/jamaal-lassiter.jpg",
    ],
    "/",
    null,
    remapAbout,
  ),
  ["Order from nr-about-render.js after nr-about.ts remaps"],
);

// ---------- trichology ----------
{
  const derm = JSON.parse(read("src/assets/trichology/dermatologist-visit-consultation-nina-ross-atlanta.webp.asset.json"));
  const trust = read("src/data/trust.ts");
  const cases = [...trust.matchAll(/before:\s*"([^"]+)"[\s\S]*?after:\s*"([^"]+)"/g)].slice(0, 2);
  const caseHtml = cases
    .map((c) => `<img src="${c[1]}"><img src="${c[2]}">`)
    .join("");
  let html = read("src/lib/nr-trichology-template.html")
    .replaceAll("img/scope-healthy.webp", remapTrichology["img/scope-healthy.webp"] || "img/scope-healthy.webp")
    .replaceAll("img/nina-portrait.webp", remapTrichology["img/nina-portrait.webp"] || "img/nina-portrait.webp")
    .replaceAll("img/scarred-scalp.webp", remapTrichology["img/scarred-scalp.webp"] || "img/scarred-scalp.webp")
    .replace('<article class="tr-vs__derm">', `<article class="tr-vs__derm" style="--tr-derm-image:url('${derm.url}')">`)
    .replace('<div class="tr-cases"></div>', `<div class="tr-cases">${caseHtml}</div>`);
  addPage("trichology", "/trichology", collect(extractOrderedUrls(html), "/", null, remapTrichology), [
    "Template remaps + dermVisit CSS + proofCases[0] and proofCases[1] from trust.ts, in template order",
  ]);
}

// ---------- videos (YouTube thumbs only) ----------
{
  const html = read("src/lib/nr-videos-template.html");
  addPage("videos", "/videos", collect(extractOrderedUrls(html), "/"), [
    "Page uses YouTube thumbnail URLs only (i.ytimg.com), no local/Lovable images",
  ]);
}

// ---------- hubs ----------
{
  const hubs = loadJson("src/content/_hubs.json");
  addPage(
    "concerns",
    "/concerns",
    collect([hubs.conditions.hero.src, "img/nina-portrait.webp"], "/", null, remapHub),
    ["Hub hero then Dr. Nina portrait from nr-hub-render.js"],
  );
  addPage(
    "treatments",
    "/treatments",
    collect([hubs.treatments.hero.src, "img/nina-portrait.webp"], "/", null, remapHub),
    ["Hub hero then Dr. Nina portrait from nr-hub-render.js"],
  );
}

// ---------- concern + treatment details ----------
function detailItems(page) {
  const urls = [];
  if (page.cover?.src) urls.push(page.cover.src);
  urls.push("img/nina-portrait.webp");
  if (page.hero?.src) urls.push(page.hero.src);
  for (const f of page.insight?.figures || []) if (f.src) urls.push(f.src);
  if (page.type !== "treatment") {
    // nina already in hero; insight figures; no extra cover
  }
  return collect(urls, "/", null, remapDetail);
}

for (const f of walk(path.join(ROOT, "src/content/concerns"), (p) => p.endsWith(".json"))) {
  const page = JSON.parse(fs.readFileSync(f, "utf8"));
  addPage(`concerns--${page.slug}`, `/concerns/${page.slug}`, detailItems(page), [
    "Order: cover (if any), reviewer portrait, 200x hero, insight figures",
  ]);
}
for (const f of walk(path.join(ROOT, "src/content/treatments"), (p) => p.endsWith(".json"))) {
  const page = JSON.parse(fs.readFileSync(f, "utf8"));
  addPage(`treatments--${page.slug}`, `/treatments/${page.slug}`, detailItems(page), [
    "Order: cover hero background, reviewer portrait (hero + clinical direction)",
  ]);
}

// ---------- blog articles ----------
const articleFiles = {
  "hair-loss-and-potassium-deficiency": "src/content/posts/hair-loss-and-potassium-deficiency.json",
  "iron-deficiency-and-hair-loss": "src/content/posts/iron-deficiency-and-hair-loss.json",
  "hair-loss-epidemic-among-black-women": "src/content/posts/hair-loss-epidemic-among-black-women.json",
  "hair-growth-hormones": "src/content/posts/hair-growth-hormones.json",
  "how-to-stop-alopecia-areata-from-spreading": "src/content/posts/how-to-stop-alopecia-areata-from-spreading.json",
  "stop-hair-loss-with-dht-blockers": "src/content/posts/stop-hair-loss-with-dht-blockers.json",
  "minoxidil-itchy-scalp": "src/content/posts/minoxidil-itchy-scalp.json",
  "magnesium-for-hair-growth": "src/content/posts/magnesium-for-hair-growth.json",
  "oily-scalp-and-hair-loss": "src/content/posts/oily-scalp-and-hair-loss.json",
  "choosing-a-trichologist-near-me": "src/content/posts/choosing-a-trichologist-near-me.json",
  "trichologist-for-black-hair": "src/content/posts/trichologist-for-black-hair.json",
  "amino-acids-for-hair-regrowth": "src/content/posts/amino-acids-for-hair-regrowth.json",
  "l-lysine-benefits-for-skin": "src/content/posts/l-lysine-benefits-for-skin.json",
  "traction-alopecia-reversibility": "src/content/posts/traction-alopecia-reversibility.json",
};

const firstLead = {
  "hair-loss-and-potassium-deficiency": "/__l5e/assets-v1/d7d5d8e2-bc6e-4ad2-8ce3-1fff1afaa4ff/woman-reading-supplement-label-kitchen-nina-ross-atlanta.png",
  "traction-alopecia-reversibility": "img/traction-mirror-check.png",
  "minoxidil-itchy-scalp": "/__l5e/assets-v1/c18cc591-7bb8-4708-9a71-e7ba4e1e8e9d/woman-reading-minoxidil-label-nina-ross-atlanta.png",
  "how-to-stop-alopecia-areata-from-spreading": "img/alopecia-cycle-tracking.png",
  "hair-loss-epidemic-among-black-women": "img/crisis-women-conversation.png",
  "choosing-a-trichologist-near-me": "img/trichologist-strand-analysis.png",
  "stop-hair-loss-with-dht-blockers": "img/dht-blocker-bottle.png",
  "iron-deficiency-and-hair-loss": "img/iron-shedding-hair.png",
  "hair-growth-hormones": "img/hormone-consultation.png",
  "l-lysine-benefits-for-skin": "img/lysine-smoothie-bowl.png",
  "amino-acids-for-hair-regrowth": "img/amino-protein-meal.png",
  "magnesium-for-hair-growth": "img/magnesium-deficiency-signs.png",
  "oily-scalp-and-hair-loss": "img/oily-scalp-washing.png",
  "trichologist-for-black-hair": "img/trichologist-black-what-you-see.png",
};
const laterFig = {
  "hair-loss-and-potassium-deficiency": "/__l5e/assets-v1/084d02c0-d819-45c7-bdcf-dd6ad7f73be7/potassium-iron-zinc-magnesium-follicle-nina-ross-atlanta.png",
  "traction-alopecia-reversibility": "img/traction-follicle-stages.png",
  "minoxidil-itchy-scalp": "/__l5e/assets-v1/00e73250-24e1-4000-96fd-7692b81bf6d4/propylene-glycol-irritated-vs-healthy-scalp-nina-ross-atlanta.png",
  "how-to-stop-alopecia-areata-from-spreading": "img/alopecia-woman-portrait.png",
  "hair-loss-epidemic-among-black-women": "img/crisis-scalp-consultation.png",
  "choosing-a-trichologist-near-me": "img/trichologist-follicle-anatomy.png",
  "stop-hair-loss-with-dht-blockers": "img/dht-miniaturization.png",
  "iron-deficiency-and-hair-loss": "img/iron-levels-chart.png",
  "hair-growth-hormones": "img/hair-growth-cycle.png",
  "l-lysine-benefits-for-skin": "img/lysine-benefits-chart.png",
  "amino-acids-for-hair-regrowth": "img/amino-flow-diagram.png",
  "magnesium-for-hair-growth": "img/magnesium-night.png",
  "oily-scalp-and-hair-loss": "img/oily-thinning-mirror.png",
  "trichologist-for-black-hair": "img/trichologist-black-tools.png",
};
const fallbackLead = "/landing/img/scalp-imaging-trichoscope-session-nina-ross-atlanta.webp";
const fallbackLater = "/__l5e/assets-v1/a93aa8b3-54cb-41f5-930e-69e5e732f05f/functional-medicine-body-scan-consultation-nina-ross-atlanta.webp";

const catalog = loadJson("src/content/posts/_catalog.json");
const postsBySlug = {};
for (const [slug, rel] of Object.entries(articleFiles)) postsBySlug[slug] = loadJson(rel);

function pickRelated(post) {
  const others = catalog.filter((p) => p.slug !== post.slug);
  const bySlug = (s) => others.find((p) => p.slug === s);
  const chosen = [];
  const add = (p) => {
    if (p && !chosen.includes(p)) chosen.push(p);
  };
  [post.upNext, ...(post.related || [])].forEach((s) => add(bySlug(s)));
  others.filter((p) => p.category === post.category).forEach(add);
  others.forEach(add);
  return { next: chosen[0], rest: chosen.slice(1, 4) };
}

function heroSrcFor(slug) {
  const hero = postsBySlug[slug]?.hero?.src;
  return hero ? remapArticle[hero] || hero : null;
}

for (const [slug, post] of Object.entries(postsBySlug)) {
  const urls = [];
  if (post.hero?.src) urls.push(post.hero.src);
  urls.push("img/nina-portrait.webp");
  urls.push(firstLead[slug] || fallbackLead);
  const laterAt = Math.max(4, Math.floor(post.body.length * 0.55));
  post.body.forEach((b, index) => {
    if (index === laterAt) urls.push(laterFig[slug] || fallbackLater);
    if (b.type === "figure" && b.src) urls.push(b.src);
  });
  const { next, rest } = pickRelated(post);
  for (const p of [next, ...rest].filter(Boolean)) {
    const h = heroSrcFor(p.slug);
    if (h) urls.push(h);
  }
  addPage(`blog--${slug}`, `/blog/${slug}`, collect(urls, "/", null, remapArticle), [
    "Order from nr-render.js: cover hero, author portrait, lead figure, body figures (later figure injected ~55%), related thumbs",
  ]);
}

// ---------- blog index (BlogIndexDesign.tsx) ----------
{
  const blogPosts = [
    "hair-loss-and-potassium-deficiency",
    "traction-alopecia-reversibility",
    "iron-deficiency-and-hair-loss",
    "hair-growth-hormones",
    "l-lysine-benefits-for-skin",
    "amino-acids-for-hair-regrowth",
    "magnesium-for-hair-growth",
    "how-to-stop-alopecia-areata-from-spreading",
    "minoxidil-itchy-scalp",
    "hair-loss-epidemic-among-black-women",
    "choosing-a-trichologist-near-me",
    "trichologist-for-black-hair",
    "oily-scalp-and-hair-loss",
    "stop-hair-loss-with-dht-blockers",
  ];
  const featured = "traction-alopecia-reversibility";
  const remaining = blogPosts.filter((s) => s !== featured);
  const firstPosts = remaining.slice(0, 6);
  const lastPosts = remaining.slice(6);
  const shortAnswers = [
    "traction-alopecia-reversibility",
    "iron-deficiency-and-hair-loss",
    "traction-alopecia-reversibility",
    "minoxidil-itchy-scalp",
    "stop-hair-loss-with-dht-blockers",
    "oily-scalp-and-hair-loss",
  ];
  const urls = ["src/assets/blog-design/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp.asset.json"];
  const nina = JSON.parse(read("src/assets/blog-design/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp.asset.json"));
  const list = [nina.url];
  const addHero = (slug) => {
    const h = postsBySlug[slug]?.hero?.src;
    if (h) list.push(h);
  };
  addHero(featured);
  firstPosts.forEach(addHero);
  shortAnswers.forEach(addHero);
  lastPosts.forEach(addHero);
  addPage("blog", "/blog", collect(list, "/", null, remapArticle), [
    "BlogIndexDesign.tsx: portrait, featured traction hero, first 6 remaining cards, short-answer cards, remaining cards, author portrait (deduped)",
  ]);
}

// ---------- blog categories ----------
{
  const cats = loadJson("src/content/posts/_categories.json");
  for (const cat of cats) {
    const urls = [];
    if (cat.hero?.src) urls.push(cat.hero.src);
    const posts = catalog.filter((p) => p.categorySlug === cat.slug);
    const featured = posts.find((p) => p.slug === cat.featured) || posts[0];
    const rest = posts.filter((p) => p !== featured);
    const fallback = (cat.whileYouWait || []).map((s) => catalog.find((p) => p.slug === s)).filter(Boolean).slice(0, 3);
    const thumbs = posts.length ? [featured, ...rest] : fallback;
    for (const p of thumbs.filter(Boolean)) {
      const h = heroSrcFor(p.slug);
      if (h) urls.push(h);
    }
    addPage(`blog--${cat.slug}`, `/blog/${cat.slug}`, collect(urls, "/", null, remapCategory), [
      "Category cover (if any) then featured + remaining article thumbs from catalog",
    ]);
  }
}

// ---------- text pages (verified no <img> in route files) ----------
for (const [folder, url] of [
  ["contact", "/contact"],
  ["faq", "/faq"],
  ["book", "/book"],
  ["editorial-policy", "/editorial-policy"],
  ["medical-review-policy", "/medical-review-policy"],
  ["privacy-policy", "/privacy-policy"],
  ["policies", "/policies"],
]) {
  addPage(folder, url, [], ["Checked route TSX: no image assets"]);
}

// ---------- write folders ----------
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const master = ["page,url,order,copied_as,source_file,resolved_from,status"];
const summary = ["# Page image folders", "", "Each folder is one live URL. Files are numbered in first-appearance order. Duplicates on the same page are kept once.", ""];
let missingCount = 0;
let copiedCount = 0;

for (const page of pages) {
  const dir = path.join(OUT, page.folder);
  fs.mkdirSync(dir, { recursive: true });
  const lines = [`# ${page.url}`, "", ...(page.notes || []).map((n) => `- ${n}`), "", "| # | file | source | status |", "|---|------|--------|--------|"];
  let n = 0;
  const missing = [];
  const external = [];
  for (const it of page.items) {
    if (it.kind === "external") {
      external.push(it.ref);
      lines.push(`| — | | ${it.ref} | external (not copied) |`);
      continue;
    }
    if (it.kind !== "ok" || !it.file || !fs.existsSync(it.file)) {
      missingCount++;
      missing.push(it.ref);
      lines.push(`| — | | ${it.ref} | MISSING |`);
      master.push(`${page.folder},${page.url},,,"${it.ref}",,MISSING`);
      continue;
    }
    n += 1;
    const ext = path.extname(it.file);
    const base = path.basename(it.file, ext);
    const destName = `${String(n).padStart(2, "0")}-${base}${ext}`;
    fs.copyFileSync(it.file, path.join(dir, destName));
    copiedCount++;
    const srcRel = path.relative(ROOT, it.file).replace(/\\/g, "/");
    lines.push(`| ${n} | ${destName} | ${srcRel} | ok (${it.via || ""}) |`);
    master.push(`${page.folder},${page.url},${n},${destName},${srcRel},${it.ref},ok`);
  }
  if (n === 0 && missing.length === 0 && external.length === 0) {
    lines.push("", "_No images on this page._");
  }
  if (external.length) fs.writeFileSync(path.join(dir, "_EXTERNAL.txt"), external.join("\n"));
  if (missing.length) fs.writeFileSync(path.join(dir, "_MISSING.txt"), missing.join("\n"));
  fs.writeFileSync(path.join(dir, "_ORDER.md"), lines.join("\n") + "\n");
  summary.push(`- \`${page.folder}/\` → ${page.url} — ${n} image${n === 1 ? "" : "s"}${missing.length ? `, ${missing.length} missing` : ""}${external.length ? `, ${external.length} external` : ""}`);
}

fs.writeFileSync(path.join(OUT, "_INDEX.csv"), master.join("\n") + "\n");
fs.writeFileSync(path.join(OUT, "README.md"), summary.join("\n") + "\n");
console.log(`Pages: ${pages.length}`);
console.log(`Copied files (with per-page duplicates across folders): ${copiedCount}`);
console.log(`Missing: ${missingCount}`);
console.log(`Out: ${OUT}`);
if (missingCount) process.exitCode = 1;
