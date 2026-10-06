import { useEffect, useSyncExternalStore } from "react";
import { useAdmin } from "@/hooks/use-admin";
import {
  getServerDragActive,
  isFileDragActive,
  setFileDragDepth,
  subscribeImageOverrides,
} from "@/lib/image-overrides";

function hasFiles(e: DragEvent): boolean {
  return Array.from(e.dataTransfer?.types ?? []).includes("Files");
}

/**
 * Admin-only helpers for the drag & drop image editor:
 * - tracks OS file drags over the window so images highlight as drop targets
 * - stops the browser from navigating away when a file is dropped outside an image
 * - floating hint while dragging
 * Visitors get none of this — it only activates for the signed-in admin.
 */
export function ImageEditController() {
  const dragActive = useSyncExternalStore(
    subscribeImageOverrides,
    isFileDragActive,
    getServerDragActive,
  );
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (!isAdmin) return;
    const onDragEnter = (e: DragEvent) => {
      if (hasFiles(e)) setFileDragDepth(1);
    };
    const onDragLeave = (e: DragEvent) => {
      if (hasFiles(e)) setFileDragDepth(-1);
    };
    const onDragOver = (e: DragEvent) => {
      if (hasFiles(e)) e.preventDefault();
    };
    const onDrop = (e: DragEvent) => {
      if (hasFiles(e)) e.preventDefault();
      setFileDragDepth("reset");
    };
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <>
      {dragActive && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-[10px] font-extrabold tracking-[0.2em] text-gold uppercase shadow-2xl">
          Drop onto any image to replace it
        </div>
      )}
    </>
  );
}
