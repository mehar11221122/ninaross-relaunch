import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type ImageOverrideRow = {
  slot_id: string;
  image_path: string | null;
  pos_x: number | null;
  pos_y: number | null;
  scale: number | null;
  rotation?: number | null;
};

/**
 * Public read of the image override manifest, done on the server so the
 * page knows which images to render on its very first paint (no async
 * lookup, no placeholder gap).
 */
export const getImageOverrides = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return [] as ImageOverrideRow[];
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await client
    .from("site_image_overrides")
    .select("slot_id,image_path,pos_x,pos_y,scale,rotation");
  if (error) return [] as ImageOverrideRow[];
  return (data ?? []) as unknown as ImageOverrideRow[];
});
