import { articleSlugs, getArticle } from "@/content/posts";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9-]{1,120}$/;

function expectedPath(slug: string): string {
  return `audio/${slug}.mp3`;
}

/**
 * Streams only the MP3 bound to this slug (audio/{slug}.mp3).
 * Never accepts a path query — slug is the sole selector.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: raw } = await context.params;
  const slug = raw?.trim().toLowerCase() ?? "";

  if (!SLUG_RE.test(slug) || !articleSlugs.includes(slug) || !getArticle(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const want = expectedPath(slug);

  try {
    const supabase = getSupabaseServer();
    const { data: row, error } = await supabase
      .from("article_audio")
      .select("slug, path")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !row) return new Response("No audio", { status: 404 });
    if (row.slug !== slug || row.path !== want) {
      return new Response("Audio binding mismatch", { status: 409 });
    }

    const { data: file, error: dlErr } = await supabase.storage
      .from("article-audio")
      .download(want);

    if (dlErr || !file) {
      // Signed fetch fallback (service-role environments).
      const { data: signed } = await supabase.storage
        .from("article-audio")
        .createSignedUrl(want, 120);
      if (signed?.signedUrl) {
        const upstream = await fetch(signed.signedUrl);
        if (upstream.ok) {
          return new Response(upstream.body, {
            headers: {
              "content-type": "audio/mpeg",
              "cache-control": "private, max-age=300",
              "x-article-slug": slug,
              "x-audio-path": want,
            },
          });
        }
      }
      console.error("[article-audio/file]", slug, dlErr?.message);
      return new Response("Audio unavailable", { status: 502 });
    }

    const bytes = await file.arrayBuffer();
    return new Response(bytes, {
      headers: {
        "content-type": "audio/mpeg",
        "cache-control": "private, max-age=300",
        "content-length": String(bytes.byteLength),
        "x-article-slug": slug,
        "x-audio-path": want,
      },
    });
  } catch (e) {
    console.error("[article-audio/file]", slug, e);
    return new Response("Server error", { status: 503 });
  }
}
