// Wraps the approved condition detail renderer for /concerns/$slug.
// @ts-expect-error plain JS module from the approved kit
import { renderDetail } from "./nr-detail-render.js";
import hubs from "@/content/_hubs.json";

const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";
const alopeciaAreataHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291403/ninaross/lovable/concerns/alopecia-areata-patch-scalp-closeup-nina-ross-atlanta.webp";
const telogenEffluviumRecovering = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291420/ninaross/lovable/concerns/telogen-effluvium-recovering-regrowth-200x-nina-ross-atlanta.webp";
const alopeciaAreataActive = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291403/ninaross/lovable/concerns/alopecia-areata-exclamation-mark-hairs-patch-border-nina-ross-atlanta.webp";
const alopeciaAreataRestarting = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291404/ninaross/lovable/concerns/alopecia-areata-restarting-new-growth-nina-ross-atlanta.png";
const anagenEffluviumHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291404/ninaross/lovable/concerns/anagen-effluvium-200x-broken-hair-shafts-nina-ross-atlanta.webp";
const medicationHairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291414/ninaross/lovable/concerns/medication-hair-loss-200x-diffuse-shedding-nina-ross-atlanta.webp";
const telogenEffluviumHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291419/ninaross/lovable/concerns/telogen-effluvium-200x-diffuse-shedding-nina-ross-atlanta.webp";
const telogenEffluviumEvenShedding = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291420/ninaross/lovable/concerns/telogen-effluvium-even-shedding-200x-nina-ross-atlanta.png";
const cccaHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291404/ninaross/lovable/concerns/ccca-200x-crown-scarred-and-active-nina-ross-atlanta.webp";
const cccaScarredCenter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291406/ninaross/lovable/concerns/ccca-scarred-center-200x-nina-ross-atlanta.png";
const cccaActiveBorder = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291405/ninaross/lovable/concerns/ccca-active-border-200x-nina-ross-atlanta.webp";
const excessDhtHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291406/ninaross/lovable/concerns/excess-dht-200x-miniaturization-nina-ross-atlanta.webp";
const excessDhtMiniaturized = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291406/ninaross/lovable/concerns/excess-dht-miniaturized-follicle-200x-nina-ross-atlanta.webp";
const excessDhtStillHealthy = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291408/ninaross/lovable/concerns/excess-dht-still-healthy-200x-nina-ross-atlanta.png";
const tractionAlopeciaHairline = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291420/ninaross/lovable/concerns/traction-alopecia-hairline-200x-nina-ross-atlanta.webp";
const tractionAlopeciaOpeningsPresent = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291421/ninaross/lovable/concerns/traction-alopecia-openings-present-200x-nina-ross-atlanta.png";
const tractionAlopeciaOpeningsAbsent = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291421/ninaross/lovable/concerns/traction-alopecia-openings-absent-200x-nina-ross-atlanta.webp";
const trichotillomaniaHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291421/ninaross/lovable/concerns/trichotillomania-broken-hairs-varied-lengths-200x-nina-ross-atlanta.webp";
const trichotillomaniaRecovering = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291422/ninaross/lovable/concerns/trichotillomania-recovering-200x-nina-ross-atlanta.webp";
const trichotillomaniaChanged = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291422/ninaross/lovable/concerns/trichotillomania-fewer-openings-long-standing-200x-nina-ross-atlanta.webp";
const lichenPlanopilarisHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291411/ninaross/lovable/concerns/lichen-planopilaris-perifollicular-scale-200x-nina-ross-atlanta.webp";
const lichenPlanopilarisLpp = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291411/ninaross/lovable/concerns/lichen-planopilaris-scale-erythema-irregular-borders-200x-nina-ross-atlanta.webp";
const femaleHairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291408/ninaross/lovable/concerns/female-hair-loss-widened-part-200x-nina-ross-atlanta.webp";
const femaleHairLossDiffuse = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291408/ninaross/lovable/concerns/female-hair-loss-diffuse-thinning-200x-nina-ross-atlanta.webp";
const femaleHairLossShed = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291408/ninaross/lovable/concerns/female-hair-loss-shed-regrowing-hairs-200x-nina-ross-atlanta.webp";
const cccCompare01 = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291406/ninaross/lovable/concerns/ccca-white-halos-crown-200x-nina-ross-atlanta.webp";
const lichenPlanusHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291412/ninaross/lovable/concerns/lichen-planus-redness-ringing-follicles-200x-nina-ross-atlanta.webp";
const lichenPlanusOrdinaryFlaking = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291412/ninaross/lovable/concerns/lichen-planus-ordinary-flaking-200x-nina-ross-atlanta.webp";
const lichenPlanusFollicularInvolvement = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291412/ninaross/lovable/concerns/lichen-planus-follicular-involvement-200x-nina-ross-atlanta.png";
const malePatternBaldnessHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291414/ninaross/lovable/concerns/male-pattern-baldness-crown-thinning-200x-nina-ross-atlanta.png";
const malePatternBaldnessCrown = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291413/ninaross/lovable/concerns/male-pattern-baldness-crown-miniaturization-200x-nina-ross-atlanta.webp";
const malePatternBaldnessDonorZone = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291414/ninaross/lovable/concerns/male-pattern-baldness-donor-zone-200x-nina-ross-atlanta.webp";
const hormonalHairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291410/ninaross/lovable/concerns/hormonal-hair-loss-mixed-thickness-200x-nina-ross-atlanta.png";
const hormonalHairLossHormonePattern = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291410/ninaross/lovable/concerns/hormonal-hair-loss-hormone-pattern-200x-nina-ross-atlanta.webp";
const hormonalHairLossRegrowth = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291410/ninaross/lovable/concerns/hormonal-hair-loss-regrowth-200x-nina-ross-atlanta.webp";
const pcosHairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291416/ninaross/lovable/concerns/pcos-hair-loss-widened-part-200x-nina-ross-atlanta.webp";
const pcosHairLossPattern = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291416/ninaross/lovable/concerns/pcos-hair-loss-pcos-pattern-200x-nina-ross-atlanta.png";
const pcosHairLossCoarse = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291414/ninaross/lovable/concerns/pcos-hair-loss-coarse-hair-200x-nina-ross-atlanta.webp";
const postpartumHairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291416/ninaross/lovable/concerns/postpartum-hair-loss-shedding-200x-nina-ross-atlanta.webp";
const postpartumHairLossShedding = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291417/ninaross/lovable/concerns/postpartum-hair-loss-shedding-part-200x-nina-ross-atlanta.png";
const postpartumHairLossRecovery = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291416/ninaross/lovable/concerns/postpartum-hair-loss-recovery-200x-nina-ross-atlanta.webp";
const folliculitisHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291409/ninaross/lovable/concerns/folliculitis-inflamed-follicle-200x-nina-ross-atlanta.webp";
const folliculitisCrusting = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291409/ninaross/lovable/concerns/folliculitis-crusting-200x-nina-ross-atlanta.png";
const folliculitisHealing = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291409/ninaross/lovable/concerns/folliculitis-healing-200x-nina-ross-atlanta.webp";
const scalpBumpsIntact = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291417/ninaross/lovable/concerns/scalp-bumps-openings-intact-200x-nina-ross-atlanta.webp";
const scalpBumpsLost = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291417/ninaross/lovable/concerns/scalp-bumps-openings-lost-200x-nina-ross-atlanta.webp";
const seborrheicHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291418/ninaross/lovable/concerns/seborrheic-dermatitis-greasy-flakes-200x-nina-ross-atlanta.webp";
const seborrheicBefore = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291419/ninaross/lovable/concerns/seborrheic-dermatitis-stuck-on-scale-200x-nina-ross-atlanta.webp";
const seborrheicAfter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291418/ninaross/lovable/concerns/seborrheic-dermatitis-clean-openings-200x-nina-ross-atlanta.png";
const scalpBumpsHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291418/ninaross/lovable/concerns/scalp-bumps-raised-bump-200x-nina-ross-atlanta.webp";
const prpTherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291430/ninaross/lovable/treatments/prp-therapy-treatment-session-nina-ross-atlanta.webp";
const exosomeTherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291428/ninaross/lovable/treatments/exosome-therapy-treatment-session-nina-ross-atlanta.webp";
const growthFactorsTherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291430/ninaross/lovable/treatments/growth-factors-therapy-treatment-session-nina-ross-atlanta.webp";
const fusionMesotherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291429/ninaross/lovable/treatments/fusion-mesotherapy-treatment-session-nina-ross-atlanta.png";
const redLightTherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291430/ninaross/lovable/treatments/red-light-therapy-treatment-session-nina-ross-atlanta.png";
const ivNutrientCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291429/ninaross/lovable/treatments/iv-nutrient-therapy-session-nina-ross-atlanta.webp";
const microneedlingCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291430/ninaross/lovable/treatments/microneedling-treatment-session-nina-ross-atlanta.webp";
const restorativeTherapyCover = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291430/ninaross/lovable/treatments/restorative-therapy-treatment-session-nina-ross-atlanta.webp";

