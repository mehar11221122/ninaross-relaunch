import { articleCatalog, articlePosts, type ArticlePost } from "./index";

const blocked = ["—", "Nina Ross Hair Therapy", "same week", "/book", "miracle", "quick fix", "guaranteed", "instant", "one-size-fits-all", "cheap", "magic", "secret", "breakthrough", "forever", "10K+", "98%", "100% science"];

function authoredText(post: ArticlePost) {
  return JSON.stringify({ ...post, hero: undefined });
}

export function validateArticle(post: ArticlePost) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const text = authoredText(post);
  for (const phrase of blocked) if (text.toLowerCase().includes(phrase.toLowerCase())) errors.push(`blocked phrase: ${phrase}`);
  if (text.toLowerCase().includes("biofeedback")) errors.push("biofeedback may only appear in the fixed offer module");
  const count = post.shortAnswer.text.trim().split(/\s+/).length;
  if (count < 40 || count > 60) warnings.push(`short answer is ${count} words`);
  if (post.shortAnswer.takeaways.length !== 3) warnings.push("takeaways must total 3");
  if (post.faq.length < 4 || post.faq.length > 6) warnings.push("FAQ must total 4 to 6");
  if (post.body.filter((block) => block.type === "booking").length !== 1) warnings.push("body must contain exactly one booking block");
  if (post.body.filter((block) => block.type === "video").length > 1) warnings.push("body may contain at most one video");
  const known = new Set(articleCatalog.map((item) => item.slug));
  for (const slug of [post.upNext, ...post.related]) if (slug && !known.has(slug)) errors.push(`unknown related slug: ${slug}`);
  for (const match of text.matchAll(/\{cite:(\d+)\}/g)) if (Number(match[1]) > post.references.length) errors.push(`citation ${match[1]} has no reference`);
  return { errors, warnings };
}

for (const post of Object.values(articlePosts)) {
  const result = validateArticle(post);
  if (result.errors.length) throw new Error(`Invalid article ${post.slug}: ${result.errors.join(", ")}`);
  if (result.warnings.length && typeof console !== "undefined") console.warn(`Article ${post.slug}: ${result.warnings.join(", ")}`);
}
