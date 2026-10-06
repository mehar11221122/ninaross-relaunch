import fs from "node:fs";
import path from "node:path";
import { proofCases } from "@/data/trust";

const template = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "nr-trichology-template.html"),
  "utf8",
);

const scopeHealthy = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291431/ninaross/lovable/trichology/scalp-healthy-follicles-200x-nina-ross-atlanta.webp";
const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291431/ninaross/lovable/trichology/dr-nina-ross-nd-portrait-trichology-nina-ross-atlanta.webp";
const dermVisit = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291432/ninaross/lovable/trichology/dermatologist-visit-consultation-nina-ross-atlanta.webp";
const scarredScalp = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291406/ninaross/lovable/concerns/ccca-scarred-center-200x-nina-ross-atlanta.png";

const bodyStart = template.indexOf(">", template.indexOf("<body")) + 1;
const bodyEnd = template.lastIndexOf("<script src=");

function image(src: string, alt: string, eager = false) {
  return `<img src="${src}" alt="${alt}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
}

function caseFigure(src: string | undefined, alt: string, label: string) {
  if (!src) return "";
  return `<figure>${image(src, alt)}<figcaption>${label}</figcaption></figure>`;
}

function caseStudy(index: number) {
  const item = proofCases[index];
  if (!item) return "";
  return `<article><h3>${item.condition} <span>${item.timeframe}</span></h3><div class="tr-tri tr-tri--two">${caseFigure(item.before, `${item.condition} before trichology care at Nina Ross Atlanta`, "Before")}${caseFigure(item.after, `${item.condition} after trichology care at Nina Ross Atlanta`, "After")}</div></article>`;
}

export function renderTrichologyBody() {
  let body = template.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : template.lastIndexOf("</body>"));

  body = body
    .replaceAll("img/scope-healthy.webp", scopeHealthy)
    .replaceAll("img/nina-portrait.webp", ninaPortrait)
    .replaceAll("img/scarred-scalp.webp", scarredScalp)
    .replace(
      '<article class="tr-vs__derm">',
      `<article class="tr-vs__derm" style="--tr-derm-image:url('${dermVisit}')">`,
    )
    .replace(
      /<div class="tr-cases">[\s\S]*?<\/div>\s*<p class="dt-results">/,
      `<div class="tr-cases">${caseStudy(0)}${caseStudy(1)}</div><p class="dt-results">`,
    )
    .replace(
      "Most dermatologists are limited by what insurance approves. We're not, so we choose what works, not what's covered.",
      "Dermatology and trichology have different scopes. Our focused hair and scalp visit adds a 200x read and a whole-body view in one place.",
    )
    .replace("Insurance-bound", "A broad medical scope")
    .replace("The typical dermatology visit", "What dermatology can provide")
    .replace(
      '<ul class="tr-dash"><li>Often a short visit, mostly a visual check.</li><li>Options narrowed to what the plan will approve.</li><li>Prescription first, root cause optional.</li><li>Follow-ups often scheduled months down the line.</li></ul>',
      '<ul class="tr-dash"><li>Medical assessment across skin, hair and nails.</li><li>Prescription treatment when clinically appropriate.</li><li>Biopsy and procedures that sit outside trichology.</li><li>A valuable part of care for many clients.</li></ul>',
    )
    .replace("Our hands aren't tied by insurance. <em>So yours get the full toolbox.</em>", "Two different scopes. <em>One focused hair and scalp read.</em>")
    .replace("In-house lab work, because we look past the scalp to find the real cause.", "A full-body biofeedback scan")
    .replace("A plan built around your body, not your insurance company's formulary.", "A plan built around what your scalp read and whole-body picture show.")
    .replace("Chosen for what works, never for what a formulary allows.", "Chosen to match the findings from your visit.")
    .replace("$99 · 30 minutes · Serving Greater Atlanta", "$99 · 30 minutes · Serving all of Metro Atlanta")
    .replace(/<p class="ft__disc">[\s\S]*?<\/p>/, '<p class="ft__disc">Educational information only. This page does not diagnose a condition or replace care from your own prescriber.</p>');

  return body;
}

export const trichologyHeroPreload = scopeHealthy;
