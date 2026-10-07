import { articleSlugs } from "@/content/posts";
import {
  createFromTemplate,
  getStaticAsDocument,
  listAllArticleSummaries,
  type BlogDocument,
} from "@/lib/blog-cms";
import { createAuthedSupabase, requireAdminUserId } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await requireAdminUserId(request);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const articles = await listAllArticleSummaries();
  return Response.json({
    articles,
    templates: articleSlugs.map((slug) => {
      const doc = getStaticAsDocument(slug);
      return { slug, title: doc?.title || slug };
    }),
  });
}

/** Create a new article from a template (structure preserved, copy cleared). */
export async function POST(request: Request) {
  const userId = await requireAdminUserId(request);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  let body: {
    templateSlug?: string;
    title?: string;
    slug?: string;
    status?: "draft" | "published";
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const templateSlug = body.templateSlug?.trim();
  const title = body.title?.trim();
  if (!templateSlug || !title) {
    return Response.json({ error: "templateSlug and title are required" }, { status: 400 });
  }

  const template = getStaticAsDocument(templateSlug);
  if (!template) {
    // Allow CMS-only templates: load from DB
    const { fetchCmsDocument } = await import("@/lib/blog-cms");
    const row = await fetchCmsDocument(templateSlug);
    if (!row?.document) {
      return Response.json({ error: "Template not found" }, { status: 404 });
    }
    return saveNew(
      token,
      userId,
      createFromTemplate(row.document, { title, slug: body.slug }),
      body.status,
    );
  }

  return saveNew(token, userId, createFromTemplate(template, { title, slug: body.slug }), body.status);
}

async function saveNew(
  token: string,
  userId: string,
  document: BlogDocument,
  status: "draft" | "published" = "draft",
) {
  const supabase = createAuthedSupabase(token);
  const { data: existing } = await supabase
    .from("blog_articles")
    .select("slug")
    .eq("slug", document.slug)
    .maybeSingle();
  if (existing || getStaticAsDocument(document.slug)) {
    return Response.json({ error: `Slug already exists: ${document.slug}` }, { status: 409 });
  }

  const { error } = await supabase.from("blog_articles").insert({
    slug: document.slug,
    document,
    status: status === "published" ? "published" : "draft",
    updated_at: new Date().toISOString(),
    updated_by: userId,
  });
  if (error) {
    return Response.json(
      {
        error: error.message,
        hint:
          error.message.includes("blog_articles") || error.code === "42P01"
            ? "Run drizzle/migrations/0001_blog_articles.sql in the Supabase SQL editor."
            : undefined,
      },
      { status: 502 },
    );
  }
  return Response.json({ ok: true, slug: document.slug, document });
}
