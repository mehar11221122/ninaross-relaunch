/**
 * Classify Shopify /blogs/* URLs from the live old sitemap against vercel.json
 * redirects + local Next content. Flags catch-all targets that would 404.
 *
 * Usage: bun scripts/classify-legacy-blogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const nextRoot = path.join(root, "..");
const vercelPath = path.join(nextRoot, "vercel.json");
const postsDir = path.join(nextRoot, "src", "content", "posts");
const concernsDir = path.join(nextRoot, "src", "content", "concerns");
const treatmentsDir = path.join(nextRoot, "src", "content", "treatments");

const STATIC_DESTS = new Set([
  "/",
  "/about",
  "/blog",
  "/book",
  "/contact",
  "/faq",
  "/videos",
  "/treatments",
  "/concerns",
  "/trichology",
  "/functional-medicine",
  "/black-trichologist-atlanta",
  "/hair-doctor-atlanta",
  "/hair-loss-treatment-atlanta",
  "/alopecia-areata-doctor-atlanta",
  "/traction-alopecia-treatment-atlanta",
  "/prp-hair-treatment-atlanta",
  "/hair-restoration-sandy-springs",
  "/ccca-treatment-atlanta",
  "/policies",
  "/privacy-policy",
  "/editorial-policy",
  "/medical-review-policy",
  "/blog/hair-loss",
  "/blog/health-wellness",
  "/blog/treatment-methods",
  "/blog/scalp-concerns",
  "/blog/hair-care",
]);

function listSlugs(dir, prefix) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => `${prefix}/${f.replace(/\.json$/, "")}`);
}

for (const d of listSlugs(postsDir, "/blog")) STATIC_DESTS.add(d);
for (const d of listSlugs(concernsDir, "/concerns")) STATIC_DESTS.add(d);
for (const d of listSlugs(treatmentsDir, "/treatments")) STATIC_DESTS.add(d);

const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
const redirects = vercel.redirects || [];

function matchRedirect(pathname) {
  for (const r of redirects) {
    const src = r.source;
    // Exact
    if (!src.includes(":") && src === pathname) {
      return { destination: r.destination, rule: src, kind: "exact" };
    }
    // /blogs/treatment-methods-posts/:slug(exosome[^/]*)
    const named = src.match(/^\/blogs\/treatment-methods-posts\/:slug\((.+)\)$/);
    if (named) {
      const re = new RegExp(`^/blogs/treatment-methods-posts/(${named[1]})$`);
      const m = pathname.match(re);
      if (m) {
        return {
          destination: r.destination,
          rule: src,
          kind: "regex",
        };
      }
    }
    // Catch-all /blogs/:category/:slug
    if (src === "/blogs/:category/:slug") {
      const m = pathname.match(/^\/blogs\/([^/]+)\/([^/]+)\/?$/);
      if (m) {
        return {
          destination: `/blog/${m[2]}`,
          rule: src,
          kind: "catchall",
        };
      }
    }
  }
  return null;
}

const res = await fetch("https://ninaross.co/sitemap_articles_1.xml");
if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
const xml = await res.text();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const rows = [];
for (const loc of locs) {
  const u = new URL(loc);
  const pathname = u.pathname.replace(/\/$/, "") || "/";
  if (!pathname.startsWith("/blogs/")) continue;
  const parts = pathname.split("/").filter(Boolean);
  // category index: /blogs/hair-loss — handled by category redirects, not article classify
  if (parts.length === 2) continue;

  const hit = matchRedirect(pathname);
  if (!hit) {
    rows.push({
      old: pathname,
      destination: null,
      rule: null,
      kind: "unmapped",
      exists: false,
    });
    continue;
  }
  const exists = STATIC_DESTS.has(hit.destination);
  rows.push({
    old: pathname,
    destination: hit.destination,
    rule: hit.rule,
    kind: hit.kind,
    exists,
  });
}

const catchallMissing = rows.filter((r) => r.kind === "catchall" && !r.exists);
const exactMissing = rows.filter(
  (r) => (r.kind === "exact" || r.kind === "regex") && !r.exists,
);
const ok = rows.filter((r) => r.exists);
const unmapped = rows.filter((r) => r.kind === "unmapped");

const outDir = path.join(nextRoot, "scripts");
const reportPath = path.join(outDir, "legacy-blog-redirect-report.json");
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      fetchedAt: new Date().toISOString(),
      totalArticles: rows.length,
      ok: ok.length,
      catchallWould404: catchallMissing.length,
      explicitWould404: exactMissing.length,
      unmapped: unmapped.length,
      catchallMissing,
      exactMissing,
      unmapped,
    },
    null,
    2,
  ),
);

console.log(`Articles classified: ${rows.length}`);
console.log(`  OK (dest exists):     ${ok.length}`);
console.log(`  Catch-all → 404 risk: ${catchallMissing.length}`);
console.log(`  Explicit → 404 risk:  ${exactMissing.length}`);
console.log(`  Unmapped:             ${unmapped.length}`);
console.log(`Report: ${reportPath}`);
if (catchallMissing.length) {
  console.log("\nCatch-all destinations missing on new site (sample):");
  for (const r of catchallMissing.slice(0, 40)) {
    console.log(`  ${r.old} → ${r.destination}`);
  }
  if (catchallMissing.length > 40) {
    console.log(`  … +${catchallMissing.length - 40} more`);
  }
}
