import type { ArticleBlock, ArticlePost, CatalogItem } from "@/content/posts";
import { articleCatalog, articlePosts, articleSlugs, getArticle } from "@/content/posts";
import { getSupabaseServer } from "@/lib/supabase-server";

export type ArticleFigure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/** CMS document = ArticlePost plus optional template figures (editable, not reorderable). */
export type BlogDocument = ArticlePost & {
  leadFigure?: ArticleFigure | null;
  midFigure?: ArticleFigure | null;
};

export type BlogArticleRow = {
  slug: string;
  document: BlogDocument;
  status: "draft" | "published";
  updated_at: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function clearBlock(block: ArticleBlock): ArticleBlock {
  switch (block.type) {
    case "p":
      return { type: "p", text: "TODO: paragraph" };
    case "h2":
      return {
        type: "h2",
        id: block.id,
        toc: "TODO: section",
        text: "TODO: section heading",
      };
    case "h3":
      return { type: "h3", text: "TODO: subsection" };
    case "pullquote":
      return { type: "pullquote", text: "TODO: pull quote" };
    case "timeline":
      return {
        type: "timeline",
        steps: block.steps.map((s, i) => ({
          title: `TODO: step ${i + 1}`,
          text: "TODO: step detail",
        })),
      };
    case "figure":
      return {
        ...block,
        alt: "TODO: image description",
        caption: "TODO: caption",
      };
    case "checklist":
      return {
        type: "checklist",
        items: block.items.map((_, i) => `TODO: checklist item ${i + 1}`),
      };
    case "foodgrid":
      return {
        type: "foodgrid",
        groups: block.groups.map((g, i) => ({
          title: `TODO: group ${i + 1}`,
          items: g.items.map((_, j) => `TODO: item ${j + 1}`),
        })),
      };
    case "callout":
      return {
        ...block,
        title: block.title ? "TODO: callout title" : undefined,
        text: "TODO: callout body",
      };
    case "table":
      return {
        type: "table",
        head: block.head.map((_, i) => `TODO: col ${i + 1}`),
        rows: block.rows.map((row, ri) =>
          row.map((_, ci) => `TODO: r${ri + 1}c${ci + 1}`),
        ),
      };
    case "video":
      return { ...block, title: "TODO: video title" };
    case "booking":
      return {
        type: "booking",
        lead: "TODO: booking lead",
        text: "TODO: booking copy",
      };
    case "links":
      return {
        type: "links",
        title: block.title || "Related",
        items: block.items.map((it) => ({
          ...it,
          title: "TODO: link title",
          text: "TODO: link text",
        })),
      };
    default:
      return block;
  }
}

/** Clone an existing article’s section structure for a new post (order preserved). */
export function createFromTemplate(
  template: BlogDocument,
  opts: { title: string; slug?: string; categorySlug?: string; category?: string },
): BlogDocument {
  const title = opts.title.trim();
  const slug = opts.slug?.trim() || slugify(title);
  if (!slug) throw new Error("Slug is required.");
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) {
    throw new Error("Slug must be lowercase letters, numbers, and hyphens.");
  }

  return {
    ...template,
    slug,
    title,
    seoTitle: title,
    shortTitle: title,
    description: "TODO: meta description (about 150 characters).",
    category: opts.category || template.category,
    categorySlug: opts.categorySlug || template.categorySlug,
    subtitle: "TODO: subtitle under the title.",
    published: new Date().toISOString().slice(0, 10),
    lastReviewed: null,
    readTime: template.readTime,
    author: "nina",
    reviewer: "nina",
    hero: {
      ...template.hero,
      alt: "TODO: hero image alt text",
      caption: "TODO: hero caption",
      og: "",
    },
    note: {
      text: "TODO: author note from Dr. Nina.",
      video: { youtubeId: "", file: "", label: "30-second" },
    },
    shortAnswer: {
      text: "TODO: short answer paragraph.",
      takeaways: ["TODO: takeaway 1", "TODO: takeaway 2", "TODO: takeaway 3"],
    },
    body: template.body.map(clearBlock),
    faq: (template.faq || []).map(() => ({
      q: "TODO: FAQ question",
      a: "TODO: FAQ answer",
    })),
    references: (template.references || []).map(() => ({
      title: "TODO: reference title",
      href: "https://",
    })),
    upNext: null,
    related: [],
    leadFigure: template.leadFigure
      ? {
          ...template.leadFigure,
          alt: "TODO: lead image alt",
          caption: "TODO: lead caption",
        }
      : {
          src: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291372/ninaross/landing/img/scalp-imaging-trichoscope-session-nina-ross-atlanta.webp",
          width: 1200,
          height: 900,
          alt: "TODO: lead image alt",
          caption: "TODO: lead caption",
        },
    midFigure: template.midFigure
      ? {
          ...template.midFigure,
          alt: "TODO: mid image alt",
          caption: "TODO: mid caption",
        }
      : {
          src: "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/fm/functional-medicine-body-scan-consultation-nina-ross-atlanta.webp",
          width: 1200,
          height: 900,
          alt: "TODO: mid image alt",
          caption: "TODO: mid caption",
        },
  };
}

