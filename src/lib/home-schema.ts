import { HOST, nap, credentials, GOOGLE_BUSINESS_URL } from "@/data/trust";
import { SOCIAL_LINKS } from "@/lib/site-chrome";

/** Homepage JSON-LD built only from trust.ts values. */
export function homeJsonLd() {
  const sameAs = [...SOCIAL_LINKS.map(([, h]) => h), GOOGLE_BUSINESS_URL];
  const orgId = `${HOST}/#organization`;
  const personId = `${HOST}/#dr-nina-ross`;
  const graph = [
    { "@type": "Organization", "@id": orgId, name: nap.name, url: HOST, sameAs },
    {
      "@type": "MedicalBusiness",
      "@id": `${HOST}/#clinic`,
      name: nap.name,
      url: HOST,
      telephone: nap.phone,
      priceRange: "$$",
      medicalSpecialty: "Trichology",
      address: {
        "@type": "PostalAddress",
        streetAddress: nap.street,
        addressLocality: nap.city,
        addressRegion: nap.region,
        postalCode: nap.postalCode,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", ...nap.geo },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "15:30",
        },
      ],
      areaServed: nap.areasServed.map((name) => ({ "@type": "City", name })),
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nap.full)}`,
      parentOrganization: { "@id": orgId },
      employee: { "@id": personId },
      sameAs,
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Dr. Nina Ross",
      honorificSuffix: "ND",
      jobTitle: "Naturopathic Doctor, Double Board Certified Trichologist",
      description: credentials.long,
      worksFor: { "@id": orgId },
    },
  ];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

export function withHomeSchema(html: string) {
  return html.replace("</head>", `${homeJsonLd()}\n</head>`);
}
