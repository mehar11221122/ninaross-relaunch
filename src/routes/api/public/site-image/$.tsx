import { createFileRoute } from "@tanstack/react-router";

/**
 * Serves overridden site images from the private `site-images` bucket.
 *
 * The bucket itself stays locked down (admin-only writes, no anonymous
 * storage access); this read-only endpoint streams the bytes so visitors'
 * browsers can render swapped images. Paths are sanitized and every
 * request is a plain read — no writes can happen here.
 */
export const Route = createFileRoute("/api/public/site-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..") || path.startsWith("/") || path.includes("\\")) {
          return new Response("Not found", { status: 404 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("site-images").download(path);
        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(data, {
          headers: {
            "Content-Type": data.type || "image/png",
            // File names are unique per upload, so replaced images always get a fresh URL.
            "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
