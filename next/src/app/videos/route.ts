import { buildKitDocument } from "@/lib/kit-document";
import { renderVideosParts } from "@/lib/nr-videos";

export const dynamic = "force-dynamic";

const TITLE = "Hair Loss Videos from Dr. Nina Ross | Nina Ross";
const DESCRIPTION =
  "Watch Dr. Nina Ross, ND explain CCCA, traction alopecia, hormonal hair loss, PRP and scalp health. Full videos and quick shorts. Serving all of Metro Atlanta.";

export async function GET() {
  const { body, schema } = renderVideosParts();
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/videos",
    bodyHtml: body,
    schemaJson: schema,
    ogImage: "https://i.ytimg.com/vi/O0790SM7w3s/maxresdefault.jpg",
    stylesheets: [
      "/blog-kit/nr-blog.css",
      "/blog-kit/about.css",
      "/blog-kit/hub.css",
      "/blog-kit/detail.css",
      "/blog-kit/videos.css",
    ],
    bodyClass: "is-hub is-detail is-article is-videos nr-kit-page",
    scripts: ["/blog-kit/nr-blog.js?v=6", "/blog-kit/videos.js?v=1"],
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
