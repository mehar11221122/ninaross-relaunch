import {
  fetchCmsDocument,
  getStaticAsDocument,
  type BlogDocument,
} from "@/lib/blog-cms";
import { createAuthedSupabase, requireAdminUserId } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const userId = await requireAdminUserId(request);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug: raw } = await context.params;
  const slug = raw?.trim().toLowerCase() ?? "";
  const cms = await fetchCmsDocument(slug);
  if (cms) {
    return Response.json({
      slug,
      source: "cms",
      status: cms.status,
      updatedAt: cms.updated_at,
      document: cms.document,
    });
  }
  const staticDoc = getStaticAsDocument(slug);
  if (!staticDoc) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({
    slug,
    source: "static",
    status: "published",
    updatedAt: null,
    document: staticDoc,
  });
}

/** Save edits in place (body block order must match template structure). */
export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const userId = await requireAdminUserId(request);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const { slug: raw } = await context.params;
  const slug = raw?.trim().toLowerCase() ?? "";

  let body: { document?: BlogDocument; status?: "draft" | "published" };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.document) {
    return Response.json({ error: "document is required" }, { status: 400 });
  }

  const baseline = (await fetchCmsDocument(slug))?.document || getStaticAsDocument(slug);
  if (!baseline) return Response.json({ error: "Not found" }, { status: 404 });

  const nextDoc: BlogDocument = {
    ...body.document,
    slug,
  };

  // Guard: same body length + block types (no section reordering / add / remove).
  if (nextDoc.body.length !== baseline.body.length) {
    return Response.json(
      { error: "Cannot add or remove body sections — edit content only." },
      { status: 400 },
    );
  }
  for (let i = 0; i < baseline.body.length; i++) {
    if (nextDoc.body[i]?.type !== baseline.body[i]?.type) {
      return Response.json(
        { error: `Block ${i} type cannot change (${baseline.body[i]?.type}).` },
        { status: 400 },
      );
    }
  }

  const supabase = createAuthedSupabase(token);
  const status = body.status === "draft" ? "draft" : "published";
  const { error } = await supabase.from("blog_articles").upsert(
    {
      slug,
      document: nextDoc,
      status,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    },
    { onConflict: "slug" },
  );
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
  return Response.json({ ok: true, slug, status, document: nextDoc });
}
