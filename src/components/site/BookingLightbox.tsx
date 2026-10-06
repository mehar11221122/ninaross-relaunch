import { useEffect, useState } from "react";
import { X } from "lucide-react";

const BOOKING_URL = "https://ninaross.as.me/hairlossevaluations";

/**
 * Global booking lightbox: intercepts clicks on any CTA that points at the
 * Acuity booking link and opens it in an in-page modal with a scrollable
 * full-height iframe instead of a new tab.
 */
export function BookingLightbox() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const isBooking = href.includes("ninaross.as.me") || href === "/book" || href === "#book";
      if (!isBooking) return;
      if (anchor.dataset["bookingFallback"] !== undefined) return;
      // Approved design-kit pages use their own lightbox (nr-blog.js).
      if (anchor.hasAttribute("data-book") && document.body.classList.contains("nr-kit-page")) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book my $99 Hair & Body Discovery"
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-card shadow-2xl sm:h-[92vh] sm:max-w-4xl sm:rounded-lg">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/10 bg-ink px-4 py-3">
          <p className="min-w-0 truncate text-[10px] font-extrabold tracking-[0.22em] text-gold uppercase">
            Book My $99 Hair & Body Discovery
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close booking"
            className="shrink-0 text-cream/70 transition-colors hover:text-gold"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          <iframe
            title="Book my $99 Hair & Body Discovery"
            src={BOOKING_URL}
            className="block h-full min-h-[1100px] w-full border-0"
            loading="eager"
          />
        </div>

        <div className="shrink-0 border-t border-ink/10 px-4 py-2 text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-booking-fallback=""
            className="text-[11px] font-bold text-stone-warm underline"
            onClick={(e) => e.stopPropagation()}
          >
            Trouble loading? Open the calendar in a new tab
          </a>
        </div>
      </div>
    </div>
  );
}
