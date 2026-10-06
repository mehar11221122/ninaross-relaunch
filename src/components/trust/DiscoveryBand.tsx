import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";
import { BookCta } from "@/components/trust/BookCta";

/**
 * The $99 Hair & Body Discovery explainer band.
 * Compact, self-contained, reusable on every page.
 * All offer/CTA text renders from src/data/trust.ts so it never drifts.
 */
export function DiscoveryBand({ className }: { className?: string | undefined }) {
  const checklist = [
    `${trust.durationMinutes} minutes with a certified trichologist`,
    "The 200x Scalp Read, your scalp magnified live on screen",
    "A full-body biofeedback scan",
    "Your written Hair & Body Discovery Report, in your inbox the next day",
  ];

  const chips = [
    "No prep",
    "One visit",
    "Same week",
    "Protective styles welcome",
    "No judgment",
    "Serving all of Metro Atlanta",
  ];

  return (
    <section className={cn("bg-ink text-cream", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{trust.offerName.toUpperCase()}</p>
          <h2 className="headline mt-4 text-cream text-3xl sm:text-4xl lg:text-[2.75rem]">
            First We See. Then We Treat.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/80">
            Your hair loss has a cause. In one visit we find it, you see it for yourself at 200x, and it's in writing the next day.
          </p>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-gold/90">
            {trust.guarantee}
          </p>
          <BookCta className="btn btn-gold mt-7 self-start" />
        </div>

        {/* Right column — WHAT YOU GET card */}
        <div className="card-nr flex flex-col p-6 sm:p-8">
          <p className="text-[9px] font-extrabold tracking-[0.22em] text-maroon uppercase">
            What You Get
          </p>
          <ul className="mt-5 space-y-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="min-w-0 text-[14px] leading-snug text-ink">{item}</span>
              </li>
            ))}
          </ul>

          {/* Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/10 bg-cream-deep px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-stone-warm uppercase"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Payment line */}
          <p className="mt-5 border-t border-ink/10 pt-4 text-[11px] font-semibold tracking-wide text-stone-warm">
            {trust.payment}
          </p>
        </div>
      </div>
    </section>
  );
}
