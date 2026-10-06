import { buildKitDocument } from "@/lib/kit-document";
import { renderHubParts } from "@/lib/nr-hub";

export const dynamic = "force-dynamic";

export async function GET() {
  const parts = renderHubParts("treatments");
  const html = buildKitDocument({
    title: parts.title,
    description: parts.description,
    canonicalPath: "/treatments",
    bodyHtml: parts.body,
    schemaJson: parts.schema,
    ogImage: parts.publicHeroUrl,
    preloadImages: [parts.heroUrl],
    stylesheets: ["/blog-kit/nr-blog.css", "/blog-kit/about.css", "/blog-kit/hub.css"],
    bodyClass: "is-hub is-article nr-kit-page",
    bodyAttrs: { "data-hub": parts.slug },
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
