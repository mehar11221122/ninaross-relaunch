import { resolveArticle } from "@/lib/blog-cms";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9-]{1,120}$/;

/** Strict path binding: DB row for slug X may only point at audio/X.mp3. */
function expectedPath(slug: string): string {
  return `audio/${slug}.mp3`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: raw } = await context.params;
  const slug = raw?.trim().toLowerCase() ?? "";

  if (!SLUG_RE.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }

  // Static or CMS article only — never categories or arbitrary paths.
  if (!(await resolveArticle(slug))) {
    return Response.json({ error: "Not an article", slug }, { status: 404 });
  }

  try {
    const supabase = getSupabaseServer();
    const { data: row, error } = await supabase
      .from("article_audio")
      .select("slug, path, text_hash, updated_at")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("[article-audio]", slug, error.message);
      return Response.json({ error: "Lookup failed", slug }, { status: 502 });
    }
    if (!row) {
      return Response.json({ slug, audio: null });
    }

    // Always serve media through our slug-bound proxy — never a raw storage URL
    // that could be swapped. Path must be audio/{slug}.mp3.
    const want = expectedPath(slug);
    if (row.slug !== slug || row.path !== want) {
      console.error("[article-audio] path mismatch", { slug, row });
      return Response.json(
        { error: "Audio binding mismatch", slug },
        { status: 409 },
      );
    }

    let cues: { k: string; t: number }[] = [];
    try {
      const { data: file } = await supabase.storage
        .from("article-audio")
        .download(`audio/${slug}.json`);
      if (file) cues = JSON.parse(await file.text()) as { k: string; t: number }[];
    } catch {
      cues = [];
    }

    return Response.json(
      {
        slug,
        audio: {
          url: `/api/article-audio/${encodeURIComponent(slug)}/file`,
          hash: row.text_hash,
          updatedAt: row.updated_at,
          cues,
          path: want,
        },
      },
      {
        headers: {
          "cache-control": "private, max-age=60",
        },
      },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("[article-audio]", slug, msg);
    return Response.json({ error: msg, slug }, { status: 503 });
  }
}
