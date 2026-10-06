/**
 * Video library data.
 * Real, permissioned videos only. Leave `youtubeId` undefined to render a
 * clearly labeled "YOUTUBE EMBED NEEDED" placeholder. Never invent titles,
 * IDs, durations, upload dates, or view counts.
 */

export type VideoCategoryId = "results" | "demos" | "education";

export interface VideoCategory {
  id: VideoCategoryId;
  label: string;
  blurb: string;
}

export interface VideoLink {
  /** Route kind so the card can build a typed Link. */
  kind: "treatment" | "concern" | "page";
  /** Slug for treatment/concern routes. */
  slug?: string;
  /** Full path for a top-level page. */
  path?: string;
  label: string;
}

export interface VideoItem {
  id: string;
  category: VideoCategoryId;
  /** Working title used in the UI. Replace with the real YouTube title on upload. */
  title: string;
  description: string;
  /** Real YouTube video ID. Undefined means the embed is still needed. */
  youtubeId?: string;
  /** ISO date, only when known from the real upload. */
  uploadDate?: string;
  link?: VideoLink;
  needsAsset?: boolean;
}

export const videoCategories: VideoCategory[] = [
  {
    id: "results",
    label: "Client Results",
    blurb: "Clients who agreed to share what changed, in their own words.",
  },
  {
    id: "demos",
    label: "Treatment Demos",
    blurb: "What a session actually looks like from start to finish.",
  },
  {
    id: "education",
    label: "Educational",
    blurb: "Plain-language answers about scalp, hair, and whole-body causes.",
  },
];

export const resultsDisclaimer = "Results not typical. Individual results will vary.";

export const videos: VideoItem[] = [
  {
    id: "result-traction",
    category: "results",
    title: "Traction alopecia along the edges",
    description:
      "A client talks through what her edges looked like when she came in and what changed over her visits.",
    link: { kind: "concern", slug: "traction-alopecia", label: "Traction alopecia" },
    needsAsset: true,
  },
  {
    id: "result-ccca",
    category: "results",
    title: "Living with CCCA",
    description:
      "What it means to protect the follicles that are still active when part of the scalp has already scarred.",
    link: { kind: "concern", slug: "ccca", label: "CCCA" },
    needsAsset: true,
  },
  {
    id: "result-postpartum",
    category: "results",
    title: "Shedding after having a baby",
    description:
      "A client describes postpartum shedding, what the labs showed, and how the plan was built around it.",
    link: { kind: "concern", slug: "postpartum-hair-loss", label: "Postpartum hair loss" },
    needsAsset: true,
  },
  {
    id: "demo-prp",
    category: "demos",
    title: "A PRP session, start to finish",
    description:
      "The draw, the preparation, and the placement, so you know what the appointment involves before you book.",
    link: { kind: "treatment", slug: "prp-therapy", label: "PRP therapy" },
    needsAsset: true,
  },
  {
    id: "demo-microneedling",
    category: "demos",
    title: "Microneedling on a textured scalp",
    description: "How depth and direction are handled on textured hair and near scar margins.",
    link: { kind: "treatment", slug: "microneedling", label: "Microneedling" },
    needsAsset: true,
  },
  {
    id: "demo-200x",
    category: "demos",
    title: "Reading a scalp at 200x",
    description:
      "A walk through the magnified view, showing follicle openings, inflammation, and shaft thickness.",
    link: { kind: "page", path: "/trichology", label: "What a trichologist does" },
    needsAsset: true,
  },
  {
    id: "edu-causes",
    category: "education",
    title: "Telling one cause of hair loss from another",
    description:
      "Why shedding, thinning, and bare patches point to different causes and need different plans.",
    link: { kind: "page", path: "/concerns", label: "All conditions" },
    needsAsset: true,
  },
  {
    id: "edu-labs",
    category: "education",
    title: "The labs behind hair loss",
    description: "Thyroid, iron, and hormone patterns we look for when the scalp alone does not explain it.",
    link: { kind: "page", path: "/functional-medicine", label: "Functional medicine" },
    needsAsset: true,
  },
  {
    id: "edu-protective",
    category: "education",
    title: "Protective styles without the tension",
    description: "How to keep the styles you love while taking the pull off your hairline.",
    link: { kind: "concern", slug: "traction-alopecia", label: "Traction alopecia" },
    needsAsset: true,
  },
];
