import {
  esc,
  icon,
  tpCrumbs,
  tpEyebrow,
  tpFaqBlock,
  tpH2,
  tpPhoneOutline,
  tpPrimary,
  tpSection,
  tpSticky,
  ctas,
  nap,
  offer,
} from "@/lib/nr-text-parts";

const contactFaq = [
  {
    q: "Where do I park?",
    a: "Parking at the building is free and there is no deck fee or validation to deal with. We are on Dunwoody Place, just off GA-400 near the Perimeter, and Suite 290 is signed once you are inside.",
  },
  {
    q: "What are your hours?",
    a: `We are open ${nap.hours}. Appointments run one-on-one, so times are held for you rather than shared with a walk-in floor.`,
  },
  {
    q: "Should I book online or call?",
    a: `If you want the ${offer.name}, booking online is the fastest path and takes about a minute. Call ${nap.phone} during clinic hours if you have questions about your situation, paperwork, or scheduling changes.`,
  },
];

export function renderContactBody(): string {
  // Google Business pin is "Nina Ross Atlanta"; !6i18 = street-level clinic view
  // (Dunwoody Pl + storefronts; Atlanta Trichology stays off-frame).
  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m3!2m1!1sNina+Ross+Atlanta,+8735+Dunwoody+Place,+Sandy+Springs,+GA!6i18";
  const includes = offer.includes
    .map(
      (item) =>
        `<div class="tp-check"><span class="tp-check__ico">${icon.check}</span><span style="font-size:15px;line-height:1.625;color:var(--tp-ink)">${esc(item)}</span></div>`,
    )
    .join("");
  const pills = offer.pills.map((p) => `<span class="tp-pill">${esc(p)}</span>`).join("");

  return `<div class="text-page pb-sticky">
<main>
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("Contact")}
  <h1 class="tp-h1">Contact <span class="accent">Nina Ross Hair Therapy</span></h1>
  <p class="tp-lead">Reach the clinic in ${esc(nap.city)}, or book the ${esc(offer.name)} online in about a minute.</p>
  <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary)}${tpPhoneOutline()}</div>
</div></header>

${tpSection(
  "alt",
  `${tpEyebrow("Find Us")}${tpH2("Address, Hours, And Phone")}
  <div class="tp-grid-3">
    <div class="tp-card">${icon.map}<h3 class="tp-label">Address</h3><address class="tp-strong" style="margin-top:.5rem;font-style:normal;line-height:1.625">${esc(nap.name)}<br>${esc(nap.street)}<br>${esc(nap.city)}, ${esc(nap.region)} ${esc(nap.postalCode)}</address><p class="tp-body">${esc(nap.building)}</p></div>
    <div class="tp-card">${icon.phone}<h3 class="tp-label">Phone</h3><a class="tp-phone-lg" href="${esc(nap.phoneHref)}">${esc(nap.phone)}</a><p class="tp-body">Call during clinic hours and a person answers.</p></div>
    <div class="tp-card">${icon.clock}<h3 class="tp-label">Hours</h3><p class="tp-strong" style="margin-top:.5rem">${esc(nap.hours)}</p><p class="tp-body">Same-week appointments are usually available.</p></div>
  </div>
  <p class="tp-body" style="margin-top:1.5rem;max-width:42rem">${esc(nap.serviceArea)}. Clients drive in from Sandy Springs and Dunwoody in a few minutes, and from Atlanta, Brookhaven, Roswell, Marietta, Decatur, and Alpharetta for their appointments.</p>`,
)}

${tpSection(
  "bone",
  `${tpEyebrow("The Map")}${tpH2("On Dunwoody Place, Just Off GA-400")}
  <div class="tp-map"><iframe title="Map showing Nina Ross Atlanta at ${esc(nap.full)}" src="${mapEmbedSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  <p style="margin-top:1rem;font-size:14px;font-weight:600;color:var(--tp-body)">${esc(nap.full)}. ${esc(nap.building)}</p>`,
)}

${tpSection(
  "bone",
  `${tpEyebrow("Your Visit")}${tpH2("What Getting Here Looks Like")}
  <div class="tp-space-y" style="margin-top:1.5rem;max-width:48rem;font-size:16px;line-height:1.625;color:var(--tp-body)">
    <p>The clinic sits on Dunwoody Place, a short turn off GA-400 near the Perimeter, so it is reachable from most of the north metro without sitting in surface traffic. Parking at the building is free.</p>
    <p>You walk into the Nina Ross Functional Medicine building and check in at reception, then head to Suite 290. It is quiet and private, and you are taken to a treatment room rather than a salon floor. Sessions run one-on-one, ${esc(nap.hours)}.</p>
    <div class="tp-inline-links"><a href="/hair-restoration-sandy-springs">Hair Restoration In Sandy Springs</a><a href="/about">About The Clinic</a></div>
  </div>`,
)}

${tpSection(
  "alt",
  `<div class="tp-offer">
    ${tpEyebrow(offer.name)}${tpH2("First We See. Then We Treat.")}
    <div class="tp-grid-2">${includes}</div>
    <div class="tp-pills">${pills}</div>
    <p style="margin:1.5rem 0 0;font-size:15px;line-height:1.625;font-weight:600;color:var(--tp-ink)">${esc(offer.riskReversalShort)}</p>
    <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary)}${tpPhoneOutline()}</div>
    <p class="tp-meta">${esc(offer.metaLine)}</p>
  </div>`,
)}

${tpSection("bone", tpFaqBlock(contactFaq, { openFirst: true, title: "Honest Answers Before You Commit", eyebrow: "Questions, Answered" }))}
</main>
${tpSticky()}
</div>`;
}

export { contactFaq };
