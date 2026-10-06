import { HOST, credentials, nap } from "@/data/trust";
import { blogPosts } from "@/data/blog-posts";
import { buildKitDocument } from "@/lib/kit-document";
import { renderBlogIndexBody } from "@/lib/nr-blog-index";

export const dynamic = "force-dynamic";

const TITLE = "Hair Loss & Scalp Health Blog | Nina Ross";
const DESCRIPTION =
  "Straight answers on shedding, scalp conditions, hormones, and nutrients, written by trichologists and clinically reviewed. Atlanta, GA.";

function schemaJson(): string {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Hair Loss & Scalp Health Insights",
      description: DESCRIPTION,
      url: `${HOST}/blog`,
      publisher: {
        "@type": "LocalBusiness",
        name: nap.name,
        telephone: nap.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: nap.street,
          addressLocality: nap.city,
          addressRegion: nap.region,
          postalCode: nap.postalCode,
          addressCountry: "US",
        },
      },
      hasPart: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        url: `${HOST}/blog/${p.slug}`,
        author: { "@type": "Person", name: credentials.short },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: HOST },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${HOST}/blog` },
      ],
    },
  ]);
}

export async function GET() {
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/blog",
    bodyHtml: renderBlogIndexBody(),
    schemaJson: schemaJson(),
    stylesheets: ["/blog-kit/blog-index.css", "/blog-kit/nr-blog.css"],
    bodyClass: "blog-index-page nr-kit-page",
    scripts: [],
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
