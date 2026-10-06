import { buildContentPageHtml } from "@/lib/static-html-page";

export const dynamic = "force-dynamic";

export async function GET() {
  const html = buildContentPageHtml("landing-2/index.html", "/landing-2").replace(
    "</head>",
    `<meta name="robots" content="noindex, follow">\n</head>`,
  );
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
