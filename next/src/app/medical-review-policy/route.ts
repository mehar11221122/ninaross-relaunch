import { HOST, nap } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderMedicalReviewPolicyBody } from "@/lib/nr-policies";

export const dynamic = "force-dynamic";

const TITLE = "Medical Review Policy | Nina Ross";
const DESCRIPTION =
  "What \u201Cclinically reviewed\u201D means on this site, who reviews clinical claims, and the qualifications behind that review. Sandy Springs, GA.";
const URL = `${HOST}/medical-review-policy`;

export async function GET() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: nap.street,
    addressLocality: nap.city,
    addressRegion: nap.region,
    postalCode: nap.postalCode,
    addressCountry: "US",
  };
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/medical-review-policy",
    bodyHtml: renderMedicalReviewPolicyBody(),
    twitterCard: "summary",
    schemaJson: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: TITLE,
        url: URL,
        description: DESCRIPTION,
        isPartOf: { "@type": "WebSite", name: nap.name, url: HOST },
        about: {
          "@type": "Thing",
          name: "Medical review policy and clinical content standards",
        },
        publisher: {
          "@type": "Organization",
          name: nap.name,
          url: HOST,
          telephone: nap.phone,
          address,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: HOST },
          { "@type": "ListItem", position: 2, name: "Medical Review Policy", item: URL },
        ],
      },
    ]),
    stylesheets: ["/text-kit/text-pages.css"],
    scripts: [],
    bodyClass: "text-page-doc",
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
