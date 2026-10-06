import { buildKitDocument } from "@/lib/kit-document";
import { renderAboutParts } from "@/lib/nr-about";

export const dynamic = "force-dynamic";

const TITLE = "About Nina Ross Atlanta | Trichology + Functional Medicine";
const DESCRIPTION =
  "Founded on one finding: most hair loss has internal root causes. Meet Dr. Nina Ross, ND, and the certified trichology team. Sandy Springs, GA.";

export async function GET() {
  const parts = renderAboutParts();
  const html = buildKitDocument({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/about",
    bodyHtml: parts.body,
    schemaJson: parts.schema,
    ogImage: parts.publicPortraitUrl,
    ogType: "profile",
    preloadImages: parts.heroPreload ? [parts.heroPreload] : undefined,
    stylesheets: ["/blog-kit/nr-blog.css", "/blog-kit/about.css"],
    bodyClass: "is-about nr-kit-page",
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
