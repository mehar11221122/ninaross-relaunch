/**
 * Blog categories are real routes at /blog/{slug}. Never query parameters.
 * One shared hub template renders each of these.
 */

/** Only routes that actually exist in src/routes may be listed here. */
export type HubLinkTarget =
  | "/hair-loss-treatment-atlanta"
  | "/prp-hair-treatment-atlanta"
  | "/traction-alopecia-treatment-atlanta"
  | "/concerns"
  | "/treatments"
  | "/functional-medicine"
  | "/trichology"
  | "/black-trichologist-atlanta";

export type HubLink = {
  to: HubLinkTarget;
  label: string;
  desc: string;
};

export type BlogCategory = {
  slug: string;
  title: string;
  blurb: string;
  /** Hub page H1. Falls back to title when absent. */
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  /** Hero supporting paragraph. */
  heroLead?: string;
  /** Quotable 75 to 150 word category promise. */
  intro?: string;
  /** Prominent links up to money and index pages. */
  upLinks?: HubLink[];
  /** Prominent concern-page cards at the top of Links Up, rendered under /concerns/{slug}. */
  featuredConcerns?: string[];
  /** Supporting condition page slugs, rendered under /concerns/{slug}. */
  concernLinks?: string[];
  /** Supporting treatment page slugs, rendered under /treatments/{slug}. */
  treatmentLinks?: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "hair-loss",
    title: "Hair Loss",
    blurb:
      "Shedding, thinning, patches, and edges. What each pattern usually means and what the scalp shows at 200x.",
    h1: "Understanding Hair Loss",
    metaTitle: "Hair Loss Blog | Nina Ross",
    metaDescription:
      "Articles on shedding, pattern loss, CCCA, traction alopecia, and what drives thinning. Straight answers from trichologists. Atlanta, GA.",
    heroLead:
      "Shedding in the shower, a part that keeps widening, thinning at the crown, edges that pull back, and the scarring alopecias that quietly close follicles for good. Two people can look the same in the mirror and have completely different causes, which is why the reading of the scalp comes before any plan.",
    intro:
      "This category covers what hair loss actually is, how the common patterns differ, and how a trichologist tells them apart. You will find plain explanations of shedding versus thinning, pattern loss, traction alopecia, CCCA and other scarring conditions, and the signs that tell us a follicle is still active. It is written for anyone who has been told to wait and see, or who has been handed a product without an explanation. Nothing here replaces an in person read of your scalp, and every article points you toward finding the cause first.",
    upLinks: [
      {
        to: "/hair-loss-treatment-atlanta",
        label: "Hair Loss Treatment In Atlanta",
        desc: "What we do once the cause is known, and how the plan is built around it.",
      },
      {
        to: "/concerns",
        label: "All Conditions",
        desc: "Every pattern we work with, explained one page at a time.",
      },
      {
        to: "/black-trichologist-atlanta",
        label: "Care For Textured Hair",
        desc: "Protective styles, relaxers, locs, and scalps that have been handled a hundred ways.",
      },
    ],
    concernLinks: ["ccca", "traction-alopecia", "telogen-effluvium", "female-hair-loss"],
  },
  {
    slug: "health-wellness",
    title: "Health & Wellness",
    blurb:
      "Hormones, iron, thyroid, stress, and the body systems that show up first in your hair.",
    h1: "Nutrition, Hormones, and Hair",
    metaTitle: "Health & Wellness for Hair | Nina Ross Blog",
    metaDescription:
      "Hormones, nutrients, iron, stress, and the internal drivers behind hair loss. Straight answers from a trichology and functional medicine clinic. Atlanta, GA.",
    heroLead:
      "Hormones, iron, thyroid function, stress load, and nutrient status can all drive shedding while the scalp still looks fine in the mirror. These articles explain the internal side of hair loss, and where lab context belongs before anyone reaches for another bottle.",
    intro:
      "This category covers the internal drivers behind hair loss: hormones, thyroid function, iron and other nutrients, stress load, and the way medications and life events change how hair cycles. You will find plain explanations of what each system does, which signs point inward rather than to the scalp itself, and when lab context is worth having before you change anything. These articles organize what is already known. They are not a reason to keep chasing supplements. The next step is a read of your scalp and a look at the systems behind it, so the plan matches the cause.",
    upLinks: [
      {
        to: "/functional-medicine",
        label: "Functional Medicine",
        desc: "The hormone, thyroid, and nutrient side of hair loss, and how we look at it.",
      },
      {
        to: "/concerns",
        label: "All Conditions",
        desc: "Every pattern we work with, explained one page at a time.",
      },
    ],
    concernLinks: ["hormonal-hair-loss", "pcos-hair-loss", "telogen-effluvium"],
    treatmentLinks: ["iv-nutrient-therapy"],
  },
  {
    slug: "treatment-methods",
    title: "Treatment Methods",
    blurb:
      "How each option works, who it fits, and what it does not do. Plain language, no hype.",
    h1: "How Hair Loss Treatments Work",
    metaTitle: "Hair Loss Treatment Methods Blog | Nina Ross",
    metaDescription:
      "How PRP, microneedling, red light, restorative programs, and other treatments actually work. Straight answers from trichologists. Atlanta, GA.",
    heroLead:
      "PRP, microneedling, red light, restorative programs, and other methods explained in plain language, with honesty about who each is for. Treatment selection follows diagnosis, not the other way around, and no modality earns a place in your plan until the scalp has been read.",
    intro:
      "This category explains how each hair loss treatment works, what it actually does, who it fits, and what it does not do. You will find plain language walkthroughs of PRP, microneedling, red light therapy, restorative programs, and the other options we use, along with honest notes on candidacy and limits. The right modality depends on what the 200x read and your labs show, which is why articles here educate rather than sell. Every treatment has people it helps and people it cannot, and the plan is built around the cause, not around a favorite tool.",
    upLinks: [
      {
        to: "/treatments",
        label: "All Treatments",
        desc: "What we offer, who each option fits, and what it does not do.",
      },
      {
        to: "/prp-hair-treatment-atlanta",
        label: "PRP Hair Treatment In Atlanta",
        desc: "Who PRP fits, who it does not, and how the screening works.",
      },
      {
        to: "/hair-loss-treatment-atlanta",
        label: "Hair Loss Treatment In Atlanta",
        desc: "How a plan is built once the cause is known.",
      },
    ],
    treatmentLinks: ["prp-therapy", "microneedling", "restorative-therapy", "red-light-therapy"],
  },
  {
    slug: "scalp-concerns",
    title: "Scalp Concerns",
    blurb:
      "Flaking, itching, bumps, buildup, and irritation, and when a scalp problem becomes a hair problem.",
    h1: "Scalp Health",
    metaTitle: "Scalp Health Blog | Nina Ross",
    metaDescription:
      "Bumps, itch, flakes, oil, and irritation explained. When scalp issues threaten hair, and what to do next. Atlanta trichologists.",
    heroLead:
      "Bumps, itch, flakes, oil, tenderness, and congestion, and how to tell when a scalp issue is threatening hair. Some stay on the surface and some quietly close follicles, and the 200x read is what separates the two.",
    intro:
      "This category covers scalp symptoms in your words and the clinical names where they help: bumps that cluster and sting, itch that will not settle, flakes that build between wash days, oil that sits heavy, and tenderness along a tight style. You will find plain explanations of folliculitis, seborrheic dermatitis, buildup, and irritation, and where trichoscopy changes the plan. Some scalp issues stay on the surface and some quietly threaten the follicle, and the 200x read is what separates the two. Nothing here replaces an in person look at your scalp, and every article points you toward finding the cause first.",
    upLinks: [
      {
        to: "/trichology",
        label: "Trichology",
        desc: "What a trichologist is and how the 200x read works.",
      },
      {
        to: "/concerns",
        label: "All Conditions",
        desc: "Every pattern we work with, explained one page at a time.",
      },
    ],
    featuredConcerns: ["scalp-bumps", "folliculitis"],
    concernLinks: ["seborrheic-dermatitis"],
    treatmentLinks: ["red-light-therapy"],
  },
  {
    slug: "hair-care",
    title: "Hair Care",
    blurb:
      "Washing, protective styles, heat, and daily handling for textured and relaxed hair.",
    h1: "Caring for Textured Hair",
    metaTitle: "Textured Hair Care Blog | Nina Ross",
    metaDescription:
      "Wash day, protective styles, edges, and textured-hair care without the blame. Guidance from trichologists who already understand your hair. Atlanta, GA.",
    heroLead:
      "Wash day, edges, protective styles, and daily care from a clinic that already understands textured hair, so she can stop explaining and start fixing what is actually wrong. Care habits matter, and they are rarely the whole story, which is why the scalp is read before anyone blames the styling.",
    intro:
      "This category covers textured-hair care in plain language: wash day, edges, protective styles, braids, weaves, locs, relaxers, heat, and the daily handling that keeps hair healthy without being treated as the reason it is leaving. You will find practical guidance from people who already understand your hair, honest notes on when a care habit is and is not the real driver of loss, and where the 200x read changes the plan. Protective styling, tension history, and wash-day habits are discussed without blame. The goal is to reframe the category, never the effort, so the next step is clarity, not guilt.",
    upLinks: [
      {
        to: "/black-trichologist-atlanta",
        label: "Black Trichologist In Atlanta",
        desc: "Care for textured hair from a clinic that already understands protective styles, relaxers, locs, and scalps that have been handled a hundred ways.",
      },
      {
        to: "/traction-alopecia-treatment-atlanta",
        label: "Traction Alopecia Treatment",
        desc: "What reverses, what does not, and where the line is, without blame for the styles that got you here.",
      },
      {
        to: "/trichology",
        label: "Trichology",
        desc: "What a trichologist is, how the 200x read works, and how care guidance fits a real plan.",
      },
    ],
    concernLinks: ["traction-alopecia", "ccca"],
    treatmentLinks: [],
  },
];


export const blogCategorySlugs = blogCategories.map((c) => c.slug);

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
