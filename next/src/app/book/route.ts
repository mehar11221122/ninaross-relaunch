import { HOST, nap, offer } from "@/data/trust";
import { buildKitDocument } from "@/lib/kit-document";
import { renderBookBody } from "@/lib/nr-book";

export const dynamic = "force-dynamic";

const TITLE = "Book The $99 Hair & Body Discovery | Nina Ross";
const DESCRIPTION =
  "Book your $99 Hair & Body Discovery in Sandy Springs. A 200x scalp read, and your written report the next day. Serving all of Metro Atlanta.";

export async function GET() {
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/book",
    bodyHtml: renderBookBody(),
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "MedicalBusiness"],
      name: nap.name,
      url: `${HOST}/book`,
      telephone: nap.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: nap.street,
        addressLocality: nap.city,
        addressRegion: nap.region,
        postalCode: nap.postalCode,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", ...nap.geo },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "15:30",
      },
      areaServed: nap.areasServed,
      makesOffer: {
        "@type": "Offer",
        name: offer.name,
        price: "99",
        priceCurrency: "USD",
        url: `${HOST}/book`,
      },
    }),
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
