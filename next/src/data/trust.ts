/**
 * Single source of truth for every trust signal on the site.
 * Do not hardcode ratings, counts, credentials, or NAP anywhere else.
 * Values marked `needsData: true` are not confirmed and must not be invented.
 */

export const trust = {
  googleRating: 4.8,
  googleReviewCount: 79,
  clientsSeen: "2,500+", // confirmed real by the clinic, Oct 2026
  yearsInPractice: 10,
  credentials:
    "Dr. Nina Ross, ND, PhD. Naturopathic Doctor, PhD in Functional Medicine, Double Board Certified Trichologist.",
  credentialByline:
    "Delivered by a certified trichologist. Method by Dr. Nina Ross, ND, PhD.",
  offerName: "The $99 Hair & Body Discovery",
  ctaLabel: "Book My $99 Hair & Body Discovery",
  offerPrice: 99,
  durationMinutes: 30,
  deliverables:
    "200x scalp read + next-day written report",
  offerSummary:
    "30 minutes with a certified trichologist: a 200x scalp read, and your written report the next day.",
  hsaFsa: true,
  financing: "0% financing for qualified applicants",
  bookingUrl: "https://ninaross.as.me/hairlossevaluations",

  guarantee:
    "You'll leave seeing what's happening, with your report the next day. If you don't, the $99 is on us.",
  payment: "HSA/FSA eligible · 0% financing for qualified applicants",
  costTransparency:
    "Most hair clinics charge $500 to $1,000 per treatment. Your exact plan depends on what the Discovery finds, and we tell you the numbers before anything starts.",
  culturalWelcome: "Protective styles welcome. Come as you are. No judgment.",
  nap: {
    name: "Nina Ross Hair Therapy",
    address: "8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350",
    phone: "(678) 561-4522",
    phoneHref: "tel:+16785614522",
    hours: "Mon–Sat, 10am–3:30pm",
  },
  logistics: [
    "Free parking at the building, just off GA-400 near the Perimeter",
    "Same-week appointments",
    "Your written report the next day",
    "Serving all of Metro Atlanta",
  ],
  proofDisclaimer: "Shared with written consent. Individual results vary.",
  proofHeadline: "Real clients. Real hair. No wigs, no fibers, no extensions.",
} as const;

export type ProofCase = {
  condition: string;
  timeframe: string;
  note?: string;
  /** Real, permissioned photos only. Incomplete cases are not rendered. */
  before?: string;
  after?: string;
  needsData?: boolean;
};

/** Real, permissioned before/after cases published on the $99 Discovery page. */
export const proofCases: ProofCase[] = [
  {
    condition: "Traction alopecia",
    timeframe: "26 weeks",
    before: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291373/ninaross/landing/img/traction-alopecia-twists-crown-before-nina-ross-atlanta.webp",
    after: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291373/ninaross/landing/img/traction-alopecia-twists-crown-after-nina-ross-atlanta.webp",
  },
  {
    condition: "CCCA",
    timeframe: "32 weeks",
    before: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291366/ninaross/landing/img/ccca-blonde-curls-crown-before-nina-ross-atlanta.webp",
    after: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291366/ninaross/landing/img/ccca-blonde-curls-crown-after-nina-ross-atlanta.webp",
  },
  {
    condition: "Hormonal thinning",
    timeframe: "24 weeks",
    before: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291369/ninaross/landing/img/hormonal-hair-loss-crown-before-nina-ross-atlanta.webp",
    after: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291369/ninaross/landing/img/hormonal-hair-loss-crown-after-nina-ross-atlanta.webp",
  },
  {
    condition: "Telogen effluvium",
    timeframe: "20 weeks",
    before: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291372/ninaross/landing/img/telogen-effluvium-patches-before-nina-ross-atlanta.webp",
    after: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291372/ninaross/landing/img/telogen-effluvium-short-hair-after-nina-ross-atlanta.webp",
  },
];

export type VerifiedTestimonial = {
  quote: string;
  name: string;
  place?: string;
  /** true when the quote text still needs to be sourced from a real, permissioned review */
  needsData?: boolean;
};

/**
 * Verified, permissioned client quotes only.
 * Never add a quote here that was not actually given by a real client.
 */
