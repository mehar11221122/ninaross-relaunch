import type { TreatmentRef } from "./types";

/** Treatment routes. Some pages are not built yet; links are real either way. */
export const treatments: Record<string, TreatmentRef> = {
  "prp-therapy": {
    slug: "prp-therapy",
    name: "PRP Therapy",
    href: "/treatments/prp-therapy",
    blurb: "Growth signals placed into the scalp to wake follicles that are still viable.",
  },
  "exosome-therapy": {
    slug: "exosome-therapy",
    name: "Growth Exosome Therapy",
    href: "/treatments/exosome-therapy",
    blurb: "Concentrated growth signals delivered to follicles that have gone quiet.",
  },
  "red-light-therapy": {
    slug: "red-light-therapy",
    name: "Red Light Therapy",
    href: "/treatments/red-light-therapy",
    blurb: "Low level light used to calm scalp inflammation and support the growth phase.",
  },
  microneedling: {
    slug: "microneedling",
    name: "Microneedling",
    href: "/treatments/microneedling",
    blurb: "Controlled micro-channels that improve delivery of topicals into the scalp.",
  },
  "restorative-therapy": {
    slug: "restorative-therapy",
    name: "Restorative Therapy Program",
    href: "/treatments/restorative-therapy",
    blurb: "A structured in-house program that treats the scalp and the systems behind it.",
  },
  "iv-nutrient-therapy": {
    slug: "iv-nutrient-therapy",
    name: "IV Nutrient Therapy",
    href: "/treatments/iv-nutrient-therapy",
    blurb: "Targeted nutrient support when your labs show what the follicle is missing.",
  },
  "fusion-mesotherapy": {
    slug: "fusion-mesotherapy",
    name: "Fusion Mesotherapy",
    href: "/treatments/fusion-mesotherapy",
    blurb: "A tailored blend placed just under the surface, right where the follicle sits.",
  },
};

/** Concern slug to treatment slugs. */
export const concernTreatmentMap: Record<string, string[]> = {
  "alopecia-areata": ["prp-therapy", "exosome-therapy", "red-light-therapy"],
  "traction-alopecia": ["prp-therapy", "microneedling"],
  ccca: ["prp-therapy", "red-light-therapy", "restorative-therapy"],
  "telogen-effluvium": ["restorative-therapy", "iv-nutrient-therapy"],
  "hormonal-hair-loss": ["restorative-therapy", "iv-nutrient-therapy", "red-light-therapy"],
  "pcos-hair-loss": ["restorative-therapy", "iv-nutrient-therapy"],
  "female-hair-loss": ["prp-therapy", "microneedling", "restorative-therapy"],
  "male-pattern-baldness": ["prp-therapy", "microneedling"],
  "excess-dht": ["restorative-therapy", "prp-therapy"],
  "seborrheic-dermatitis": ["red-light-therapy", "restorative-therapy"],
  folliculitis: ["red-light-therapy", "restorative-therapy"],
  "scalp-bumps": ["red-light-therapy", "restorative-therapy"],
  "lichen-planopilaris": ["red-light-therapy", "restorative-therapy"],
  "lichen-planus": ["red-light-therapy", "restorative-therapy"],
  "postpartum-hair-loss": ["restorative-therapy", "iv-nutrient-therapy"],
  "medication-hair-loss": ["restorative-therapy", "iv-nutrient-therapy"],
  "anagen-effluvium": ["restorative-therapy", "red-light-therapy"],
  trichotillomania: ["restorative-therapy", "microneedling"],
};

export function treatmentsFor(slug: string): TreatmentRef[] {
  return (concernTreatmentMap[slug] ?? [])
    .map((t) => treatments[t])
    .filter((t): t is TreatmentRef => Boolean(t));
}
