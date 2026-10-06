import { trust } from "@/data/trust";

const STEPS = [
  {
    num: "01",
    title: trust.offerName,
    text: `${trust.durationMinutes} minutes in clinic. ${trust.deliverables}. Honest findings, and whether we can help.`,
  },
  {
    num: "02",
    title: "Your Plan Review",
    text: "A personalized program built from your findings — what, why, cost and timeline, walked through together.",
  },
  {
    num: "03",
    title: "Care + Tracking",
    text: "In-clinic visits, home care and standardized progress photos. We adjust as your hair responds.",
  },
];

export function Steps() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="eyebrow eyebrow--maroon">What To Expect.</p>
          <h2 className="headline mt-4 text-4xl sm:text-5xl">From First Visit To Follow-Through.</h2>
        </div>

        <div className="relative mt-16 grid gap-12 sm:grid-cols-3">
          <div className="absolute top-6 right-[18%] left-[18%] hidden h-px bg-line sm:block" />
          {STEPS.map((step) => (
            <div key={step.num} className="relative text-center">
              <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-gold bg-card text-xs font-extrabold text-ink">
                {step.num}
              </span>
              <h3 className="mt-6 text-xs font-extrabold tracking-[0.18em] text-ink uppercase">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[280px] text-[13px] leading-relaxed text-stone-warm">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
