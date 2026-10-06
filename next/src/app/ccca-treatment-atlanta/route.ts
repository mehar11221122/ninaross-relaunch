import { buildContentPageHtml } from "@/lib/static-html-page";

export const dynamic = "force-dynamic";

/**
 * `/ccca-treatment-atlanta` — cut over: Next owns
 * `content/ccca-treatment-atlanta/index.html`. Assets stay under `/ccca/*`
 * in public.
 */
export async function GET() {
  const html = buildContentPageHtml(
    "ccca-treatment-atlanta/index.html",
    "/ccca-treatment-atlanta",
  );
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
