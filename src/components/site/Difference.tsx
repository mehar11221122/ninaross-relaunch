import { ArrowRight } from "lucide-react";
import { BookCta } from "@/components/trust/BookCta";

const COLUMNS = [
  {
    title: "Regenerative",
    items: ["PRP", "Exosomes", "Growth Factors", "Microneedling"],
  },
  {
    title: "Scalp + Follicle",
    items: ["Advanced Topicals", "Red Light Therapy", "Laser Therapy", "Scalp Treatments"],
  },
  {
    title: "Whole-Body",
    items: ["Functional Medicine", "Advanced Lab Testing", "IV Therapy", "Nutrient Restoration"],
  },
  {
    title: "Hormonal",
    items: ["Hormone Testing", "Hormone Restoration", "Menopause Support", "Metabolic Health"],
  },
];

export function Difference() {
  return (
    <section id="services" className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow--maroon">The Nina Ross Difference.</p>
          <h2 className="headline mt-4 text-4xl sm:text-5xl">We Don't Treat Hair Loss One Way.</h2>
          <p className="mt-6 text-sm leading-relaxed font-bold text-ink">
            Hair loss can involve the follicle, the scalp, hormones, inflammation, nutrient status
            and overall health. That's why your options here go far beyond a single treatment.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-warm">
            We bring advanced hair restoration, regenerative therapies and whole-body medicine
            together in one personalized plan.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title} className="card-nr border-t-2 border-t-gold p-7">
              <h3 className="text-[10px] font-extrabold tracking-[0.28em] text-maroon uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.items.map((item) => (
                  <li key={item} className="text-[13px] font-bold text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-gold px-8 py-5">
          <p className="text-xs font-extrabold tracking-[0.14em] text-ink uppercase">
            More Tools. More Options. One Plan Built Around You.
          </p>
          <BookCta className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] text-ink uppercase transition-colors hover:text-maroon-deep" />
        </div>
      </div>
    </section>
  );
}
