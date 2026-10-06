import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { verifiedTestimonials, type VerifiedTestimonial } from "@/data/trust";

export function VerifiedTestimonials({
  items = verifiedTestimonials,
  compact = false,
  className,
}: {
  items?: VerifiedTestimonial[];
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
        {items.slice(0, 3).map((t) => (
          <blockquote key={t.name} className="card-nr p-5">
            <p className="font-serif text-[13px] leading-relaxed text-ink italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-4 text-[9px] font-extrabold tracking-[0.2em] text-maroon uppercase">
              Verified Client · {t.name}
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return (
    <section className={cn("bg-card", className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow eyebrow--maroon">In Their Words.</p>
        <h2 className="headline mt-4 text-4xl sm:text-5xl">Verified Clients.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <blockquote key={t.name} className="card-nr flex flex-col p-7">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 font-serif text-sm leading-relaxed text-ink italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 text-[9px] font-extrabold tracking-[0.2em] text-maroon uppercase">
                Verified Client · {t.name}
                {t.place ? ` · ${t.place}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
