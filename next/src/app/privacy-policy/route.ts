import { HOST, nap } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderPrivacyPolicyBody } from "@/lib/nr-policies";

export const dynamic = "force-dynamic";

const TITLE = "Privacy Policy | Nina Ross";
const DESCRIPTION =
  "How Nina Ross Hair Therapy collects, uses, and protects information when you use our website or contact the clinic. Sandy Springs, GA.";
const URL = `${HOST}/privacy-policy`;

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
    canonicalPath: "/privacy-policy",
    bodyHtml: renderPrivacyPolicyBody(),
    robots: "noindex, follow",
    twitterCard: "summary",
    schemaJson: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: TITLE,
        url: URL,
        description: DESCRIPTION,
        isPartOf: { "@type": "WebSite", name: nap.name, url: HOST },
        about: { "@type": "Thing", name: "Privacy policy" },
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
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: URL },
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
