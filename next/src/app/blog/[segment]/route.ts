import { articleSlugs } from "@/content/posts";
import { resolveArticle, resolveCatalog } from "@/lib/blog-cms";
import { buildKitDocument } from "@/lib/kit-document";
import { renderArticleParts } from "@/lib/nr-article";
import {
  articleCategories,
  getArticleCategory,
  renderCategoryParts,
} from "@/lib/nr-category";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const cats = articleCategories.map((c) => ({ segment: c.slug }));
  const arts = articleSlugs.map((slug) => ({ segment: slug }));
  return [...cats, ...arts];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ segment: string }> },
) {
  const { segment } = await context.params;
  const category = getArticleCategory(segment);
  if (category) {
    const catalog = await resolveCatalog();
    const parts = renderCategoryParts(category, catalog);
    const html = buildKitDocument({
      title: `${category.seoTitle || category.name} | Nina Ross`,
      description: category.description,
      canonicalPath: `/blog/${category.slug}`,
      bodyHtml: parts.body,
      schemaJson: parts.schema,
      preloadImages: parts.heroPreload ? [parts.heroPreload] : undefined,
      stylesheets: ["/blog-kit/nr-blog.css"],
      bodyClass: "is-article nr-kit-page",
      bodyAttrs: { "data-hub": category.slug },
      scripts: ["/blog-kit/nr-blog.js?v=4"],
    });
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }

  const article = await resolveArticle(segment);
  if (!article) {
    return new Response("Not found", { status: 404 });
  }
  const parts = renderArticleParts(article);
  const html = buildKitDocument({
    title: article.seoTitle,
    description: article.description,
    canonicalPath: `/blog/${article.slug}`,
    bodyHtml: parts.body,
    schemaJson: parts.schema,
    ogImage: article.hero.og || undefined,
    ogType: "article",
    preloadImages: parts.heroPreload ? [parts.heroPreload] : undefined,
    stylesheets: ["/blog-kit/nr-blog.css", "/blog-kit/article-audio.css"],
    bodyClass: "is-article nr-kit-page",
    bodyAttrs: { "data-slug": article.slug },
    scripts: ["/blog-kit/nr-blog.js?v=4", "/blog-kit/article-audio.js"],
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
