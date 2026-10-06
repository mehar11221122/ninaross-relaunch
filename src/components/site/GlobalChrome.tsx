import { globalFooterHtml, globalHeaderHtml } from "@/lib/site-chrome";

/** The single global header, shared with every static and kit page. */
export function GlobalHeader() {
  return <div className="contents" dangerouslySetInnerHTML={{ __html: globalHeaderHtml() }} />;
}

/** The single global footer, shared with every static and kit page. */
export function GlobalFooter() {
  return <div className="contents" dangerouslySetInnerHTML={{ __html: globalFooterHtml() }} />;
}
