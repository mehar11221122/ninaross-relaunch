// Launch gate. Run: bun run qa:launch  (QA_BASE_URL=https://... to test a live host)
const base = process.env.QA_BASE_URL || "http://localhost:8080";
const HOST = "https://www.ninaross.co";
const baseOrigin = new URL(base).origin;

const NAP = {
  phoneDigits: "6785614522",
  street: "8735 Dunwoody Place, Suite 290",
  postalCode: "30350",
  opens: "10:00",
  closes: "15:30",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

// Old Shopify URLs that must 301 straight to a live page.
const LEGACY = [
  "/blogs/hair-loss/hair-loss-and-potassium-deficiency-what-s-the-relationship",
  "/blogs/hair-loss/hair-loss-epidemic-among-black-women",
  "/blogs/hair-loss/how-to-stop-alopecia-areata-from-getting-worse",
  "/blogs/hair-loss/how-to-stop-alopecia-areata-from-spreading",
  "/blogs/hair-loss/minoxidil-itchy-scalp-know-the-surprising-facts",
  "/blogs/hair-loss/stop-hair-loss-with-dht-blockers",
  "/blogs/hair-loss/things-to-do-before-you-google-trichologist-near-me",
  "/blogs/hair-loss/traction-alopecia-when-is-it-too-late",
  "/blogs/hair-loss/trichologist-for-black-hair",
  "/blogs/health-wellness-posts/7-amazing-amino-acids-for-hair-regrowth-you-should-know",
  "/blogs/health-wellness-posts/magnesium-for-hair-growth",
  "/blogs/health-wellness-posts/magnesium-hair-growth",
  "/blogs/health-wellness-posts/unlocking-the-secret-to-radiance-l-lysine-benefits-for-skin-before-and-after",
];
const MUST_404 = ["/treatments/steam-therapy", "/treatments/scalp-micropigmentation"];
const MONEY = [
  "/black-trichologist-atlanta", "/ccca-treatment-atlanta", "/traction-alopecia-treatment-atlanta",
  "/hair-loss-treatment-atlanta", "/prp-hair-treatment-atlanta", "/alopecia-areata-doctor-atlanta",
  "/hair-doctor-atlanta", "/hair-restoration-sandy-springs", "/functional-medicine", "/trichology",
];

const forbidden = [
  /\{\{[^}]+\}\}/i, /\{%[^%]+%\}/, /real review needed/i, /client name needed/i,
  /real client photo needed/i, /photos? (?:and|or) trichoscopy imagery needed/i,
  /image placeholder/i, /\[placeholder[^\]]*\]/i, /last reviewed\s*\[date\]/i,
  /coming soon/i, /new guides? (?:are )?on the way/i, /lorem ipsum/i,
  /replace (?:all|with|this) .*?(?:verified|real|approved)/i, /\bTODO\b|\bFIXME\b/,
  /sample (?:review|testimonial|statistic)/i, /undefined<|>undefined|>null</,
  /Nina Ross,? M\.?D\b|Dr\.? Nina Ross,? MD/i,
];
const strayHost = /(?:https?:\/\/ninaross\.co\b|http:\/\/(?:www\.)?ninaross\.co|[a-z0-9-]+\.lovable(?:project)?\.(?:app|com)|myshopify\.com|ninaross\.com\b)/i;

const failures = [];
const fail = (p, m) => failures.push(`${p}: ${m}`);
const get = (u, opts = {}) => fetch(new URL(u, base), { redirect: "manual", ...opts });
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i")) || [])[1];
const toLocal = (href) => {
  const u = new URL(href, base);
  if (u.origin === baseOrigin || u.origin === HOST) return u.pathname + u.search;
  return null;
};

// robots + sitemap
const robots = await get("/robots.txt");
const robotsTxt = robots.ok ? await robots.text() : "";
if (!robots.ok) fail("/robots.txt", `HTTP ${robots.status}`);
if (!robotsTxt.includes(`Sitemap: ${HOST}/sitemap.xml`)) fail("/robots.txt", "missing Sitemap line for www host");
if (/User-agent:\s*\*[^]*?^Disallow:\s*\/\s*$/im.test(robotsTxt.split(/\n\s*\n/)[0] || "")) fail("/robots.txt", "blocks every crawler");