export const verifiedTestimonials: VerifiedTestimonial[] = [
  {
    quote:
      "I had tried everything for years. Nothing worked. Within months at Nina Ross, I saw new baby hairs. At 40 weeks, I had the confidence I thought I lost forever.",
    name: "Coretta",
    place: "Atlanta",
  },
  {
    quote:
      "Doctors told me nothing could be done. Nina Ross slowed my CCCA and actually gave me new growth. I only wish I had started sooner.",
    name: "Tasha",
    place: "Decatur",
  },
  {
    quote:
      "I was skeptical after wasting money elsewhere. The scalp imaging alone told me more than two years of guessing.",
    name: "Danielle R.",
    place: "Sandy Springs",
  },
];

/** AggregateRating JSON-LD built only from the confirmed Google data. */
export function aggregateRatingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: trust.nap.name,
    telephone: trust.nap.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8735 Dunwoody Place, Suite 290",
      addressLocality: "Sandy Springs",
      addressRegion: "GA",
      postalCode: "30350",
      addressCountry: "US",
    },
    openingHours: "Mo-Sa 10:00-15:30",
    areaServed: "Metro Atlanta",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trust.googleRating,
      reviewCount: trust.googleReviewCount,
      bestRating: 5,
    },
  };
}

/* ------------------------------------------------------------------
 * Fixed copy for the Conditions system. Render verbatim.
 * Never hard-code offer, CTA, NAP, credential or claim text elsewhere.
 * ---------------------------------------------------------------- */

export const offer = {
  name: "The $99 Hair & Body Discovery",
  price: "$99",
  duration: "30 minutes",
  includes: [
    "One-on-one scalp health session with a certified trichologist",
    "200x magnification read of your scalp, on screen, while you watch",
    "Full-body biofeedback scan",
    "Your Hair & Body Discovery Report, delivered the next day",
  ],
  pills: [
    "NO PREP",
    "ONE VISIT",
    "SAME WEEK",
    "NO JUDGMENT",
    "SERVING ALL OF METRO ATLANTA",
  ],
  metaLine: "$99 · 30 minutes · Serving Greater Atlanta",
  riskReversal:
    "You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us.",
  riskReversalShort: "You'll see it, or the $99 is on us.",
} as const;

export const ctas = {
  primary: "Book My $99 Hair & Body Discovery",
  informational: "Find Out What's Actually Happening",
  sticky: "Book My $99 Discovery",
  sample: "Preview A Sample Report",
  href: "/book",
} as const;

export const nap = {
  name: "Nina Ross Hair Therapy",
  street: "8735 Dunwoody Place, Suite 290",
  city: "Sandy Springs",
  region: "GA",
  postalCode: "30350",
  full: "8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350",
  phone: "(678) 561-4522",
  phoneHref: "tel:+16785614522",
  hours: "Monday to Saturday, 10:00 AM to 3:30 PM",
  serviceArea: "Serving all of Metro Atlanta",
  building: "Inside the Nina Ross Functional Medicine building.",
  geo: { latitude: 33.9321, longitude: -84.3348 },
  areasServed: [
    "Sandy Springs",
    "Atlanta",
    "Dunwoody",
    "Brookhaven",
    "Roswell",
    "Marietta",
    "Decatur",
    "Alpharetta",
  ],
} as const;

export const credentials = {
  long: "Dr. Nina Ross, ND, PhD. Naturopathic Doctor, PhD in Functional Medicine, Double Board Certified Trichologist.",
  short: "Dr. Nina Ross, ND",
  reviewerByline: "Clinically reviewed by Dr. Nina Ross, ND",
  delivery:
    "Sessions are performed by certified trichologists. Dr. Nina Ross, ND oversees the protocols.",
} as const;

export const claims = {
  years: "10 years of specialized care",
  clients: "2,500+ clients seen",
  cccaCausal:
    "Certain grooming practices have been associated with CCCA in some studies, although CCCA is multifactorial and these practices have not been established as the sole cause.",
  resultsDisclaimer: "Results not typical. Individual results will vary.",
} as const;

export const HOST = "https://www.ninaross.co";

/** Google Business Profile share link supplied by the clinic. */
export const GOOGLE_BUSINESS_URL = "https://share.google/382XxnFKsSQA6jqo3";
