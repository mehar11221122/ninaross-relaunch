import { buildContentPageHtml } from "@/lib/static-html-page";

export const dynamic = "force-dynamic";

/**
 * `/black-trichologist-atlanta` — cut over: Next owns
 * `content/black-trichologist-atlanta/index.html`. Assets stay under
 * `/trichologist/*` in public.
 */
export async function GET() {
  const html = buildContentPageHtml(
    "black-trichologist-atlanta/index.html",
    "/black-trichologist-atlanta",
  );
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
