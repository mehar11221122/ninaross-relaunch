import {
  SITE_CHROME_CSS,
  SITE_CHROME_JS,
  applySiteChrome,
} from "@/lib/site-chrome";

export type KitDocumentOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  bodyHtml: string;
  stylesheets: string[];
  schemaJson?: string;
  ogImage?: string;
  ogType?: string;
  preloadImages?: string[];
  bodyClass?: string;
  bodyAttrs?: Record<string, string>;
  scripts?: string[];
  robots?: string;
  twitterCard?: string;
};

/** Build a full kit HTML document with global chrome (same assets as TanStack kit pages). */
export function buildKitDocument(opts: KitDocumentOptions): string {
  const origin = "https://www.ninaross.co";
  const canonical = `${origin}${opts.canonicalPath}`;
  const body = applySiteChrome(opts.bodyHtml);
  const allSheets = [SITE_CHROME_CSS, ...opts.stylesheets];
  const sheets = allSheets
    .map((href) => `<link rel="stylesheet" href="${href}">`)
    .join("\n");
  const preloads = (opts.preloadImages ?? [])
    .map((href) => `<link rel="preload" as="image" href="${href}" fetchpriority="high">`)
    .join("\n");
  const schema = opts.schemaJson
    ? `<script type="application/ld+json">${opts.schemaJson}</script>`
    : "";
  const twitterCard = opts.twitterCard ?? "summary_large_image";
  const ogImage = opts.ogImage
    ? `<meta property="og:image" content="${opts.ogImage}">
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:image" content="${opts.ogImage}">`
    : `<meta name="twitter:card" content="${twitterCard}">`;
  const robots = opts.robots
    ? `<meta name="robots" content="${escapeAttr(opts.robots)}">`
    : "";
  const scripts = [
    SITE_CHROME_JS,
    ...(opts.scripts ?? ["/blog-kit/nr-blog.js?v=6"]),
  ]
    .map((src) => `<script src="${src}" defer></script>`)
    .join("\n");
  const bodyClass = opts.bodyClass ? ` class="${opts.bodyClass}"` : "";
  const bodyAttrs = Object.entries(opts.bodyAttrs ?? {})
    .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en" class="js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(opts.title)}</title>
<meta name="description" content="${escapeAttr(opts.description)}">
${robots}
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${escapeAttr(opts.title)}">
<meta property="og:description" content="${escapeAttr(opts.description)}">
<meta property="og:type" content="${opts.ogType ?? "website"}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:title" content="${escapeAttr(opts.title)}">
<meta name="twitter:description" content="${escapeAttr(opts.description)}">
${ogImage}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&display=swap">
${sheets}
${preloads}
${schema}
</head>
<body${bodyClass}${bodyAttrs}>
${body}
${scripts}
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
