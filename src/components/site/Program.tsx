import { ArrowRight, BarChart3, Droplets, Headphones, Search } from "lucide-react";
import { BookCta } from "@/components/trust/BookCta";

const PHASES = [
  {
    icon: Search,
    title: "Diagnose",
    text: "Scalp imaging, pattern review, health history — deeper investigation when needed.",
  },
  {
    icon: Headphones,
    title: "Treat",
    text: "A personalized combination of in-clinic scalp therapies for your condition and goals.",
  },
  {
    icon: Droplets,
    title: "Restore",
    text: "Whole-body support: lab-guided nutrients, IV Therapy, home care and lifestyle guidance.",
  },
  {
    icon: BarChart3,
    title: "Track",
    text: "Standardized photos and progress metrics so change can be seen — and plans adjusted.",
  },
];

export function Program() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">The Restorative Therapy Program.</p>
            <h2 className="headline mt-4 text-4xl text-cream sm:text-5xl">
              One Program.
              <span className="block">Four Phases.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ash">
            Built after your $99 Hair & Body Discovery. Reviewed by Dr. Ross. Adjusted as your hair responds.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-gold/25 lg:block" />
          {PHASES.map((phase) => (
            <div key={phase.title} className="relative">
              <span className="icon-ring relative z-10 size-12 bg-ink">
                <phase.icon className="size-4.5" />
              </span>
              <h3 className="mt-6 text-xs font-extrabold tracking-[0.18em] text-cream uppercase">
                {phase.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ash">{phase.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-cream/10 pt-8">
          <p className="text-sm text-ash">
            Every program is different, because every diagnosis is different.
          </p>
          <BookCta className="btn btn-outline-light" />
        </div>
      </div>
    </section>
  );
}
