import { faqItems } from "@/data/faq";
import { HOST } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderFaqBody } from "@/lib/nr-faq";

export const dynamic = "force-dynamic";

const TITLE = "Frequently Asked Questions | Nina Ross";
const DESCRIPTION =
  "What the Discovery includes, what treatments cost, how long results take, and whether insurance applies. Straight answers, in plain language.";
const URL = `${HOST}/faq`;

export async function GET() {
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/faq",
    bodyHtml: renderFaqBody(),
    schemaJson: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: HOST },
          { "@type": "ListItem", position: 2, name: "FAQ", item: URL },
        ],
      },
    ]),
    stylesheets: ["/text-kit/text-pages.css"],
    scripts: ["/text-kit/text-pages.js"],
    bodyClass: "text-page-doc",
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
