import type { Metadata } from "next";
import Script from "next/script";
import { buildHomeHtml, splitHtmlDocument } from "@/lib/static-html-page";
import { SITE_CHROME_CSS, SITE_CHROME_JS, SITE_FAVICON } from "@/lib/site-chrome";

function homeParts() {
  return splitHtmlDocument(buildHomeHtml());
}

export function generateMetadata(): Metadata {
  const parts = homeParts();
  return {
    title: parts.title,
    description: parts.description,
    themeColor: parts.themeColor,
    alternates: {
      canonical: "https://www.ninaross.co/",
    },
    icons: {
      icon: [{ url: SITE_FAVICON, type: "image/svg+xml" }],
      apple: [{ url: SITE_FAVICON }],
    },
    openGraph: {
      type: "website",
      url: "https://www.ninaross.co/",
      title: parts.ogTitle ?? parts.title,
      description: parts.ogDescription ?? parts.description,
      images: parts.ogImage ? [{ url: parts.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: parts.ogTitle ?? parts.title,
      description: parts.ogDescription ?? parts.description,
    },
  };
}

/** Minimal shell — page body (incl. global chrome from HTML) is the source of truth. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const parts = homeParts();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&display=swap"
        />
        <link rel="stylesheet" href={SITE_CHROME_CSS} />
        {parts.stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {parts.preloads.map((p) => (
          <link
            key={p.href}
            rel="preload"
            as={p.as}
            href={p.href}
            {...(p.imageSrcSet ? { imageSrcSet: p.imageSrcSet } : {})}
            {...(p.imageSizes ? { imageSizes: p.imageSizes } : {})}
            {...(p.type ? { type: p.type } : {})}
          />
        ))}
        {parts.jsonLd.map((json, i) => (
          <script
            key={`ld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />
        ))}
      </head>
      <body>
        {children}
        <Script src={SITE_CHROME_JS} strategy="afterInteractive" />
        {parts.bodyScripts.map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
