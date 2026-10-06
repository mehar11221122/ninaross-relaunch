import { buildKitDocument } from "@/lib/kit-document";
import { CONCERN_SLUGS, renderConcernParts } from "@/lib/nr-detail";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CONCERN_SLUGS.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const parts = renderConcernParts(slug, "concern");
  if (!parts) {
    return new Response("Not found", { status: 404 });
  }
  const html = buildKitDocument({
    title: parts.title,
    description: parts.description,
    canonicalPath: `/concerns/${parts.slug}`,
    bodyHtml: parts.body,
    schemaJson: parts.schema,
    ogType: "article",
    stylesheets: [
      "/blog-kit/nr-blog.css",
      "/blog-kit/about.css",
      "/blog-kit/hub.css",
      "/blog-kit/detail.css",
    ],
    bodyClass: "is-hub is-detail is-article nr-kit-page",
    scripts: ["/blog-kit/nr-blog.js?v=7"],
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
