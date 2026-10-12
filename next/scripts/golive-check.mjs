/**
 * Extra go-live surface checks (SEO headers, money pages, 404s, llms).
 * Usage: bun scripts/golive-check.mjs [baseUrl]
 */
const BASE = (process.argv[2] || "https://ninarosshair.vercel.app").replace(
  /\/$/,
  "",
);
const HOST = "https://www.ninaross.co";

const MONEY = [
  "/",
  "/black-trichologist-atlanta",
  "/ccca-treatment-atlanta",
  "/traction-alopecia-treatment-atlanta",
  "/hair-loss-treatment-atlanta",
  "/prp-hair-treatment-atlanta",
  "/alopecia-areata-doctor-atlanta",
  "/hair-doctor-atlanta",
  "/hair-restoration-sandy-springs",
  "/functional-medicine",
  "/trichology",
  "/contact",
  "/book",
  "/concerns/folliculitis",
  "/treatments/prp-therapy",
  "/blog",
  "/videos",
];

const MUST_404 = [
  "/treatments/steam-therapy",
  "/treatments/scalp-micropigmentation",
];

const EXTRA_REDIRECTS = [
  ["/pages/shop", "/trichology"],
  ["/blogs/hair-loss", "/blog/hair-loss"],
  [
    "/blogs/treatment-methods-posts/benefits-of-steam-therapy",
    "/treatments",
  ],
  [
    "/blogs/treatment-methods-posts/scalp-micro-pigmentation-hair-but-not-hair",
    "/trichology",
  ],
  [
    "/blogs/hair-loss/central-centrifugal-cicatricial-alopecia-c-c-c-a",
    "/concerns/ccca",
  ],
];

const fails = [];
const notes = [];

async function headish(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return res;
}

function locPath(loc) {
  if (!loc) return null;
  try {
    return new URL(loc, BASE).pathname.replace(/\/$/, "") || "/";
  } catch {
    return loc;
  }
}

console.log(`Go-live check vs ${BASE}\n`);

// robots + sitemap + llms
{
  const robots = await fetch(`${BASE}/robots.txt`);
  const txt = robots.ok ? await robots.text() : "";
  if (!robots.ok) fails.push(`robots.txt HTTP ${robots.status}`);
  else {
    if (!txt.includes(`Sitemap: ${HOST}/sitemap.xml`)) {
      fails.push("robots.txt missing www sitemap line");
    }
    if (/Disallow:\s*\/\s*$/m.test(txt.split(/\n\s*\n/)[0] || "")) {
      fails.push("robots.txt blocks all crawlers");
    }
    notes.push(`robots.txt OK (${txt.trim().split(/\n/).length} lines)`);
  }

  const sm = await fetch(`${BASE}/sitemap.xml`);
  const xml = sm.ok ? await sm.text() : "";
  if (!sm.ok) fails.push(`sitemap.xml HTTP ${sm.status}`);
  else {
    const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
    const badHost = locs.filter((l) => !l.startsWith(HOST));
    if (badHost.length) {
      fails.push(`sitemap non-www hosts: ${badHost.slice(0, 3).join(", ")}`);
    }
    notes.push(`sitemap.xml ${locs.length} URLs`);
  }

  const llms = await fetch(`${BASE}/llms.txt`);
  if (!llms.ok) fails.push(`llms.txt HTTP ${llms.status}`);
  else {
    const body = await llms.text();
    notes.push(`llms.txt ${body.length} bytes`);
    if (!/ninaross/i.test(body)) fails.push("llms.txt missing brand mention");
  }
}

// MUST 404
for (const p of MUST_404) {
  const res = await headish(p);
  if (res.status !== 404) fails.push(`${p} expected 404 got ${res.status}`);
  else notes.push(`404 OK ${p}`);
}

// Extra redirects
for (const [from, to] of EXTRA_REDIRECTS) {
  const res = await headish(from);
  const dest = locPath(res.headers.get("location"));
  if (![301, 308].includes(res.status) || dest !== to) {
    fails.push(`${from} → ${dest || res.status} (want ${to})`);
  } else notes.push(`redirect OK ${from} → ${to}`);
}

// Money / key pages: 200, title, desc, canonical, no em dash, schema presence on home
for (const path of MONEY) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  if (res.status !== 200) {
    fails.push(`${path} HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const desc = (
    html.match(
      /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
    ) ||
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i,
    ) ||
    []
  )[1];
  const canon = (
    html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i) ||
    []
  )[1];
  const want = path === "/" ? `${HOST}/` : `${HOST}${path}`;
  if (!title?.trim()) fails.push(`${path} missing title`);
  if (!desc?.trim()) fails.push(`${path} missing meta description`);
  if (!canon) fails.push(`${path} missing canonical`);
  else if (canon.replace(/\/$/, "") !== want.replace(/\/$/, "")) {
    fails.push(`${path} canonical ${canon} ≠ ${want}`);
  }
  if (/[\u2014\u2013]/.test(title || "") || /[\u2014\u2013]/.test(desc || "")) {
    fails.push(`${path} em/en dash in title or description`);
  }
  if (path === "/") {
    const ld = [
      ...html.matchAll(
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ];
    if (!ld.length) fails.push("/ missing JSON-LD");
    else {
      let typed = false;
      for (const m of ld) {
        try {
          const data = JSON.parse(m[1]);
          const items = [data]
            .flat()
            .flatMap((d) => (d["@graph"] ? d["@graph"] : [d]));
          if (items.some((i) => /MedicalBusiness/i.test(String(i["@type"])))) {
            typed = true;
          }
        } catch {
          fails.push("/ invalid JSON-LD");
        }
      }
      if (!typed) fails.push("/ schema not MedicalBusiness");
      else notes.push("home schema MedicalBusiness OK");
    }
  }
  notes.push(`page OK ${path}`);
}

console.log("NOTES");
for (const n of notes) console.log(`  · ${n}`);
console.log("\nFAILURES");
if (!fails.length) console.log("  (none)");
else for (const f of fails) console.log(`  ✗ ${f}`);
console.log(`\n${fails.length ? "FAIL" : "PASS"} — ${fails.length} issue(s)`);
process.exit(fails.length ? 1 : 0);
