/**
 * The ONE global header and footer for every page on the site.
 * Rendered as an HTML string so the same markup serves React pages,
 * imported design kits and the static money pages. Values come from trust.ts.
 */
import { ctas, nap } from "@/data/trust";
import { absolutizeImageUrls } from "@/lib/cdn";

export const BOOKING_URL = "https://ninaross.as.me/hairlossevaluations";
export const SITE_CHROME_CSS = "/shared/site-chrome.css?v=1";
export const SITE_CHROME_JS = "/shared/site-chrome.js?v=1";
export const SITE_FAVICON = "/favicon.svg?v=2";

export const NAV_LINKS = [
  ["Trichology", "/trichology"],
  ["Treatments", "/treatments"],
  ["Concerns", "/concerns"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;

export const SOCIAL_LINKS = [
  ["Facebook", "https://www.facebook.com/NinaRossATL"],
  ["Instagram", "https://www.instagram.com/ninarossatl"],
  ["YouTube", "https://www.youtube.com/@ninarossatl"],
] as const;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const logo = `<span class="gc-logo"><span class="gc-logo__main">NINA&nbsp;ROSS</span><span class="gc-logo__sub"><i></i><span>HAIR&nbsp;THERAPY</span><i></i></span></span>`;

const navLinks = NAV_LINKS.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

export function globalHeaderHtml() {
  return `<header class="gc-hd" data-gc-hd><div class="gc-hd__in"><a class="gc-hd__logo" href="/" aria-label="Nina Ross Hair Therapy home">${logo}</a><nav class="gc-hd__nav" aria-label="Primary">${navLinks}</nav><div class="gc-hd__right"><a class="gc-btn gc-hd__cta" href="${BOOKING_URL}" target="_blank" rel="noopener" data-book><span>${esc(ctas.primary)}</span><span aria-hidden="true">→</span></a><button class="gc-hd__menu" type="button" aria-label="Open menu" aria-expanded="false" data-gc-menu><span></span></button></div></div><nav class="gc-mnav" aria-label="Mobile" data-gc-mnav>${navLinks}</nav></header>`;
}

const conditionLinks = [
  ["CCCA", "/concerns/ccca"],
  ["Traction Alopecia", "/concerns/traction-alopecia"],
  ["Alopecia Areata", "/concerns/alopecia-areata"],
  ["Female Hair Loss", "/concerns/female-hair-loss"],
  ["Male Pattern Baldness", "/concerns/male-pattern-baldness"],
  ["Postpartum Hair Loss", "/concerns/postpartum-hair-loss"],
  ["All Conditions", "/concerns"],
] as const;

const companyLinks = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["FAQ", "/faq"],
  ["Videos", "/videos"],
  ["Editorial Policy", "/editorial-policy"],
  ["Medical Review Policy", "/medical-review-policy"],
  ["Privacy Policy", "/privacy-policy"],
  ["Policies", "/policies"],
] as const;

const col = (title: string, links: readonly (readonly [string, string])[]) =>
  `<div class="gc-ft__col"><h3>${title}</h3>${links.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</div>`;

export function globalFooterHtml() {
  const year = new Date().getFullYear();
  return `<footer class="gc-ft"><div class="gc-ft__in"><div class="gc-ft__brand"><a href="/" aria-label="Nina Ross Hair Therapy home">${logo}</a><p>${esc(nap.serviceArea)}.</p></div><div class="gc-ft__grid">${col("Quick Links", NAV_LINKS)}${col("Conditions We Treat", conditionLinks)}${col("Company", companyLinks)}<div class="gc-ft__col"><h3>Connect</h3><address>${esc(nap.name)}<br>${esc(nap.street)}<br>${esc(nap.city)}, ${nap.region} ${nap.postalCode}<br><a href="${nap.phoneHref}">${nap.phone}</a><br>${esc(nap.hours)}</address><div class="gc-ft__social">${SOCIAL_LINKS.map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener">${l}</a>`).join("")}</div></div></div><div class="gc-ft__bottom"><span>© ${year} ${esc(nap.name)}</span><span>${esc(nap.serviceArea)}</span></div></div></footer>`;
}

const HEADER_PATTERNS = [
  /<header class="(?:hd|nr-header)"[\s\S]*?<\/header>/,
  /<header style="position:sticky[\s\S]*?<\/header>/,
];
const FOOTER_PATTERNS = [/<footer class="(?:ft|nr-footer)"[\s\S]*?<\/footer>/, /<footer style="[^"]*"[\s\S]*?<\/footer>/];

/** Swap any legacy page header/footer in an HTML string for the global ones.
 *  If none exist (text pages / plain bodies), inject global chrome. */
export function applySiteChrome(html: string) {
  let out = html;
  // Already has global chrome (e.g. prior apply) — don't inject a second copy.
  const hasGlobalHeader = /<header class="gc-hd"/.test(out);
  const hasGlobalFooter = /<footer class="gc-ft"/.test(out);
  let swappedHeader = hasGlobalHeader;
  if (!hasGlobalHeader) {
    for (const re of HEADER_PATTERNS) {
      if (re.test(out)) {
        out = out.replace(re, () => globalHeaderHtml());
        swappedHeader = true;
        break;
      }
    }
  }
  let swappedFooter = hasGlobalFooter;
  if (!hasGlobalFooter) {
    for (const re of FOOTER_PATTERNS) {
      if (re.test(out)) {
        out = out.replace(re, () => globalFooterHtml());
        swappedFooter = true;
        break;
      }
    }
  }
  if (!swappedHeader) out = `${globalHeaderHtml()}${out}`;
  if (!swappedFooter) out = `${out}${globalFooterHtml()}`;
  return absolutizeImageUrls(out);
}

/** For full static documents served raw: swap chrome and load its CSS/JS. */
export function applySiteChromeToDocument(html: string, path?: string) {
  if (path !== undefined && !/rel=["']canonical["']/.test(html)) {
    const href = `https://www.ninaross.co${path === "/" ? "/" : path}`;
    html = html.replace("</head>", `<link rel="canonical" href="${href}">\n</head>`);
  }
  return applySiteChrome(html)
    .replace("</head>", `<link rel="icon" href="${SITE_FAVICON}" type="image/svg+xml">\n<link rel="apple-touch-icon" href="${SITE_FAVICON}">\n<link rel="stylesheet" href="${SITE_CHROME_CSS}"></head>`)
    .replace(/<\/body>(?![\s\S]*<\/body>)/, `<script src="${SITE_CHROME_JS}" defer></script></body>`);
}
