/**
 * One-off responsive audit: overflow + clipped interactive at given widths.
 * Usage: bun scripts/responsive-audit.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";
const WIDTHS = [375, 768];

const EXTRA = [
  "/privacy-policy",
  "/policies",
  "/landing-2",
  "/blog/treatment-methods",
  "/blog/hair-care",
];

async function loadPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return m[1].replace(/^https?:\/\/[^/]+/, "") || "/";
    }
  });
  const set = new Set([...locs, ...EXTRA]);
  return [...set].sort();
}

async function auditPage(page, path, width) {
  const issues = [];
  await page.setViewportSize({ width, height: 844 });
  const res = await page.goto(`${BASE}${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  if (!res || !res.ok()) {
    issues.push(`HTTP ${res?.status() ?? "fail"}`);
    return issues;
  }
  await page.waitForTimeout(400);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollW = Math.max(doc.scrollWidth, body?.scrollWidth ?? 0);
    const clientW = doc.clientWidth;
    const overflowX = scrollW > clientW + 2;

    const offenders = [];
    if (overflowX) {
      const all = [...document.querySelectorAll("body *")];
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (r.right > clientW + 2 || r.left < -2) {
          const tag = el.tagName.toLowerCase();
          const cls = (el.className && String(el.className).slice?.(0, 80)) || "";
          offenders.push(`${tag}.${cls}`.slice(0, 120));
          if (offenders.length >= 8) break;
        }
      }
    }

    // Interactive elements with zero size or off-screen left/right
    const badTap = [];
    for (const el of document.querySelectorAll(
      "a, button, [role='button'], summary, input, select, textarea",
    )) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (style.opacity === "0") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right < 0 || r.left > clientW) {
        badTap.push(
          `${el.tagName.toLowerCase()}:${(el.getAttribute("aria-label") || el.textContent || "")
            .trim()
            .slice(0, 40)}`,
        );
        if (badTap.length >= 5) break;
      }
    }

    return {
      overflowX,
      scrollW,
      clientW,
      offenders,
      badTap,
      hasGcMenu: !!document.querySelector(".gc-hd__menu, .hd__menu, .blog-menu-button"),
    };
  });

  if (metrics.overflowX) {
    issues.push(
      `overflow-x (${metrics.scrollW}>${metrics.clientW}) via ${metrics.offenders.join(" | ") || "unknown"}`,
    );
  }
  if (metrics.badTap.length) {
    issues.push(`offscreen controls: ${metrics.badTap.join("; ")}`);
  }
  return issues;
}

const paths = await loadPaths();
console.log(`Auditing ${paths.length} paths × ${WIDTHS.length} widths against ${BASE}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];

for (const width of WIDTHS) {
  for (const path of paths) {
    try {
      const issues = await auditPage(page, path, width);
      if (issues.length) {
        const row = { width, path, issues };
        failures.push(row);
        console.log(`FAIL ${width} ${path}: ${issues.join(" :: ")}`);
      } else {
        console.log(`ok   ${width} ${path}`);
      }
    } catch (e) {
      const row = { width, path, issues: [String(e.message || e)] };
      failures.push(row);
      console.log(`ERR  ${width} ${path}: ${row.issues[0]}`);
    }
  }
}

await browser.close();

console.log("\n=== SUMMARY ===");
console.log(`paths=${paths.length} failures=${failures.length}`);
console.log(JSON.stringify(failures, null, 2));
process.exit(failures.length ? 1 : 0);
