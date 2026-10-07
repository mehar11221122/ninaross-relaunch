import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * Streams overridden site images from the `site-images` bucket.
 * Paths are sanitized; this handler is read-only.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await context.params;
  const path = (parts ?? []).map(decodeURIComponent).join("/");
  if (!path || path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.storage.from("site-images").download(path);
    if (error || !data) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(data, {
      headers: {
        "Content-Type": data.type || "image/png",
        "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    console.error("[site-image]", path, e);
    return new Response("Not found", { status: 404 });
  }
}
