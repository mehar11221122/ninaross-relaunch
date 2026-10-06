import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, ImagePlus, Loader2, Move, RotateCcw, RotateCw, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/hooks/use-admin";
import {
  DEFAULT_TRANSFORM,
  getOverrideTransform,
  getOverrideUrl,
  getOverrideVersion,
  getServerDragActive,
  getServerManifestLoaded,
  getServerVersion,
  isOverrideManifestLoaded,
  isFileDragActive,
  saveOverride,
  saveOverrideTransform,
  setFileDragDepth,
  subscribeImageOverrides,
  type ImageTransform,
} from "@/lib/image-overrides";

type EditableImageProps = {
  /** Stable id for this image slot — overrides are stored against it. */
  slot: string;
  src: string;
  alt: string;
  /** Classes for the frame (size, radius). The inner image always covers it. */
  className?: string;
  loading?: "lazy" | "eager";
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Drop-in replacement for <img> that accepts image files dropped onto it.
 * When the admin drops a file here it uploads to the cloud and goes live
 * for every visitor. Admins can also open an adjust mode to pan (drag)
 * and zoom (scroll or slider) so images line up inside their frames.
 */
export function EditableImage({ slot, src, alt, className, loading = "lazy" }: EditableImageProps) {
  useSyncExternalStore(subscribeImageOverrides, getOverrideVersion, getServerVersion);
  const dragActive = useSyncExternalStore(
    subscribeImageOverrides,
    isFileDragActive,
    getServerDragActive,
  );
  const manifestLoaded = useSyncExternalStore(
    subscribeImageOverrides,
    isOverrideManifestLoaded,
    getServerManifestLoaded,
  );
  const { user, isAdmin } = useAdmin();
  const overrideUrl = getOverrideUrl(slot);
  const [isOver, setIsOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const [draft, setDraft] = useState<ImageTransform | null>(null);
  const [savingPos, setSavingPos] = useState(false);
  const depthRef = useRef(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  const applied = adjusting && draft ? draft : getOverrideTransform(slot);
  const [frameBox, setFrameBox] = useState({ w: 0, h: 0 });

  // Rotating 90/270 swaps the image's width and height, so it must be scaled
  // up by the frame's aspect ratio to keep covering the frame.
  const quarterTurned = applied.r === 90 || applied.r === 270;
  const coverBoost =
    quarterTurned && frameBox.w > 0 && frameBox.h > 0
      ? Math.max(frameBox.w / frameBox.h, frameBox.h / frameBox.w)
      : 1;

  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () =>
      setFrameBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reset hover state when the global drag ends elsewhere
  useEffect(() => {
    if (!dragActive) {
      depthRef.current = 0;
      setIsOver(false);
    }
  }, [dragActive]);

  // Wheel zoom while adjusting — native non-passive listener so the page
  // doesn't scroll behind the image. Trackpad pinch arrives as ctrlKey wheel
  // and is handled by the same path.
  useEffect(() => {
    if (!adjusting) return;
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      setDraft((d) =>
        d ? { ...d, z: clamp(d.z * Math.exp(-dy * 0.0015), MIN_ZOOM, MAX_ZOOM) } : d,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [adjusting]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    depthRef.current = 0;
    setIsOver(false);
    setFileDragDepth("reset");
    if (adjusting) return;
    if (!isAdmin || !user) {
      toast.info("Only the site admin can change images.", {
        description: "Use the Admin link in the menu to sign in first.",
      });
      return;
    }
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
    if (!file) {
      toast.error("That file isn't an image — drop a PNG, JPG or WebP.");
      return;
    }
    setSaving(true);
    void saveOverride(slot, file, user.id)
      .then(() => {
        toast.success("Image replaced", {
          description: "It's now live on the site for every visitor.",
        });
      })
      .catch((err: unknown) => {
        toast.error("Couldn't save the image", {
          description: err instanceof Error ? err.message : "Please try again.",
        });
      })
      .finally(() => setSaving(false));
  };

  const startAdjust = () => {
    setDraft(getOverrideTransform(slot));
    setAdjusting(true);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!adjusting || !draft) return;
    if ((e.target as HTMLElement).closest("button, input, a")) return;
    e.preventDefault();
    frameRef.current?.setPointerCapture(e.pointerId);
    panRef.current = { px: e.clientX, py: e.clientY, x: draft.x, y: draft.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const start = panRef.current;
    if (!start) return;
    const img = imgRef.current;
    const box = frameRef.current?.getBoundingClientRect();
    if (!img || !box || box.width === 0 || box.height === 0) return;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;
    // Convert pixel drags into object-position percentages using the real
    // overflow of the cover-fitted image, so panning tracks the cursor 1:1.
    const cover = Math.max(box.width / nw, box.height / nh);
    const overflowX = Math.max(0, nw * cover - box.width);
    const overflowY = Math.max(0, nh * cover - box.height);
    const z = draft?.z ?? 1;
    const dx = e.clientX - start.px;
    const dy = e.clientY - start.py;
    setDraft((d) =>
      d
        ? {
            ...d,
            x: overflowX > 0 ? clamp(start.x - (dx / (overflowX * z)) * 100, 0, 100) : 50,
            y: overflowY > 0 ? clamp(start.y - (dy / (overflowY * z)) * 100, 0, 100) : 50,
          }
        : d,
    );
  };

  const handlePointerUp = () => {
    panRef.current = null;
  };

  const handleSavePosition = () => {
    if (!draft || !user || savingPos) return;
    setSavingPos(true);
    void saveOverrideTransform(slot, draft, user.id)
      .then(() => {
        toast.success("Position saved", { description: "It's live for every visitor." });
        setAdjusting(false);
        setDraft(null);
      })
      .catch((err: unknown) => {
        toast.error("Couldn't save the position", {
          description: err instanceof Error ? err.message : "Please try again.",
        });
      })
      .finally(() => setSavingPos(false));
  };

  // Clicking anywhere outside the frame saves the framing and closes.
  // No deps array: re-subscribes every render so the closure always sees
  // the latest draft/savingPos state.
  useEffect(() => {
    if (!adjusting) return;
    const onOutsidePointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (toolbarRef.current?.contains(t)) return;
      if (frameRef.current && !frameRef.current.contains(t)) {
        handleSavePosition();
      }
    };
    document.addEventListener("pointerdown", onOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", onOutsidePointerDown);
  });

  return (
    <div
      ref={frameRef}
      className={cn("group/img relative overflow-hidden", className)}
      style={adjusting ? { touchAction: "none", cursor: "grab" } : undefined}
      onDragEnter={(e) => {
        e.preventDefault();
        depthRef.current += 1;
        setIsOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={() => {
        depthRef.current -= 1;
        if (depthRef.current <= 0) {
          depthRef.current = 0;
          setIsOver(false);
        }
      }}
      onDrop={handleDrop}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {manifestLoaded && (
        <img
          key={overrideUrl ?? src}
          ref={imgRef}
          src={overrideUrl ?? src}
          alt={alt}
          loading={loading}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
          style={{
            objectPosition: `${applied.x}% ${applied.y}%`,
            transform: `rotate(${applied.r}deg) scale(${applied.z * coverBoost})`,
            transformOrigin: `${applied.x}% ${applied.y}%`,
          }}
        />
      )}

      {isAdmin && !dragActive && !adjusting && (
        <button
          type="button"
          onClick={startAdjust}
          className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.14em] text-cream uppercase shadow-md transition-colors hover:bg-maroon-deep"
        >
          <Move className="size-3" /> Adjust
        </button>
      )}

      {adjusting && draft && (
        <>
          <div className="pointer-events-none absolute inset-0 border-2 border-gold" />
          {createPortal(
            <div
              ref={toolbarRef}
              className="fixed inset-x-0 bottom-0 z-[100] border-t-2 border-gold bg-ink/95 px-3 py-3 shadow-2xl backdrop-blur"
            >
              <div className="mx-auto flex max-w-2xl flex-col gap-2">
                <p className="text-center text-[9px] font-bold tracking-[0.12em] text-cream/70 uppercase">
                  Drag the image to move · scroll to zoom
                </p>
                <div className="flex items-center gap-2">
                  <ZoomIn className="size-4 shrink-0 text-gold" />
                  <input
                    type="range"
                    min={MIN_ZOOM}
                    max={MAX_ZOOM}
                    step={0.01}
                    value={draft.z}
                    onChange={(e) => setDraft({ ...draft, z: Number(e.target.value) })}
                    className="h-1 flex-1 accent-gold"
                    aria-label="Zoom"
                  />
                  <span className="w-9 shrink-0 text-right text-[11px] font-bold text-cream">
                    {draft.z.toFixed(1)}×
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, r: (draft.r + 270) % 360 })}
                    className="flex items-center gap-1 rounded-full border border-cream/30 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.12em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
                  >
                    <RotateCcw className="size-3.5" /> Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, r: (draft.r + 90) % 360 })}
                    className="flex items-center gap-1 rounded-full border border-cream/30 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.12em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
                  >
                    <RotateCw className="size-3.5" /> Right
                  </button>
                  <span className="w-9 shrink-0 text-[11px] font-bold text-cream">{draft.r}°</span>
                  <button
                    type="button"
                    onClick={() => setDraft(DEFAULT_TRANSFORM)}
                    className="text-[9px] font-bold tracking-[0.1em] text-cream/70 uppercase transition-colors hover:text-cream"
                  >
                    Reset
                  </button>
                  <span className="flex-1" />
                  <button
                    type="button"
                    onClick={() => {
                      setAdjusting(false);
                      setDraft(null);
                    }}
                    className="shrink-0 text-cream/70 transition-colors hover:text-cream"
                    aria-label="Cancel"
                  >
                    <X className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePosition}
                    disabled={savingPos}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-gold px-4 py-2 text-[10px] font-extrabold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-cream disabled:opacity-60"
                  >
                    {savingPos ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Check className="size-3" />
                    )}
                    Done
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
        </>
      )}


      {dragActive && isAdmin && !adjusting && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center border-2 border-dashed transition-colors",
            isOver ? "border-gold bg-ink/60" : "border-gold/50 bg-ink/20",
          )}
        >
          {isOver && (
            <span className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] text-ink uppercase shadow-lg">
              <ImagePlus className="size-3.5" /> Drop to replace
            </span>
          )}
        </div>
      )}

      {saving && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/60">
          <Loader2 className="size-6 animate-spin text-gold" />
        </div>
      )}
    </div>
  );
}
