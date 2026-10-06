import fs from "node:fs";
import path from "node:path";
import { applySiteChromeToDocument } from "@/lib/site-chrome";
import { withHomeSchema } from "@/lib/home-schema";

export type StaticHtmlParts = {
  title: string;
  description: string;
  themeColor: string | undefined;
  ogTitle: string | undefined;
  ogDescription: string | undefined;
  ogImage: string | undefined;
  stylesheets: string[];
  preloads: Array<{ href: string; as: string; imageSrcSet?: string; imageSizes?: string; type?: string }>;
  jsonLd: string[];
  bodyHtml: string;
  bodyScripts: string[];
};

/** Build any static money/kit HTML page the same way TanStack does. */
export function buildStaticPageHtml(publicHtmlRelative: string, canonicalPath?: string): string {
  const file = path.join(process.cwd(), "public", ...publicHtmlRelative.split("/"));
  const raw = fs.readFileSync(file, "utf8");
  return applySiteChromeToDocument(raw, canonicalPath);
}

/** Build a cut-over page from Next-owned `content/` (source HTML removed from public). */
export function buildContentPageHtml(contentHtmlRelative: string, canonicalPath?: string): string {
  const file = path.join(process.cwd(), "content", ...contentHtmlRelative.split("/"));
  const raw = fs.readFileSync(file, "utf8");
  return applySiteChromeToDocument(raw, canonicalPath);
}

/** Build the homepage HTML from Next-owned content (cut over from public/landing). */
export function buildHomeHtml(): string {
  return withHomeSchema(buildContentPageHtml("home/index.html", "/"));
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function attr(tag: string, name: string): string | undefined {
  const re = new RegExp(`\\b${name}=["']([^"']*)["']`, "i");
  return tag.match(re)?.[1];
}

/** Split a full HTML document for the Next App Router shell. */
export function splitHtmlDocument(html: string): StaticHtmlParts {
  const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "");
  const description = decodeEntities(
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ??
      html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)?.[1] ??
      "",
  );
  const themeColor = html.match(/<meta\s+name=["']theme-color["']\s+content=["']([^"']*)["']/i)?.[1];
  const ogTitleRaw = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)?.[1];
  const ogDescRaw = html.match(
    /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i,
  )?.[1];
  const ogTitle = ogTitleRaw ? decodeEntities(ogTitleRaw) : undefined;
  const ogDescription = ogDescRaw ? decodeEntities(ogDescRaw) : undefined;
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i)?.[1];

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!headMatch || !bodyMatch) {
    throw new Error("Static HTML missing <head> or <body>");
  }
  const head = headMatch[1];
  let body = bodyMatch[1];

  const stylesheets = [...head.matchAll(/<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi)]
    .map((m) => attr(m[0], "href"))
    .filter((h): h is string => Boolean(h))
    .filter((h) => !h.startsWith("/shared/site-chrome.css"));

  const preloads = [...head.matchAll(/<link\s+[^>]*rel=["']preload["'][^>]*>/gi)].map((m) => {
    const tag = m[0];
    return {
      href: attr(tag, "href") ?? "",
      as: attr(tag, "as") ?? "image",
      imageSrcSet: attr(tag, "imagesrcset"),
      imageSizes: attr(tag, "imagesizes"),
      type: attr(tag, "type"),
    };
  });

  const jsonLd = [...head.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1].trim(),
  );

  const bodyScripts: string[] = [];
  body = body.replace(/<script\s+([^>]*)><\/script>/gi, (full, attrs: string) => {
    const src = attr(`<script ${attrs}>`, "src");
    if (src?.includes("/shared/site-chrome.js")) return "";
    if (src) {
      bodyScripts.push(src);
      return "";
    }
    return full;
  });

  return {
    title,
    description,
    themeColor,
    ogTitle,
    ogDescription,
    ogImage,
    stylesheets,
    preloads,
    jsonLd,
    bodyHtml: body.trim(),
    bodyScripts,
  };
}