const sm = await get("/sitemap.xml");
if (!sm.ok) throw new Error(`Could not load sitemap: ${sm.status}`);
if (!(sm.headers.get("content-type") || "").includes("xml")) fail("/sitemap.xml", "wrong content-type");
const smXml = await sm.text();
if (!/^<\?xml[^]*<urlset[^]*<\/urlset>\s*$/.test(smXml.trim())) fail("/sitemap.xml", "not a valid urlset");
const locs = [...smXml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
const paths = [];
for (const loc of locs) {
  if (!loc.startsWith(HOST + "/") && loc !== HOST) fail("/sitemap.xml", `non-canonical host ${loc}`);
  const p = new URL(loc).pathname;
  if (paths.includes(p)) fail("/sitemap.xml", `duplicate ${loc}`);
  paths.push(p);
}

const seen = { title: new Map(), desc: new Map(), h1: new Map() };
const links = new Map(); // path -> first page that linked it
const pageText = new Map();

for (const path of paths) {
  const res = await get(path);
  if (res.status !== 200) { fail(path, `HTTP ${res.status} (sitemap pages must be a direct 200)`); continue; }
  const html = await res.text();
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [""])[0];
  const body = html.slice(head.length);

  for (const rule of forbidden) { const m = html.match(rule); if (m) fail(path, `blocked text ${JSON.stringify(m[0])}`); }
  const stray = html.match(strayHost); if (stray) fail(path, `stray host ${stray[0]}`);

  // title / description / h1
  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => text(m[1]));
  const descs = [...head.matchAll(/<meta[^>]+name=["']description["'][^>]*>/gi)].map((m) => attr(m[0], "content"));
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])).filter(Boolean);
  if (titles.length !== 1) fail(path, `${titles.length} <title> tags`);
  if (descs.length !== 1) fail(path, `${descs.length} meta descriptions`);
  if (h1s.length !== 1) fail(path, `${h1s.length} H1s`);
  if (/noindex/i.test((head.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [""])[0])) fail(path, "noindex page listed in sitemap");
  for (const [k, v] of [["title", titles[0]], ["desc", descs[0]], ["h1", h1s[0]]]) {
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen[k].has(key)) fail(path, `duplicate ${k} with ${seen[k].get(key)}: "${v}"`); else seen[k].set(key, path);
  }

  // canonical
  const canon = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map((m) => attr(m[0], "href"));
  const want = path === "/" ? `${HOST}/` : `${HOST}${path}`;
  if (canon.length !== 1) fail(path, `${canon.length} canonical tags`);
  else if (canon[0].replace(/\/$/, "") !== want.replace(/\/$/, "")) fail(path, `canonical ${canon[0]} should be ${want}`);

  // schema
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { fail(path, "invalid JSON-LD"); continue; }
    const items = [data].flat().flatMap((d) => (d["@graph"] ? d["@graph"] : [d]));
    if (![data].flat().every((d) => d["@context"])) fail(path, "JSON-LD missing @context");
    const walk = (o) => {
      if (!o || typeof o !== "object") return;
      if (Array.isArray(o)) return o.forEach(walk);
      const t = [o["@type"]].flat();
      if (t.includes("Person") && /nina ross/i.test(o.name || "")) {
        if (/\bM\.?D\b/.test(JSON.stringify(o))) fail(path, "schema lists Dr. Nina as MD");
      }
      if (o.telephone && o.telephone.replace(/\D/g, "").slice(-10) !== NAP.phoneDigits) fail(path, `schema phone ${o.telephone}`);
      if (o.streetAddress && o.streetAddress !== NAP.street) fail(path, `schema street ${o.streetAddress}`);
      if (o.postalCode && o.postalCode !== NAP.postalCode) fail(path, `schema zip ${o.postalCode}`);
      if (t.includes("OpeningHoursSpecification")) {
        const days = [o.dayOfWeek].flat().map((d) => String(d).replace("https://schema.org/", ""));
        if (o.opens !== NAP.opens || o.closes !== NAP.closes || days.join() !== NAP.days.join()) fail(path, `schema hours ${days.join("/")} ${o.opens}-${o.closes}`);
      }
      for (const k of ["author", "reviewedBy"]) {
        for (const a of [o[k]].flat().filter(Boolean)) {
          if (a.name && !/^(Dr\. Nina Ross(, ND)?|Nina Ross Atlanta|Nina Ross Hair Therapy)$/.test(a.name)) fail(path, `unexpected ${k} "${a.name}"`);
        }
      }
      Object.values(o).forEach(walk);
    };
    walk(items);
    if (/\[PLACEHOLDER|YYYY-MM-DD|"(?:datePublished|dateModified|lastReviewed|uploadDate)":\s*(?:""|null)/.test(m[1])) fail(path, "schema has empty/placeholder date");
  }

  // visible NAP
  const vis = text(body);
  for (const ph of vis.match(/\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g) || []) {
    if (ph.replace(/\D/g, "") !== NAP.phoneDigits) fail(path, `unexpected phone ${ph}`);
  }
  if (/Dunwoody Place/i.test(vis) && !/8735 Dunwoody Place,? Suite 290/i.test(vis)) fail(path, "address shown without correct suite");
  for (const h of vis.match(/(?:Mon|Monday)[^.]{0,40}?\d{1,2}(?::\d{2})?\s?[AP]M[^.]{0,15}?\d{1,2}(?::\d{2})?\s?[AP]M/gi) || []) {
    if (!/10(?::00)?\s?AM.{1,6}3:30\s?PM/i.test(h) || !/Sat/i.test(h)) fail(path, `unexpected hours "${h}"`);
  }
  pageText.set(path, body);

  // collect links + assets
  for (const m of html.matchAll(/<(?:a|link|img|source|script)\b[^>]*>/gi)) {
    const tag = m[0];
    if (/^<link/i.test(tag) && /rel=["'](?:canonical|preconnect|dns-prefetch|alternate)/i.test(tag)) continue;
    for (const raw of [attr(tag, "href"), attr(tag, "src")]) {
      if (!raw || /^(?:#|mailto:|tel:|sms:|javascript:|data:|blob:)/i.test(raw) || raw.includes("${")) continue;
      let local; try { local = toLocal(raw); } catch { fail(path, `malformed URL ${raw}`); continue; }
      if (local && !links.has(local)) links.set(local, path);
    }
  }
}

// every internal link: 200 directly, or one 301/308 hop to a 200
for (const [link, from] of links) {
  const r = await get(link, { method: "GET" });
  if (r.status === 200) continue;
  if ([301, 308].includes(r.status)) {
    const to = new URL(r.headers.get("location"), base);
    const r2 = await get(to.pathname + to.search);
    if (r2.status !== 200) fail(from, `link ${link} redirect chain/broken (${r.status} -> ${r2.status})`);
    continue;
  }
  fail(from, `broken link ${link} (HTTP ${r.status})`);
}

// legacy Shopify URLs: exactly one 301 to a 200
for (const p of LEGACY) {
  const r = await get(p);
  if (r.status !== 301) { fail(p, `legacy URL returns ${r.status}, expected 301`); continue; }
  const to = new URL(r.headers.get("location"), base);
  const r2 = await get(to.pathname);
  if (r2.status !== 200) fail(p, `301 target ${to.pathname} returns ${r2.status} (chain or broken)`);
  if (!paths.includes(to.pathname)) fail(p, `301 target ${to.pathname} is not in sitemap`);
}
for (const p of MUST_404) { const r = await get(p); if (r.status !== 404) fail(p, `expected 404, got ${r.status}`); }

// duplicate copy across money pages (ignore boilerplate shared by most pages)
const paras = (h) => [...h.matchAll(/<(?:p|li|h2|h3|dd|summary)\b[^>]*>([\s\S]*?)<\/(?:p|li|h2|h3|dd|summary)>/gi)]
  .map((m) => text(m[1]).toLowerCase()).filter((t) => t.length >= 140);
const freq = new Map();
for (const [, h] of pageText) for (const t of new Set(paras(h))) freq.set(t, (freq.get(t) || 0) + 1);
const boiler = (t) => freq.get(t) > paths.length * 0.3;
const owner = new Map();
for (const p of MONEY) {
  if (!pageText.has(p)) { fail(p, "money page missing from sitemap"); continue; }
  for (const t of new Set(paras(pageText.get(p)))) {
    if (boiler(t) || /^(?:&ldquo;|“|")/.test(t)) continue; // verified reviews may repeat
    if (owner.has(t)) fail(p, `copy duplicated from ${owner.get(t)}: "${t.slice(0, 90)}..."`);
    else owner.set(t, p);
  }
}

if (failures.length) {
  console.error(`Launch QA failed with ${failures.length} issue(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Launch QA passed: ${paths.length} pages, ${links.size} internal links, ${LEGACY.length} legacy redirects, robots.txt and sitemap.xml.`);
