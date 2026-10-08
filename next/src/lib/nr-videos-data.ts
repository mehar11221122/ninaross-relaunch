/** Library entries for /videos — YouTube IDs only (verified playable). */

export type VideoCat = "shorts" | "ccca" | "loss" | "health" | "tx";

export type VideoEntry = {
  id: string;
  title: string;
  /** Primary topic label shown on the card */
  label: string;
  /** Filter tokens — shorts also carry a topic so topic chips include them */
  cats: VideoCat[];
  format: "s" | "v";
  article: string;
  color: string;
};

const C = {
  ccca: "#764D4B",
  health: "#666B57",
  loss: "#5B463B",
  tx: "#CFB078",
} as const;

/** Full-length library videos */
export const LIBRARY_VIDEOS: VideoEntry[] = [
  {
    id: "N1w9iIUwjtY",
    title: "What is CCCA? A common cause of hair loss in Black women",
    label: "CCCA",
    cats: ["ccca"],
    format: "v",
    article: "/concerns/ccca",
    color: C.ccca,
  },
  {
    id: "B5xE9Ki7SIM",
    title: "CCCA vs traction alopecia: what's the difference?",
    label: "CCCA",
    cats: ["ccca"],
    format: "v",
    article: "/concerns/traction-alopecia",
    color: C.ccca,
  },
  {
    id: "xMUxgrz-yqw",
    title: "Let's talk about female pattern baldness",
    label: "Hair loss",
    cats: ["loss"],
    format: "v",
    article: "/concerns/female-hair-loss",
    color: C.loss,
  },
  {
    id: "dZ1WDI9uehw",
    title: "Trichology vs. dermatology: what are the differences?",
    label: "Hair loss",
    cats: ["loss"],
    format: "v",
    article: "/trichology",
    color: C.loss,
  },
  {
    id: "kIAJE0Ni71U",
    title: "Dealing with mental health challenges due to hair loss",
    label: "Hair loss",
    cats: ["loss"],
    format: "v",
    article: "/about",
    color: C.loss,
  },
  {
    id: "ddmzjkBbGwI",
    title: "Can a hormonal imbalance cause hair loss?",
    label: "Whole-body health",
    cats: ["health"],
    format: "v",
    article: "/concerns/hormonal-hair-loss",
    color: C.health,
  },
  {
    id: "kkdWs6VW9F8",
    title: "Anemia gave me hair loss. Here's how I fixed it",
    label: "Whole-body health",
    cats: ["health"],
    format: "v",
    article: "/blog/iron-deficiency-and-hair-loss",
    color: C.health,
  },
  {
    id: "Z3UQK-Mzjxo",
    title: "Are your prescription medications causing hair loss?",
    label: "Whole-body health",
    cats: ["health"],
    format: "v",
    article: "/concerns/medication-hair-loss",
    color: C.health,
  },
  {
    id: "BmID9f6e_Pc",
    title: "The truth about birth control and hair loss",
    label: "Whole-body health",
    cats: ["health"],
    format: "v",
    article: "/concerns/hormonal-hair-loss",
    color: C.health,
  },
  {
    id: "9MsjCqJupnw",
    title: "PRP for hair loss: why we get better results",
    label: "Treatments",
    cats: ["tx"],
    format: "v",
    article: "/treatments/prp-therapy",
    color: C.tx,
  },
  {
    id: "Vw8wAN3tIlQ",
    title: "The truth about microneedling: science, costs and results",
    label: "Treatments",
    cats: ["tx"],
    format: "v",
    article: "/treatments/microneedling",
    color: C.tx,
  },
  {
    id: "lY1E5zDK8Eo",
    title: "Mesotherapy for hair loss: before and after",
    label: "Treatments",
    cats: ["tx"],
    article: "/treatments/fusion-mesotherapy",
    format: "v",
    color: C.tx,
  },
];

/** Shorts — dual-tagged so topic chips still surface them */
export const LIBRARY_SHORTS: VideoEntry[] = [
  {
    id: "oXpi-uBDz6k",
    title: "Tension pulls your hair out slowly",
    label: "Hair loss",
    cats: ["loss", "shorts"],
    format: "s",
    article: "/concerns/traction-alopecia",
    color: C.loss,
  },
  {
    id: "jzZFIShFelk",
    title: "PRP for CCCA",
    label: "CCCA",
    cats: ["ccca", "shorts"],
    format: "s",
    article: "/treatments/prp-therapy",
    color: C.ccca,
  },
  {
    id: "cgkcgOHhJ5w",
    title: "Stress and hair loss",
    label: "Whole-body health",
    cats: ["health", "shorts"],
    format: "s",
    article: "/concerns/telogen-effluvium",
    color: C.health,
  },
  {
    id: "R_iGyGI-WK4",
    title: "Scalp health is important",
    label: "Whole-body health",
    cats: ["health", "shorts"],
    format: "s",
    article: "/concerns/seborrheic-dermatitis",
    color: C.health,
  },
  {
    id: "BRDTiJEsNPM",
    title: "Pregnancy hair growth and hair loss",
    label: "Hair loss",
    cats: ["loss", "shorts"],
    format: "s",
    article: "/concerns/postpartum-hair-loss",
    color: C.loss,
  },
  {
    id: "tafaVsmMT3M",
    title: "How microneedling helps hair growth",
    label: "Treatments",
    cats: ["tx", "shorts"],
    format: "s",
    article: "/treatments/microneedling",
    color: C.tx,
  },
  {
    id: "9Tr6VZMzGgg",
    title: "High cholesterol and CCCA",
    label: "CCCA",
    cats: ["ccca", "shorts"],
    format: "s",
    article: "/concerns/ccca",
    color: C.ccca,
  },
  {
    id: "kubRdsNfH1w",
    title: "New insights on metformin and CCCA",
    label: "CCCA",
    cats: ["ccca", "shorts"],
    format: "s",
    article: "/concerns/ccca",
    color: C.ccca,
  },
  {
    id: "0JqCLcZxmAE",
    title: "Shampoo regularly to avoid hair loss",
    label: "Whole-body health",
    cats: ["health", "shorts"],
    format: "s",
    article: "/concerns/seborrheic-dermatitis",
    color: C.health,
  },
];

/** Series lessons kept in the “The Series” block */
export const SERIES_VIDEOS: VideoEntry[] = [
  {
    id: "O0790SM7w3s",
    title: "Dr. Nina's Hair Loss Class: Lesson 01: Getting started",
    label: "Series",
    cats: ["loss"],
    format: "v",
    article: "/trichology",
    color: C.loss,
  },
  {
    id: "0B2vfRVxJ0U",
    title: "Dr. Nina's Hair Loss Class: Final lesson: Should you get a hair loss evaluation?",
    label: "Series",
    cats: ["loss"],
    format: "v",
    article: "/trichology",
    color: C.loss,
  },
];

export function youtubeWatchUrl(id: string, format: "s" | "v"): string {
  return format === "s"
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbed(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}
