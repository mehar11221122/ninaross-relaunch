import { ArrowRight } from "lucide-react";
import { BookCta } from "@/components/trust/BookCta";
import { trust } from "@/data/trust";

const CONDITIONS = [
  { title: "CCCA", text: "Central centrifugal cicatricial alopecia" },
  { title: "Traction Alopecia", text: "Loss associated with repeated tension" },
  { title: "Alopecia Areata", text: "Patchy autoimmune-related loss" },
  { title: "LPP / FFA", text: "Inflammatory and scarring forms of loss" },
  { title: "Telogen Effluvium", text: "Diffuse shedding and cycle disruption" },
  { title: "Hormonal Hair Loss", text: "Changes associated with hormone shifts" },
  { title: "Folliculitis", text: "Scalp inflammation around the follicles" },
];

export function Conditions() {
  return (
    <section id="conditions" className="bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow--maroon">Conditions We Treat.</p>
            <h2 className="headline mt-4 text-4xl sm:text-5xl">Name It. Then Treat It.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-warm">
            Not sure what you're seeing? That's exactly what the $99 Hair & Body Discovery is for.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONDITIONS.map((c) => (
            <div
              key={c.title}
              className="border border-ink/10 bg-card p-6 transition-colors hover:border-gold"
            >
              <h3 className="text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
                {c.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-stone-warm">{c.text}</p>
            </div>
          ))}
          <BookCta className="group block bg-ink p-6 transition-colors hover:bg-maroon-deep">
            <h3 className="text-xs font-extrabold tracking-[0.12em] text-cream uppercase">
              Thinning + Shedding
            </h3>
            <p className="mt-2.5 flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] text-gold uppercase">
              {trust.ctaLabel}{" "}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </p>
          </BookCta>
        </div>
      </div>
    </section>
  );
}
