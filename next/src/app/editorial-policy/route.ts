import { HOST, nap } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderEditorialPolicyBody } from "@/lib/nr-policies";

export const dynamic = "force-dynamic";

const TITLE = "Editorial Policy | Nina Ross";
const DESCRIPTION =
  "Who writes our content, how we source it, and how we correct it. Accuracy over marketing. Sandy Springs, GA.";
const URL = `${HOST}/editorial-policy`;

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
    canonicalPath: "/editorial-policy",
    bodyHtml: renderEditorialPolicyBody(),
    twitterCard: "summary",
    schemaJson: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: TITLE,
        url: URL,
        description: DESCRIPTION,
        isPartOf: { "@type": "WebSite", name: nap.name, url: HOST },
        about: { "@type": "Thing", name: "Editorial policy and content standards" },
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
          { "@type": "ListItem", position: 2, name: "Editorial Policy", item: URL },
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
