import {
  esc,
  tpEyebrow,
  tpH2,
  tpSection,
  nap,
  offer,
  trust,
} from "@/lib/nr-text-parts";

export function renderBookBody(): string {
  const includes = offer.includes.map((item) => `<li>${esc(item)}</li>`).join("");
  return `<div class="text-page">
<main>
${tpSection(
  "bone",
  `${tpEyebrow(`${offer.duration} · ${nap.hours}`)}
  <h1 style="margin:.75rem 0 0;font-size:34px;line-height:1.05;font-weight:900;letter-spacing:-0.025em;text-transform:uppercase;color:var(--tp-ink)">Book Your $99 Hair &amp; Body Discovery</h1>
  <h2 style="margin:2rem 0 0;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--tp-ink)">What Your Discovery Includes</h2>
  <ul class="tp-book-list">${includes}</ul>
  ${tpH2("Pick A Time That Works For You")}
  <p class="tp-body" style="max-width:42rem">${esc(offer.riskReversal)}</p>
  <p style="margin:1rem 0 0;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--tp-body)">${esc(offer.metaLine)}</p>
  <div class="tp-iframe-wrap"><iframe title="Booking calendar" src="${esc(trust.bookingUrl)}" loading="eager"></iframe></div>
  <p style="margin:1.5rem 0 0;font-size:14px;color:var(--tp-body)">${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.phone)}. ${esc(nap.hours)}. ${esc(nap.serviceArea)}.</p>`,
)}
</main>
</div>`;
}
