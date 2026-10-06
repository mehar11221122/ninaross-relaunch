/**
 * Cloud-synced image overrides + framing.
 *
 * An admin drags & drops an image file onto any <EditableImage> to swap
 * what the whole site shows, and can also fine-tune how each image is
 * framed (pan + zoom) so before/after pairs line up. Files upload to
 * cloud storage and the slot -> path + framing mapping lives in the
 * site_image_overrides table, which any visitor can read — so changes
 * go live for everyone instantly. Shipped assets are never touched.
 *
 * Writes are enforced server-side: only signed-in admins pass RLS.
 */

import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-images";
const SERVE_PREFIX = "/api/public/site-image/";

/** Framing for a slot: object-position percentages + zoom factor. */
export type ImageTransform = { x: number; y: number; z: number; r: number };
export const DEFAULT_TRANSFORM: ImageTransform = { x: 50, y: 50, z: 1, r: 0 };

const clampNum = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// ---------- Reactive store ----------

const listeners = new Set<() => void>();
const pathBySlot = new Map<string, string>();
const transformBySlot = new Map<string, ImageTransform>();
let version = 0;
let loadPromise: Promise<unknown> | null = null;
let manifestLoaded = false;
let dragDepth = 0;

function emit() {
  listeners.forEach((l) => l());
}

type OverrideRow = {
  slot_id: string;
  image_path: string | null;
  pos_x: number | null;
  pos_y: number | null;
  scale: number | null;
  rotation?: number | null;
};

export function subscribeImageOverrides(listener: () => void): () => void {
  listeners.add(listener);
  loadPromise ??= (async () => {
    try {
      const { data, error } = await supabase.from("site_image_overrides").select("*");
      if (error) throw error;
      for (const row of (data ?? []) as unknown as OverrideRow[]) {
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
    } catch {
      loadPromise = null; // retry on the next subscriber
    }
  })();
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Seed the manifest synchronously from server-loaded data so the first
 * client render already knows every overridden image.
 */
export function hydrateImageOverrides(rows: OverrideRow[]): void {
  if (manifestLoaded) return;
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
  loadPromise ??= Promise.resolve();
  version += 1;
}

export function getOverrideVersion(): number {
  return version;
}
export function getServerVersion(): number {
  return 0;
}

/** True only after the complete override manifest has arrived from the cloud. */
export function isOverrideManifestLoaded(): boolean {
  return manifestLoaded;
}

export function getServerManifestLoaded(): boolean {
  return false;
}

export function getOverrideUrl(slot: string): string | undefined {
  const path = pathBySlot.get(slot);
  if (!path) return undefined;
  return SERVE_PREFIX + path.split("/").map(encodeURIComponent).join("/");
}

/** Framing for a slot (defaults to centered, unzoomed). */
export function getOverrideTransform(slot: string): ImageTransform {
  return transformBySlot.get(slot) ?? DEFAULT_TRANSFORM;
}

export function isFileDragActive(): boolean {
  return dragDepth > 0;
}
export function getServerDragActive(): boolean {
  return false;
}

export function setFileDragDepth(delta: number | "reset") {
  dragDepth = delta === "reset" ? 0 : Math.max(0, dragDepth + delta);
  emit();
}

// ---------- Overrides CRUD (admin only; enforced by RLS) ----------

const MAX_EDGE = 1600;

/**
 * Re-encode any dropped image to WebP (and cap its longest edge) so the
 * site only ever serves small, fast images. Falls back to the original
 * file if the browser can't encode WebP.
 */
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
  const { blob, contentType, ext } = await toWebp(file);
  const path = `${slot}/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType,
  });
  if (uploadError) throw new Error(uploadError.message);

  // A brand-new image resets framing so stale pan/zoom never distorts it.
  const { error: upsertError } = await supabase.from("site_image_overrides").upsert(
    {
      slot_id: slot,
      image_path: path,
      updated_by: userId,
      pos_x: DEFAULT_TRANSFORM.x,
      pos_y: DEFAULT_TRANSFORM.y,
      scale: DEFAULT_TRANSFORM.z,
      rotation: DEFAULT_TRANSFORM.r,
    } as never,
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

/** Persist pan/zoom framing for a slot — works with or without a swapped image. */
export async function saveOverrideTransform(
  slot: string,
  t: ImageTransform,
  userId: string,
): Promise<void> {
  const transform: ImageTransform = {
    x: clampNum(t.x, 0, 100),
    y: clampNum(t.y, 0, 100),
    z: clampNum(t.z, 1, 4),
    r: ((Math.round((t.r ?? 0) / 90) * 90) % 360 + 360) % 360,
  };
  const { error } = await supabase.from("site_image_overrides").upsert(
    {
      slot_id: slot,
      pos_x: transform.x,
      pos_y: transform.y,
      scale: transform.z,
      rotation: transform.r,
      updated_by: userId,
    } as never,
    { onConflict: "slot_id" },
  );
  if (error) throw new Error(error.message);
  transformBySlot.set(slot, transform);
  version += 1;
  emit();
}
