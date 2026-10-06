import { cn } from "@/lib/utils";
import { trust, proofCases, type ProofCase } from "@/data/trust";

function Frame({ src, label }: { src?: string | undefined; label: string }) {
  if (!src) return null;
  return (
    <figure className="relative m-0 h-52 overflow-hidden">
      <img src={src} alt={label} loading="lazy" decoding="async" className="size-full object-cover" />
      <figcaption className="absolute bottom-2 left-2 bg-ink/85 px-2 py-1 text-[8px] tracking-[0.14em] text-cream uppercase">
        {label}
      </figcaption>
    </figure>
  );
}

export function ProofGallery({
  cases = proofCases,
  title = "Proof Before Promises.",
  className,
}: {
  cases?: ProofCase[] | undefined;
  title?: string | undefined;
  className?: string | undefined;
}) {
  const completeCases = cases.filter((item) => item.before && item.after);
  if (!completeCases.length) return null;

  return (
    <section className={cn("bg-cream", className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow eyebrow--maroon">Documented Results.</p>
        <h2 className="headline mt-4 text-4xl sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-warm">
          {trust.proofHeadline}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {completeCases.map((c) => (
            <article key={`${c.condition}-${c.timeframe}`} className="card-nr overflow-hidden">
              <div className="grid grid-cols-2 gap-0.5">
                <Frame src={c.before} label="Before" />
                <Frame src={c.after} label="After" />
              </div>
              <div className="p-5">
                <h3 className="text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
                  {c.condition}
                </h3>
                <p className="mt-1.5 text-[11px] font-bold text-maroon">{c.timeframe}</p>
                {c.note ? (
                  <p className="mt-2 text-[13px] leading-relaxed text-stone-warm">{c.note}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-stone-warm">{trust.proofDisclaimer}</p>
      </div>
    </section>
  );
}
