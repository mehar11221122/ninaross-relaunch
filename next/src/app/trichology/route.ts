import { HOST, aggregateRatingJsonLd, nap } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderTrichologyBody, trichologyHeroPreload } from "@/lib/nr-trichology";

export const dynamic = "force-dynamic";

const TITLE = "Trichology Hair Growth Treatment Atlanta | Nina Ross";
const DESCRIPTION =
  "A trichologist reads the strand, the follicle, and the systems behind them. What that means, what it changes, and how to start. Sandy Springs, GA.";
const URL = `${HOST}/trichology`;

const faq = [
  ["What is a trichologist?", "A trichologist is a specialist in hair and scalp science. The work is reading the strand, the follicle and scalp under magnification, and the patterns that may point to what is driving a change."],
  ["What is the difference between a trichologist and a dermatologist?", "A dermatologist is a physician covering skin, hair and nails, including prescriptions and procedures. A trichologist focuses specifically on hair and scalp. Many clients use both kinds of care."],
  ["Who actually performs my visit?", "A certified trichologist performs your evaluation and any hands-on treatment. Dr. Nina Ross, ND, sets the protocols as Clinical Director."],
  ["What does the first visit include?", "The $99 Hair & Body Discovery includes 30 minutes one-on-one, a 200x scalp read, and your written report the next day."],
  ["Where is the clinic?", `${nap.full}. ${nap.serviceArea}.`],
  ["Do I need to take my braids, locs or wig out?", "No. Come as you are. The trichologist parts and reads between what is installed. If your style fully covers your scalp, mention it when you book."],
];

function schemaJson(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${URL}#page`,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@type": "MedicalSpecialty", name: "Trichology" },
        lastReviewed: "2026-10-04",
        reviewedBy: { "@type": "Person", name: "Dr. Nina Ross, ND", url: `${HOST}/about#dr-nina-ross` },
        mainEntity: { "@id": `${URL}#faq` },
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${HOST}/#organization`,
        name: nap.name,
        url: HOST,
        telephone: nap.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: nap.street,
          addressLocality: nap.city,
          addressRegion: nap.region,
          postalCode: nap.postalCode,
          addressCountry: "US",
        },
        openingHours: "Mo-Fr 10:00-15:30",
        medicalSpecialty: "Trichology",
        areaServed: "Metro Atlanta",
        sameAs: ["https://instagram.com/ninarossatl"],
        aggregateRating: aggregateRatingJsonLd().aggregateRating,
      },
      {
        "@type": "Service",
        "@id": `${URL}#service`,
        name: "Trichology hair and scalp evaluation",
        provider: { "@id": `${HOST}/#organization` },
        areaServed: "Metro Atlanta",
        offers: {
          "@type": "Offer",
          name: "The $99 Hair & Body Discovery",
          price: "99",
          priceCurrency: "USD",
          url: "https://ninaross.as.me/hairlossevaluations",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${HOST}/` },
          { "@type": "ListItem", position: 2, name: "Trichology", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  });
}

export async function GET() {
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/trichology",
    bodyHtml: renderTrichologyBody(),
    schemaJson: schemaJson(),
    preloadImages: [trichologyHeroPreload],
    stylesheets: [
      "/blog-kit/nr-blog.css",
      "/blog-kit/about.css",
      "/blog-kit/hub.css",
      "/blog-kit/detail.css",
      "/blog-kit/trichology.css",
    ],
    bodyClass: "is-hub is-detail is-article is-trich nr-kit-page",
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