const files = import.meta.glob("../content/concerns/*.json", { eager: true, import: "default" }) as Record<
  string,
  { slug: string; seoTitle: string; description: string }
>;
const tFiles = import.meta.glob("../content/treatments/*.json", { eager: true, import: "default" }) as typeof files;
const PAGES: Record<string, { slug: string; seoTitle: string; description: string }> = {};
for (const p of Object.values(files)) PAGES[p.slug] = p;
const TPAGES: Record<string, { slug: string; seoTitle: string; description: string }> = {};
for (const p of Object.values(tFiles)) TPAGES[p.slug] = p;
export const TREATMENT_SLUGS = Object.keys(TPAGES);

export const CONCERN_SLUGS = Object.keys(PAGES);

export function renderConcernParts(slug: string, kind: "concern" | "treatment" = "concern") {
  const page = (kind === "treatment" ? TPAGES : PAGES)[slug];
  if (!page) return null;
  let html: string = renderDetail(page, hubs as never);
  html = html.split("img/nina-portrait.webp").join(ninaPortrait);
  html = html
    .split("img/alopecia-areata-patch-scalp-closeup-nina-ross-atlanta.png")
    .join(alopeciaAreataHero);
  html = html
    .split("img/alopecia-areata-exclamation-mark-hairs-patch-border-nina-ross-atlanta.png")
    .join(alopeciaAreataActive);
  html = html
    .split("img/alopecia-areata-restarting-new-growth-nina-ross-atlanta.png")
    .join(alopeciaAreataRestarting);
  html = html
    .split("img/anagen-effluvium-200x-broken-hair-shafts-nina-ross-atlanta.png")
    .join(anagenEffluviumHero);
  html = html
    .split("img/medication-hair-loss-200x-diffuse-shedding-nina-ross-atlanta.png")
    .join(medicationHairLossHero);
  html = html
    .split("img/telogen-effluvium-200x-diffuse-shedding-nina-ross-atlanta.png")
    .join(telogenEffluviumHero)
    .split("img/telogen-effluvium-even-shedding-200x-nina-ross-atlanta.png")
    .join(telogenEffluviumEvenShedding)
    .split("img/telogen-effluvium-recovering-regrowth-200x-nina-ross-atlanta.png")
    .join(telogenEffluviumRecovering);
  html = html
    .split("img/ccca-200x-crown-scarred-and-active-nina-ross-atlanta.png")
    .join(cccaHero);
  html = html
    .split("img/ccca-scarred-center-200x-nina-ross-atlanta.png")
    .join(cccaScarredCenter);
  html = html
    .split("img/ccca-active-border-200x-nina-ross-atlanta.png")
    .join(cccaActiveBorder);
  html = html
    .split("img/excess-dht-200x-miniaturization-nina-ross-atlanta.png")
    .join(excessDhtHero);
  html = html
    .split("img/excess-dht-miniaturized-follicle-200x-nina-ross-atlanta.png")
    .join(excessDhtMiniaturized);
  html = html
    .split("img/excess-dht-still-healthy-200x-nina-ross-atlanta.png")
    .join(excessDhtStillHealthy);
  html = html
    .split("img/female-hair-loss-widened-part-200x-nina-ross-atlanta.png")
    .join(femaleHairLossHero)
    .split("img/female-hair-loss-diffuse-thinning-200x-nina-ross-atlanta.png")
    .join(femaleHairLossDiffuse)
    .split("img/female-hair-loss-shed-regrowing-hairs-200x-nina-ross-atlanta.png")
    .join(femaleHairLossShed)
    .split("img/lichen-planopilaris-perifollicular-scale-200x-nina-ross-atlanta.png")
    .join(lichenPlanopilarisHero)
    .split("img/lichen-planopilaris-scale-erythema-irregular-borders-200x-nina-ross-atlanta.png")
    .join(lichenPlanopilarisLpp)
    .split("img/ccca-white-halos-crown-200x-nina-ross-atlanta.png")
    .join(cccCompare01);
  html = html
    .split("img/traction-alopecia-hairline-200x-nina-ross-atlanta.png")
    .join(tractionAlopeciaHairline);
  html = html
    .split("img/trichotillomania-broken-hairs-varied-lengths-200x-nina-ross-atlanta.png")
    .join(trichotillomaniaHero);
  html = html
    .split("img/traction-alopecia-openings-present-200x-nina-ross-atlanta.png")
    .join(tractionAlopeciaOpeningsPresent)
    .split("img/traction-alopecia-openings-absent-200x-nina-ross-atlanta.png")
    .join(tractionAlopeciaOpeningsAbsent)
    .split("img/trichotillomania-recovering-200x-nina-ross-atlanta.png")
    .join(trichotillomaniaRecovering)
    .split("img/trichotillomania-fewer-openings-long-standing-200x-nina-ross-atlanta.png")
    .join(trichotillomaniaChanged)
    .split("img/lichen-planus-redness-ringing-follicles-200x-nina-ross-atlanta.png")
    .join(lichenPlanusHero)
    .split("img/lichen-planus-ordinary-flaking-200x-nina-ross-atlanta.png")
    .join(lichenPlanusOrdinaryFlaking)
    .split("img/lichen-planus-follicular-involvement-200x-nina-ross-atlanta.png")
    .join(lichenPlanusFollicularInvolvement)
    .split("img/male-pattern-baldness-crown-thinning-200x-nina-ross-atlanta.png")
    .join(malePatternBaldnessHero)
    .split("img/male-pattern-baldness-crown-miniaturization-200x-nina-ross-atlanta.png")
    .join(malePatternBaldnessCrown)
    .split("img/male-pattern-baldness-donor-zone-200x-nina-ross-atlanta.png")
    .join(malePatternBaldnessDonorZone)
    .split("img/hormonal-hair-loss-mixed-thickness-200x-nina-ross-atlanta.png")
    .join(hormonalHairLossHero)
    .split("img/hormonal-hair-loss-hormone-pattern-200x-nina-ross-atlanta.png")
    .join(hormonalHairLossHormonePattern)
    .split("img/hormonal-hair-loss-regrowth-200x-nina-ross-atlanta.png")
    .join(hormonalHairLossRegrowth)
    .split("img/pcos-hair-loss-widened-part-200x-nina-ross-atlanta.png")
    .join(pcosHairLossHero)
    .split("img/pcos-hair-loss-pcos-pattern-200x-nina-ross-atlanta.png")
    .join(pcosHairLossPattern)
    .split("img/pcos-hair-loss-coarse-hair-200x-nina-ross-atlanta.png")
    .join(pcosHairLossCoarse)
    .split("img/postpartum-hair-loss-shedding-200x-nina-ross-atlanta.png")
    .join(postpartumHairLossHero)
    .split("img/postpartum-hair-loss-shedding-part-200x-nina-ross-atlanta.png")
    .join(postpartumHairLossShedding)
    .split("img/postpartum-hair-loss-recovery-200x-nina-ross-atlanta.png")
    .join(postpartumHairLossRecovery)
    .split("img/folliculitis-inflamed-follicle-200x-nina-ross-atlanta.png")
    .join(folliculitisHero)
    .split("img/folliculitis-crusting-200x-nina-ross-atlanta.png")
    .join(folliculitisCrusting)
    .split("img/folliculitis-healing-200x-nina-ross-atlanta.png")
    .join(folliculitisHealing)
    .split("img/scalp-bumps-raised-bump-200x-nina-ross-atlanta.png")
    .join(scalpBumpsHero)
    .split("img/scalp-bumps-openings-intact-200x-nina-ross-atlanta.png")
    .join(scalpBumpsIntact)
    .split("img/scalp-bumps-openings-lost-200x-nina-ross-atlanta.png")
    .join(scalpBumpsLost)
    .split("img/seborrheic-dermatitis-greasy-flakes-200x-nina-ross-atlanta.png")
    .join(seborrheicHero)
    .split("img/seborrheic-dermatitis-stuck-on-scale-200x-nina-ross-atlanta.png")
    .join(seborrheicBefore)
    .split("img/seborrheic-dermatitis-clean-openings-200x-nina-ross-atlanta.png")
    .join(seborrheicAfter)
    .split("img/prp-therapy-treatment-session-nina-ross-atlanta.png")
    .join(prpTherapyCover)
    .split("img/exosome-therapy-treatment-session-nina-ross-atlanta.png")
    .join(exosomeTherapyCover)
    .split("img/growth-factors-therapy-treatment-session-nina-ross-atlanta.png")
    .join(growthFactorsTherapyCover)
    .split("img/fusion-mesotherapy-treatment-session-nina-ross-atlanta.png")
    .join(fusionMesotherapyCover)
    .split("img/red-light-therapy-treatment-session-nina-ross-atlanta.png")
    .join(redLightTherapyCover)
    .split("img/microneedling-treatment-session-nina-ross-atlanta.png")
    .join(microneedlingCover)
    .split("img/iv-nutrient-therapy-session-nina-ross-atlanta.png")
    .join(ivNutrientCover)
    .split("img/restorative-therapy-treatment-session-nina-ross-atlanta.png")
    .join(restorativeTherapyCover);
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("<script src=");
  const body = html.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : html.lastIndexOf("</body>"));
  return { slug, body, schema, title: page.seoTitle, description: page.description };
}
