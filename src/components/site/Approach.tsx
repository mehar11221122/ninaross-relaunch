import { ArrowRight, Droplets, FlaskConical, Headphones, Lightbulb } from "lucide-react";
import { BookCta } from "@/components/trust/BookCta";

const STEPS = [
  {
    num: "01",
    icon: Headphones,
    title: "Treat The Scalp",
    text: "Targeted in-clinic care — may include growth factors, microneedling and laser-based therapies, selected for your scalp condition.",
  },
  {
    num: "02",
    icon: FlaskConical,
    title: "Investigate The Body",
    text: "Hair doesn't grow in isolation. Health history, scalp findings and, when appropriate, labs that uncover internal contributors.",
  },
  {
    num: "03",
    icon: Droplets,
    title: "Support From Within",
    text: "Lab-guided nutrient support and IV Therapy, incorporated when they fit your individualized plan.",
  },
  {
    num: "04",
    icon: Lightbulb,
    title: "Support The Follicle Environment",
    text: "Red Light and infrared therapies integrated into the larger plan to support circulation and the scalp environment.",
  },
];

export function Approach() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="card-nr grid gap-12 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
          <div>
            <p className="eyebrow eyebrow--maroon">The Whole-Body Approach.</p>
            <h2 className="headline mt-4 text-3xl sm:text-4xl">
              We Treat The Why. Not Just The Symptoms.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-stone-warm">
              Hair doesn't grow in isolation — so we never treat it in isolation. Four disciplines,
              combined per your findings.
            </p>
            <BookCta className="btn btn-outline-dark mt-8" />
          </div>

          <div>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={
                  "flex items-start gap-6 py-6 " + (i > 0 ? "border-t border-line" : "pt-0")
                }
              >
                <span className="text-4xl font-black text-line select-none">{step.num}</span>
                <span className="icon-ring mt-1 size-11 shrink-0">
                  <step.icon className="size-4" />
                </span>
                <div>
                  <h3 className="text-xs font-extrabold tracking-[0.14em] text-ink uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-stone-warm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
