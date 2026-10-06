import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

const FAQS = [
  {
    q: "Is restoration possible for my type of hair loss?",
    a: "It depends on diagnosis and follicle viability — which is exactly what the $99 Hair & Body Discovery determines. We'll tell you honestly what's realistic before you commit to anything.",
  },
  {
    q: `What happens at ${trust.offerName.toLowerCase().startsWith("the") ? trust.offerName.slice(4) : trust.offerName}?`,
    a: `${trust.offerSummary} We walk your history and shedding pattern with you, show you what we see, and the report lands in your inbox the next day. ${trust.guarantee} ${trust.payment}.`,
  },

  {
    q: "What does a program cost?",
    a: "Programs are personalized after your $99 Hair & Body Discovery, so cost depends on what your plan includes. You'll see full pricing at your plan review — before you commit.",
  },
  {
    q: "Do you treat men?",
    a: "Yes. Black folks and textured hair are the center of our expertise — and men are welcome. Many of our clients are men.",
  },
  {
    q: "How long until I see change?",
    a: "Outcomes vary with diagnosis, severity and consistency. We track progress with standardized photos so you can see what's changing over time.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">Questions, Answered.</p>
          <h2 className="headline mt-4 text-4xl text-cream sm:text-5xl">
            Honest Answers Before You Commit.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">
            You deserve clarity before you spend a dollar. Here's what most people want to know
            first.
          </p>
        </div>

        <div>
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-t border-cream/10 last:border-b">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-cream">{faq.q}</span>
                  <span className="shrink-0 text-gold">
                    {open ? <X className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pr-10 text-sm leading-relaxed text-ash">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
