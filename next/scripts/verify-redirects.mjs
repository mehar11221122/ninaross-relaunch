/**
 * Verify legacy redirects + 410s on a deploy (default: production vercel.app).
 * Usage: bun scripts/verify-redirects.mjs [baseUrl]
 */
const BASE = (process.argv[2] || "https://ninarosshair.vercel.app").replace(
  /\/$/,
  "",
);

const CHECKS = [
  {
    path: "/pages/black-trichologist-atlanta",
    expectStatus: [301, 308],
    expectLocation: "/black-trichologist-atlanta",
  },
  {
    path: "/blogs/hair-loss/what-is-folliculitis",
    expectStatus: [301, 308],
    expectLocation: "/concerns/folliculitis",
  },
  {
    path: "/hair-extensions-salons-atlanta-ga",
    expectStatus: [301, 308],
    expectLocation: "/trichology",
  },
  {
    path: "/book-now",
    expectStatus: [301, 308],
    expectLocation: "/book",
  },
  {
    path: "/pages/about-us",
    expectStatus: [301, 308],
    expectLocation: "/about",
  },
  {
    path: "/blogs/hair-loss/how-to-stop-alopecia-areata-from-spreading",
    expectStatus: [301, 308],
    expectLocation: "/blog/how-to-stop-alopecia-areata-from-spreading",
  },
  {
    path: "/collections/all",
    expectStatus: [301, 308],
    expectLocation: "/treatments",
  },
  { path: "/cart", expectStatus: [410] },
  { path: "/checkout", expectStatus: [410] },
  { path: "/products/some-sku", expectStatus: [410] },
  { path: "/collections/retired-line", expectStatus: [410] },
  { path: "/account/login", expectStatus: [410] },
];

function locationPath(loc, base) {
  if (!loc) return null;
  try {
    const u = new URL(loc, base);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return loc;
  }
}

async function checkOne(c) {
  const url = `${BASE}${c.path}`;
  const res = await fetch(url, { method: "GET", redirect: "manual" });
  const loc = res.headers.get("location");
  const dest = locationPath(loc, BASE);
  const statusOk = c.expectStatus.includes(res.status);
  let locOk = true;
  if (c.expectLocation) {
    locOk = dest === c.expectLocation;
  }
  // Single-hop: follow once and ensure we don't get another redirect to a different path chain
  let hop2 = null;
  if (loc && statusOk && c.expectLocation) {
    const res2 = await fetch(new URL(loc, BASE), {
      method: "GET",
      redirect: "manual",
    });
    hop2 = {
      status: res2.status,
      location: locationPath(res2.headers.get("location"), BASE),
    };
  }
  const chain =
    hop2 &&
    [301, 302, 307, 308].includes(hop2.status) &&
    hop2.location &&
    hop2.location !== c.expectLocation;

  return {
    path: c.path,
    status: res.status,
    location: dest,
    ok: statusOk && locOk && !chain,
    hop2,
    expectStatus: c.expectStatus,
    expectLocation: c.expectLocation || null,
  };
}

console.log(`Verifying against ${BASE}`);
const results = [];
for (const c of CHECKS) {
  results.push(await checkOne(c));
}

let failed = 0;
for (const r of results) {
  const mark = r.ok ? "OK  " : "FAIL";
  if (!r.ok) failed++;
  console.log(
    `${mark} ${r.status} ${r.path}` +
      (r.location ? ` → ${r.location}` : "") +
      (r.expectLocation && !r.ok ? ` (want ${r.expectLocation})` : ""),
  );
  if (r.hop2 && [301, 302, 307, 308].includes(r.hop2.status)) {
    console.log(`     hop2: ${r.hop2.status} → ${r.hop2.location}`);
  }
}

console.log(
  failed
    ? `\n${failed}/${results.length} checks failed`
    : `\nAll ${results.length} checks passed`,
);
process.exit(failed ? 1 : 0);
