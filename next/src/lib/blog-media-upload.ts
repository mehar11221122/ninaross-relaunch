"use client";

import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { SITE_IMAGE_SERVE_PREFIX } from "@/lib/image-overrides";

const IMAGE_BUCKET = "site-images";
const AUDIO_BUCKET = "article-audio";
const MAX_EDGE = 1600;

async function toWebp(file: File): Promise<{ blob: Blob; contentType: string; ext: string }> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.86),
    );
    if (!blob || blob.type !== "image/webp") throw new Error("webp unsupported");
    return { blob, contentType: "image/webp", ext: "webp" };
  } catch {
    const fromType = file.type.split("/")[1]?.replace("jpeg", "jpg");
    const fromName = file.name.includes(".") ? file.name.split(".").pop() : undefined;
    const ext = (fromType || fromName || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    return { blob: file, contentType: file.type || "image/png", ext };
  }
}

async function measureBlob(blob: Blob): Promise<{ width: number; height: number }> {
  try {
    const bmp = await createImageBitmap(blob);
    const size = { width: bmp.width, height: bmp.height };
    bmp.close();
    return size;
  } catch {
    return { width: 1200, height: 900 };
  }
}

/** Upload a blog image to site-images; returns site-image proxy URL. */
export async function uploadBlogImage(
  slug: string,
  kind: string,
  file: File,
): Promise<{ url: string; width: number; height: number }> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  const { blob, contentType, ext } = await toWebp(file);
  const { width, height } = await measureBlob(blob);

  const supabase = getSupabaseBrowser();
  const path = `blog/${slug}/${kind}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, blob, {
    contentType,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const url =
    SITE_IMAGE_SERVE_PREFIX + path.split("/").map(encodeURIComponent).join("/");
  return { url, width, height };
}

/** Upload an MP3 into article-audio storage + article_audio row. */
export async function uploadBlogAudio(slug: string, file: File): Promise<void> {
  const okType =
    file.type === "audio/mpeg" ||
    file.type === "audio/mp3" ||
    file.name.toLowerCase().endsWith(".mp3");
  if (!okType) throw new Error("Choose an MP3 audio file.");

  const supabase = getSupabaseBrowser();
  const path = `audio/${slug}.mp3`;
  const { error: upErr } = await supabase.storage.from(AUDIO_BUCKET).upload(path, file, {
    contentType: "audio/mpeg",
    upsert: true,
  });
  if (upErr) throw new Error(upErr.message);

  const hashBuf = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  const hash = Array.from(new Uint8Array(hashBuf))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const { error: rowErr } = await supabase.from("article_audio").upsert(
    {
      slug,
      path,
      text_hash: `upload:${hash}`,
      char_count: file.size,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (rowErr) throw new Error(rowErr.message);
}
