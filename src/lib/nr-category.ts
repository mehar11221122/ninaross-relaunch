// Wraps the approved category renderer for use in the shared TanStack route.
// @ts-expect-error plain JS module from the approved kit
import { renderCategory } from "./nr-category-render.js";
import categories from "@/content/posts/_categories.json";
import catalog from "@/content/posts/_catalog.json";
import { withBlogHeroes } from "@/lib/blog-hero";

const hairLossHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-examining-hairline-mirror-category-nina-ross-atlanta.webp";

const ASSETS: Record<string, string> = {
  "img/hero-hair-loss-and-potassium-deficiency.webp": hairLossHero,
};

export type CategoryEntry = (typeof categories)[number];

export const articleCategories = categories as CategoryEntry[];

export function getArticleCategory(slug: string) {
  return articleCategories.find((category) => category.slug === slug);
}

export function categoryPosts(slug: string) {
  return catalog.filter((post) => post.categorySlug === slug);
}

export function renderCategoryParts(category: CategoryEntry) {
  let html: string = renderCategory(category, categories, withBlogHeroes(catalog));
  for (const [from, to] of Object.entries(ASSETS)) html = html.split(from).join(to);
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("<script src=");
  const body = html.slice(bodyStart, bodyEnd);
  const heroPreload = html.match(/<link rel="preload" as="image" href="([^"]+)"/)?.[1];
  return { body, schema, heroPreload };
}