import { buildHomeHtml, splitHtmlDocument } from "@/lib/static-html-page";

/**
 * Homepage `/` — exact HTML from public/landing/index.html
 * (site chrome + home schema applied), rendered in Next.js App Router.
 * Source HTML is kept for side-by-side comparison until approved.
 */
export default function HomePage() {
  const { bodyHtml } = splitHtmlDocument(buildHomeHtml());
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
