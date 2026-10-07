"use client";

/**
 * Cloud-synced image overrides. Writes require a signed-in admin (RLS).
 * Served via /api/public/site-image/...
 */

import { getSupabaseBrowser } from "@/lib/supabase-browser";

const BUCKET = "site-images";
export const SITE_IMAGE_SERVE_PREFIX = "/api/public/site-image/";

export type ImageTransform = { x: number; y: number; z: number; r: number };
export const DEFAULT_TRANSFORM: ImageTransform = { x: 50, y: 50, z: 1, r: 0 };

export type OverrideRow = {
  slot_id: string;
  image_path: string | null;
  pos_x: number | null;
  pos_y: number | null;
  scale: number | null;
  rotation?: number | null;
};

const pathBySlot = new Map<string, string>();
const transformBySlot = new Map<string, ImageTransform>();
let version = 0;
let loadPromise: Promise<unknown> | null = null;
let manifestLoaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function applyRows(rows: OverrideRow[]) {
  pathBySlot.clear();
  transformBySlot.clear();
  for (const row of rows) {
    if (row.image_path) pathBySlot.set(row.slot_id, row.image_path);
    transformBySlot.set(row.slot_id, {
      x: row.pos_x ?? DEFAULT_TRANSFORM.x,
      y: row.pos_y ?? DEFAULT_TRANSFORM.y,
      z: row.scale ?? DEFAULT_TRANSFORM.z,
      r: row.rotation ?? DEFAULT_TRANSFORM.r,
    });
  }
  manifestLoaded = true;
  version += 1;
  emit();
}

async function fetchManifest(): Promise<void> {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase.from("site_image_overrides").select("*");
  if (error) throw error;
  applyRows((data ?? []) as OverrideRow[]);
}

export function subscribeImageOverrides(listener: () => void): () => void {
  listeners.add(listener);
  loadPromise ??= fetchManifest().catch(() => {
    loadPromise = null;
  });
  return () => {
    listeners.delete(listener);
  };
}

export function getOverrideVersion(): number {
  return version;
}

export function isOverrideManifestLoaded(): boolean {
  return manifestLoaded;
}

export function getOverrideUrl(slot: string): string | undefined {
  const path = pathBySlot.get(slot);
  if (!path) return undefined;
  return SITE_IMAGE_SERVE_PREFIX + path.split("/").map(encodeURIComponent).join("/");
}

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

export async function saveOverride(slot: string, file: File, userId: string): Promise<void> {
  const supabase = getSupabaseBrowser();
  const { blob, contentType, ext } = await toWebp(file);
  const path = `${slot}/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType,
  });
  if (uploadError) throw new Error(uploadError.message);

  const { error: upsertError } = await supabase.from("site_image_overrides").upsert(
    {
      slot_id: slot,
      image_path: path,
      updated_by: userId,
      pos_x: DEFAULT_TRANSFORM.x,
      pos_y: DEFAULT_TRANSFORM.y,
      scale: DEFAULT_TRANSFORM.z,
      rotation: DEFAULT_TRANSFORM.r,
    },
    { onConflict: "slot_id" },
  );
  if (upsertError) {
    void supabase.storage.from(BUCKET).remove([path]);
    throw new Error(upsertError.message);
  }

  const previous = pathBySlot.get(slot);
  pathBySlot.set(slot, path);
  transformBySlot.delete(slot);
  version += 1;
  emit();
  if (previous && previous !== path) {
    void supabase.storage.from(BUCKET).remove([previous]);
  }
}

export async function reloadImageOverrides(): Promise<void> {
  loadPromise = fetchManifest();
  await loadPromise;
}
