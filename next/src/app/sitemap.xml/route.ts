import categories from "@/content/posts/_categories.json";
import { articlePosts } from "@/content/posts";
import { HOST } from "@/data/trust";
import { CONCERN_SLUGS, TREATMENT_SLUGS } from "@/lib/nr-detail";

export const dynamic = "force-dynamic";

const STATIC = [
  "/",
  "/black-trichologist-atlanta",
  "/ccca-treatment-atlanta",
  "/hair-loss-treatment-atlanta",
  "/traction-alopecia-treatment-atlanta",
  "/alopecia-areata-doctor-atlanta",
  "/prp-hair-treatment-atlanta",
  "/hair-doctor-atlanta",
  "/hair-restoration-sandy-springs",
  "/trichology",
  "/functional-medicine",
  "/about",
  "/contact",
  "/book",
  "/faq",
  "/videos",
  "/concerns",
  "/treatments",
  "/blog",
  "/editorial-policy",
  "/medical-review-policy",
];

function entry(p: string, lastmod?: string | null): string {
  const lm = lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : "";
  return `<url><loc>${HOST}${p}</loc>${lm}</url>`;
}

export async function GET() {
  const posts = Object.values(articlePosts);
  const categoryUrls = (categories as { slug: string; name: string }[])
    .filter((c) => posts.some((p) => p.category === c.name))
    .map((c) => entry(`/blog/${c.slug}`));

  const urls = [
    ...STATIC.map((p) => entry(p)),
    ...CONCERN_SLUGS.map((slug) => entry(`/concerns/${slug}`)),
    ...TREATMENT_SLUGS.map((slug) => entry(`/treatments/${slug}`)),
    ...categoryUrls,
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.lastReviewed ?? p.published)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
