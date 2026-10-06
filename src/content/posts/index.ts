import catalogData from "./_catalog.json";
import potassium from "./hair-loss-and-potassium-deficiency.json";
import iron from "./iron-deficiency-and-hair-loss.json";
import crisis from "./hair-loss-epidemic-among-black-women.json";
import hormones from "./hair-growth-hormones.json";
import alopecia from "./how-to-stop-alopecia-areata-from-spreading.json";
import dht from "./stop-hair-loss-with-dht-blockers.json";
import minoxidil from "./minoxidil-itchy-scalp.json";
import magnesium from "./magnesium-for-hair-growth.json";
import oily from "./oily-scalp-and-hair-loss.json";
import choosing from "./choosing-a-trichologist-near-me.json";
import trichologist from "./trichologist-for-black-hair.json";
import amino from "./amino-acids-for-hair-regrowth.json";
import lysine from "./l-lysine-benefits-for-skin.json";
import traction from "./traction-alopecia-reversibility.json";

export type CatalogItem = { slug: string; category: string; categorySlug: string; title: string; summary: string; readTime: number };
export type ArticleLink = { kind: string; href: string; title: string; text: string };
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; toc: string; text: string }
  | { type: "h3"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "timeline"; steps: Array<{ title: string; text: string }> }
  | { type: "figure"; slot?: string; src?: string; width?: number; height?: number; alt: string; caption: string }
  | { type: "checklist"; items: string[] }
  | { type: "foodgrid"; groups: Array<{ title: string; items: string[] }> }
  | { type: "callout"; tone: "attention" | "calm"; title?: string; text: string; resultsDisclaimer?: boolean }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "video"; title: string; length?: string; duration?: string; slot?: string; youtubeId?: string; file?: string; poster?: string; related?: { href: string; title: string } }
  | { type: "booking"; lead: string; text: string }
  | { type: "links"; title: string; items: ArticleLink[] };

export type ArticlePost = {
  slug: string; title: string; seoTitle: string; shortTitle: string; description: string;
  category: string; categorySlug: string; subtitle: string; published: string | null;
  lastReviewed: string | null; readTime: number; author: string; reviewer: string;
  hero: { src: string; width: number; height: number; alt: string; caption: string; og: string };
  note: { text: string; video: { youtubeId: string; file: string; label: string } };
  shortAnswer: { text: string; takeaways: string[] }; body: ArticleBlock[];
  faq: Array<{ q: string; a: string }>; references: Array<{ claim?: string; title?: string; href?: string }>;
  upNext: string | null; related: string[];
};

export const articleCatalog = catalogData as CatalogItem[];
const entries = [potassium, iron, crisis, hormones, alopecia, dht, minoxidil, magnesium, oily, choosing, trichologist, amino, lysine, traction] as ArticlePost[];
export const articlePosts = Object.fromEntries(entries.map((post) => [post.slug, post])) as Record<string, ArticlePost>;
export const articleSlugs = entries.map((post) => post.slug);
export function getArticle(slug: string) { return articlePosts[slug]; }
export function getCatalogItem(slug: string) { return articleCatalog.find((item) => item.slug === slug); }
