import { claims, credentials, ctas, nap, offer, trust } from "@/data/trust";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const icon = {
  phone: `<svg class="tp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
  map: `<svg class="tp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg class="tp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chev: `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
};

export function tpSection(
  tone: "bone" | "alt" | "wine" | "ink",
  inner: string,
  opts?: { id?: string },
): string {
  const id = opts?.id ? ` id="${esc(opts.id)}"` : "";
  return `<section class="tp-section tp-section--${tone}"${id}><div class="tp-wrap">${inner}</div></section>`;
}

export function tpEyebrow(text: string, tone: "wine" | "gold" = "wine"): string {
  return `<p class="tp-eyebrow${tone === "gold" ? " tp-eyebrow--gold" : ""}">${esc(text)}</p>`;
}

export function tpH2(text: string, white = false): string {
  return `<h2 class="tp-h2${white ? " white" : ""}">${esc(text)}</h2>`;
}

export function tpPrimary(href: string, label: string, gold = false): string {
  return `<a class="tp-btn${gold ? " tp-btn--gold" : ""}" href="${esc(href)}">${esc(label)}</a>`;
}

export function tpPhoneOutline(light = false): string {
  return `<a class="tp-btn-outline${light ? " tp-btn-outline--light" : ""}" href="${esc(nap.phoneHref)}">${icon.phone} ${esc(nap.phone)}</a>`;
}

export function tpCrumbs(current: string): string {
  return `<nav aria-label="Breadcrumb" class="tp-crumb"><ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li class="cur">${esc(current)}</li></ol></nav>`;
}

export function tpSticky(): string {
  return `<div class="tp-sticky"><a href="${esc(ctas.href)}">${esc(ctas.sticky)}</a></div>`;
}

export function tpFaqBlock(
  items: { q: string; a: string }[],
  opts?: { openFirst?: boolean; title?: string; eyebrow?: string },
): string {
  const rows = items
    .map((f, i) => {
      const open = opts?.openFirst && i === 0 ? " open" : "";
      return `<details${open}><summary><span>${esc(f.q)}</span>${icon.chev}</summary><p class="ans">${esc(f.a)}</p></details>`;
    })
    .join("");
  const head = opts?.title
    ? `${tpEyebrow(opts.eyebrow ?? "Questions, Answered")}${tpH2(opts.title)}`
    : "";
  return `${head}<div class="tp-faq" style="margin-top:2rem;max-width:48rem">${rows}</div>`;
}

export function tpDiscoveryPanel(): string {
  const includes = offer.includes
    .map(
      (item) =>
        `<div class="tp-check"><span class="tp-check__ico">${icon.check}</span><span style="font-size:16px;line-height:1.375;color:var(--tp-ink)">${esc(item)}</span></div>`,
    )
    .join("");
  const pills = offer.pills
    .map(
      (p) =>
        `<span style="border-radius:9999px;border:1px solid rgba(16,17,18,.1);background:#fff;padding:.375rem .75rem;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tp-body)">${esc(p)}</span>`,
    )
    .join("");
  return (
    tpSection(
      "bone",
      `<div class="tp-offer" id="discovery">
      ${tpEyebrow(offer.name)}
      ${tpH2("First We See. Then We Treat.")}
      <div class="tp-grid-2">${includes}</div>
      <div class="tp-pills" style="margin-top:1.5rem">${pills}</div>
      <div class="tp-promise"><p class="label">Our Promise</p><p class="body">${esc(offer.riskReversal)}</p></div>
      <div class="tp-actions">
        ${tpPrimary(ctas.href, ctas.primary)}
        <button type="button" class="tp-btn-outline" data-tp-sample-open style="cursor:pointer;background:transparent;font-family:inherit;letter-spacing:.05em;text-transform:uppercase;font-size:13px">${esc(ctas.sample)}</button>
      </div>
      <p class="tp-meta">${esc(offer.metaLine)}</p>
      <p style="margin:.5rem 0 0;font-size:12px;color:var(--tp-muted)">${esc(trust.payment)}</p>
    </div>`,
      { id: "discovery-wrap" },
    ) + tpSampleModal()
  );
}

function tpSampleModal(): string {
  return `<div id="tp-sample-modal" class="tp-modal" hidden role="dialog" aria-modal="true" aria-label="Sample Hair &amp; Body Discovery Report" data-tp-sample-close>
  <div class="tp-modal__panel" onclick="event.stopPropagation()">
    ${tpEyebrow("Sample Report")}
    <h3 style="margin:.75rem 0 0;font-size:22px;font-weight:800;text-transform:uppercase">What Lands In Your Inbox</h3>
    <ul style="margin:1.25rem 0 0;padding-left:1.25rem;font-size:15px;color:var(--tp-body);line-height:1.6">
      <li>Your scalp at 200x, with the areas we read marked.</li>
      <li>What the pattern looks like, in plain language.</li>
      <li>Which follicles look active and which areas need protecting.</li>
      <li>The suggested next steps, with no obligation attached.</li>
    </ul>
    <p style="margin:1.25rem 0 0;font-size:12px;color:var(--tp-muted)">Sample content is anonymized. ${esc(claims.resultsDisclaimer)}</p>
    <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
      ${tpPrimary(ctas.href, ctas.primary)}
      <button type="button" data-tp-sample-close style="min-height:44px;background:none;border:0;font:inherit;font-size:13px;font-weight:700;color:var(--tp-wine);text-transform:uppercase;cursor:pointer">Close</button>
    </div>
  </div>
</div>`;
}

export { esc, icon, credentials, ctas, nap, offer, trust, claims };
