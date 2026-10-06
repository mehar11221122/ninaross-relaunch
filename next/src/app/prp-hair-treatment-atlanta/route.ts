import { buildContentPageHtml } from "@/lib/static-html-page";

export const dynamic = "force-dynamic";

export async function GET() {
  const html = buildContentPageHtml(
    "prp-hair-treatment-atlanta/index.html",
    "/prp-hair-treatment-atlanta",
  );
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
