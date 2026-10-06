import fs from "node:fs";
import path from "node:path";
import { applySiteChromeToDocument } from "@/lib/site-chrome";

export const dynamic = "force-dynamic";

const CANONICAL = "https://www.ninaross.co/traction-alopecia-treatment-atlanta";
const DESCRIPTION =
  "Early traction alopecia is often reversible. Trichoscopy at 200x tells us which stage you're in, honestly. Sandy Springs, GA. $99 Hair & Body Discovery.";
const SEO_TAGS = `<meta name="description" content="${DESCRIPTION}">
<link rel="canonical" href="${CANONICAL}">
<meta property="og:url" content="${CANONICAL}">
<meta property="og:description" content="${DESCRIPTION}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:description" content="${DESCRIPTION}">
`;

/**
 * `/traction-alopecia-treatment-atlanta` — cut over: Next owns
 * `content/traction-alopecia-treatment-atlanta/index.html` with the same
 * SEO injection as the former TanStack route.
 */
export async function GET() {
  const file = path.join(
    process.cwd(),
    "content",
    "traction-alopecia-treatment-atlanta",
    "index.html",
  );
  const rawHtml = fs.readFileSync(file, "utf8");
  const pageHtml = rawHtml
    .replace(
      /<meta\b[^>]*(?:name="description"|property="og:description"|property="og:url"|name="twitter:description")[^>]*>\s*/gi,
      "",
    )
    .replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/gi, "")
    .replace("</head>", `${SEO_TAGS}</head>`);

  const html = applySiteChromeToDocument(pageHtml, "/traction-alopecia-treatment-atlanta");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
