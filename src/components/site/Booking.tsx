import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BookCta } from "@/components/trust/BookCta";
import { trust } from "@/data/trust";


const CONCERNS = [
  "Thinning at the crown",
  "Excessive shedding",
  "Bald spots or patches",
  "Edges / hairline loss",
  "Scalp irritation or inflammation",
  "Not sure — that's why I'm here",
];

const BULLETS = [
  "60-minute in-clinic appointment",
  "Scalp imaging included",
  "Findings + next steps. No pressure.",
];

const inputClass =
  "w-full border border-ink/15 bg-card px-4 py-3 text-sm text-ink placeholder:text-ash outline-none transition-colors focus:border-gold";

export function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", concern: CONCERNS[0]! });


  return (
    <section id="book" className="bg-maroon">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">This Isn't Just Care. This Is A Movement.</p>
            <h2 className="headline mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
              Book My $99
              <span className="block text-gold">Hair &amp; Body Discovery.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-cream/80">
              Get answers. Get a plan. Get your confidence back. {trust.offerSummary}
            </p>
            <ul className="mt-8 space-y-3.5">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-cream">
                  <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <form className="card-nr p-8 sm:p-10">
            <h3 className="text-lg font-black tracking-[0.04em] text-ink uppercase">
              Book My $99 Hair & Body Discovery.
            </h3>
            <div className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="bk-name"
                  className="mb-2 block text-[9px] font-extrabold tracking-[0.22em] text-ink uppercase"
                >
                  Full Name
                </label>
                <input
                  id="bk-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="bk-phone"
                    className="mb-2 block text-[9px] font-extrabold tracking-[0.22em] text-ink uppercase"
                  >
                    Phone
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(404) 000-0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="bk-email"
                    className="mb-2 block text-[9px] font-extrabold tracking-[0.22em] text-ink uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="bk-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="bk-concern"
                  className="mb-2 block text-[9px] font-extrabold tracking-[0.22em] text-ink uppercase"
                >
                  What Are You Noticing?
                </label>
                <select
                  id="bk-concern"
                  value={form.concern}
                  onChange={(e) => setForm({ ...form, concern: e.target.value })}
                  className={inputClass}
                >
                  {CONCERNS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <BookCta className="btn btn-gold w-full" />
              <p className="text-[11px] leading-relaxed text-stone-warm">{trust.guarantee}</p>
              <p className="text-[11px] leading-relaxed text-stone-warm">
                {trust.payment}. Prefer to talk?{" "}
                <a href={trust.nap.phoneHref} className="font-bold text-ink underline">
                  Call {trust.nap.phone}
                </a>
              </p>

            </div>
          </form>
        </div>

        <p className="mt-20 text-center text-[11px] text-cream/60">
          Individual results vary. Treatment plans are personalized after your $99 Hair & Body Discovery. Nina Ross Hair
          Therapy • Serving all of Metro Atlanta · Sandy Springs, GA
        </p>
      </div>
    </section>
  );
}
