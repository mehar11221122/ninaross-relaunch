export type ConcernCategory =
  | "scarring"
  | "autoimmune"
  | "hormonal"
  | "inflammatory"
  | "traumatic"
  | "other";

export type ConcernVariant =
  | "standard"
  | "flagship"
  | "symptom-entry"
  | "frozen"
  | "ctr-capture"
  | "reversibility";

export interface ConcernSymptom {
  /** How clients describe it in their own words. */
  herWords: string;
  /** The clinical term for the same thing. */
  clinical: string;
}

export interface ConcernCause {
  title: string;
  body: string;
}

export interface ConcernFaq {
  q: string;
  a: string;
}

export interface ConcernCitation {
  label: string;
  pmid: string;
}

export interface ConcernBlock {
  heading: string;
  body: string[];
}

export interface TriageItem {
  name: string;
  body: string;
  href: string;
}

export interface Concern {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  /** Quick Answer, 75 to 200 words, self-contained. */
  overview: string;
  symptoms: ConcernSymptom[];
  causes: ConcernCause[];
  treatmentApproach: string;
  relatedTreatments: string[];
  relatedConcerns: string[];
  faq: ConcernFaq[];
  keywords: string[];
  category: ConcernCategory;
  variant: ConcernVariant;
  /** Practice-specific information gain, mandatory on every page. */
  infoGain: ConcernBlock;
  culturalCompetencyAngle: string;
  toneNotes: string;
  citations?: ConcernCitation[];
  /** Extra long-form sections rendered after the causes section. */
  extraSections?: ConcernBlock[];
  /** Symptom triage grid, scalp-bumps only. */
  triage?: TriageItem[];
  /** Optional first-viewport link, used by CTR-capture pages. */
  firstViewportLink?: { label: string; href: string };
  /** Money and city pages this concern should link down to. */
  relatedPages?: { label: string; href: string }[];
  /** true when Dr. Nina Ross has reviewed this body copy. */
  clinicallyReviewed: boolean;
  /** Marks draft bodies awaiting supplied freeze content. */
  draft?: boolean;
}

export interface TreatmentRef {
  slug: string;
  name: string;
  href: string;
  blurb: string;
}
