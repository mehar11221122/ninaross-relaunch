import { faqCategories, faqItems } from "@/data/faq";
import {
  esc,
  tpCrumbs,
  tpDiscoveryPanel,
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

export function renderFaqBody(): string {
  const chips = faqCategories
    .map((c) => `<a class="tp-chip" href="#${esc(c.id)}">${esc(c.title)}</a>`)
    .join("");
  const cats = faqCategories
    .map((c, i) =>
      tpSection(
        i % 2 === 0 ? "bone" : "alt",
        `${tpEyebrow(`0${i + 1}`)}${tpH2(c.title)}
        <p class="tp-body" style="max-width:42rem">${esc(c.blurb)}</p>
        ${tpFaqBlock(c.items)}`,
        { id: c.id },
      ),
    )
    .join("");
  const nextLinks = [
    { href: "/concerns", t: "Conditions", d: "Every pattern we work with, explained one page at a time." },
    { href: "/treatments", t: "Treatments", d: "What we offer, who each option fits, and what it does not do." },
    { href: "/trichology", t: "Trichology", d: "What a trichologist is and how the 200x read works." },
    { href: "/functional-medicine", t: "Functional Medicine", d: "The hormone and nutrient side of hair loss." },
  ]
    .map(
      (l) =>
        `<a class="tp-link-card" href="${esc(l.href)}"><h3>${esc(l.t)}</h3><p>${esc(l.d)}</p></a>`,
    )
    .join("");

  return `<div class="text-page pb-sticky">
<main>
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("FAQ")}
  <h1 class="tp-h1">Frequently <span class="accent">Asked Questions</span></h1>
  <p class="tp-lead">Straight answers on the Discovery, conditions, treatments, results, and payment.</p>
  <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary)}<a class="tp-btn-outline" href="/contact">Ask A Question</a></div>
</div></header>

${tpSection(
  "alt",
  `${tpEyebrow("Jump To")}${tpH2("Five Places People Start")}
  <div class="tp-chip-row">${chips}</div>
  <p class="tp-body" style="margin-top:1.5rem;max-width:42rem">${faqItems.length} questions, answered the way we would answer them in the room. ${esc(nap.serviceArea)}.</p>`,
)}

${cats}

${tpSection(
  "alt",
  `${tpEyebrow("Read Further")}${tpH2("Where To Go Next")}
  <div class="tp-grid-2">${nextLinks}</div>`,
)}

${tpDiscoveryPanel()}

${tpSection(
  "wine",
  `${tpEyebrow("Your Next Step", "gold")}${tpH2("One Small Step Is Enough To Start", true)}
  <p class="tp-wine-p">You do not have to have it figured out before you come in. Thirty minutes, one screen, and you will finally see what your scalp is doing. ${esc(offer.riskReversalShort)} ${esc(nap.serviceArea)}.</p>
  <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary, true)}${tpPhoneOutline(true)}</div>
  <p class="tp-wine-fine">Still deciding? <a href="/contact">Send us a question</a> or <a href="/book">see available times</a>. ${esc(nap.full)}. ${esc(nap.hours)}.</p>`,
)}
</main>
${tpSticky()}
</div>`;
}
