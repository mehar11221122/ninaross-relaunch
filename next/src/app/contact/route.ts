import { HOST, nap } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { contactFaq, renderContactBody } from "@/lib/nr-contact";

export const dynamic = "force-dynamic";

const TITLE = "Contact Nina Ross Hair Therapy | Sandy Springs, GA";
const DESCRIPTION = `${nap.full}. Call ${nap.phone}. ${nap.hours}. ${nap.serviceArea}.`;
const URL = `${HOST}/contact`;

function schemaJson(): string {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: nap.name,
      url: URL,
      telephone: nap.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: nap.street,
        addressLocality: nap.city,
        addressRegion: nap.region,
        postalCode: nap.postalCode,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: nap.geo.latitude,
        longitude: nap.geo.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "15:30",
        },
      ],
      areaServed: [...nap.areasServed],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: HOST },
        { "@type": "ListItem", position: 2, name: "Contact", item: URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: contactFaq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ]);
}

export async function GET() {
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/contact",
    bodyHtml: renderContactBody(),
    schemaJson: schemaJson(),
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