export function toCatalogItem(doc: BlogDocument): CatalogItem {
  return {
    slug: doc.slug,
    category: doc.category,
    categorySlug: doc.categorySlug,
    title: doc.title,
    summary: doc.description,
    readTime: doc.readTime,
  };
}

export async function fetchCmsRows(opts?: {
  includeDrafts?: boolean;
}): Promise<BlogArticleRow[]> {
  try {
    const supabase = getSupabaseServer();
    let q = supabase.from("blog_articles").select("slug, document, status, updated_at");
    if (!opts?.includeDrafts) q = q.eq("status", "published");
    const { data, error } = await q;
    if (error) {
      console.error("[blog-cms]", error.message);
      return [];
    }
    return (data ?? []) as BlogArticleRow[];
  } catch (e) {
    console.error("[blog-cms]", e);
    return [];
  }
}

export async function fetchCmsDocument(slug: string): Promise<BlogArticleRow | null> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("blog_articles")
      .select("slug, document, status, updated_at")
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      console.error("[blog-cms]", slug, error.message);
      return null;
    }
    return data as BlogArticleRow | null;
  } catch {
    return null;
  }
}

/** Prefer CMS document when published; otherwise static JSON. */
export async function resolveArticle(slug: string): Promise<BlogDocument | undefined> {
  const row = await fetchCmsDocument(slug);
  if (row?.status === "published" && row.document) {
    return { ...row.document, slug: row.slug };
  }
  const staticPost = getArticle(slug);
  return staticPost as BlogDocument | undefined;
}

/** Catalog = static + CMS published (CMS wins on slug conflict). */
export async function resolveCatalog(): Promise<CatalogItem[]> {
  const rows = await fetchCmsRows({ includeDrafts: false });
  const bySlug = new Map(articleCatalog.map((c) => [c.slug, c]));
  for (const row of rows) {
    bySlug.set(row.slug, toCatalogItem(row.document));
  }
  return [...bySlug.values()];
}

export async function listAllArticleSummaries(): Promise<
  Array<{
    slug: string;
    title: string;
    source: "static" | "cms";
    status: "published" | "draft";
    updatedAt: string | null;
  }>
> {
  const rows = await fetchCmsRows({ includeDrafts: true });
  const cmsBySlug = new Map(rows.map((r) => [r.slug, r]));
  const out: Array<{
    slug: string;
    title: string;
    source: "static" | "cms";
    status: "published" | "draft";
    updatedAt: string | null;
  }> = [];

  for (const slug of articleSlugs) {
    const cms = cmsBySlug.get(slug);
    const staticPost = articlePosts[slug];
    out.push({
      slug,
      title: cms?.document.title || staticPost?.title || slug,
      source: cms ? "cms" : "static",
      status: cms?.status || "published",
      updatedAt: cms?.updated_at || null,
    });
    cmsBySlug.delete(slug);
  }
  for (const row of cmsBySlug.values()) {
    out.push({
      slug: row.slug,
      title: row.document.title || row.slug,
      source: "cms",
      status: row.status,
      updatedAt: row.updated_at,
    });
  }
  return out.sort((a, b) => a.title.localeCompare(b.title));
}

export function getStaticAsDocument(slug: string): BlogDocument | undefined {
  const post = getArticle(slug);
  return post as BlogDocument | undefined;
}
