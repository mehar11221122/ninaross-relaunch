import { ArrowRight } from "lucide-react";
import { EditableImage } from "@/components/site/EditableImage";
import { BookCta } from "@/components/trust/BookCta";

const consultImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291422/ninaross/lovable/consultation-notes-with-client-nina-ross-atlanta.png";

const CREDENTIALS = [
  { num: "01", label: "Double Board Certified Trichologist" },
  { num: "02", label: "Holistic Health Practitioner" },
  { num: "03", label: "Master Cosmetologist" },
];

export function About() {
  return (
    <section id="about" className="bg-cream-deep">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <EditableImage
            slot="about-portrait"
            src={consultImg}
            alt="Dr. Nina Ross in consultation"
            className="arch-img h-[420px] w-full lg:h-[500px]"
          />
          <div className="absolute -bottom-6 right-4 max-w-[220px] bg-card px-5 py-4 shadow-xl sm:right-8">
            <p className="text-xs leading-snug">
              <span className="block font-extrabold tracking-[0.1em] text-ink uppercase">
                Every Plan Is Reviewed
              </span>
              <span className="text-stone-warm">by Dr. Ross personally.</span>
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow eyebrow--maroon">Meet Your Trichologist.</p>
          <h2 className="headline mt-4 text-4xl sm:text-5xl">Dr. Nina Ross.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-stone-warm">
            Dr. Ross built this practice on a conviction: textured hair deserves expert care, and
            hair loss deserves a real investigation. Her team treats the scalp, studies the body
            and builds every plan around findings — not trends.
          </p>
          <div className="mt-8 max-w-md">
            {CREDENTIALS.map((c) => (
              <div
                key={c.num}
                className="flex items-center gap-5 border-t border-ink/10 py-4 last:border-b"
              >
                <span className="text-xs font-extrabold text-gold">{c.num}</span>
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink uppercase">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
          <BookCta className="btn btn-outline-dark mt-9" />
        </div>
      </div>
    </section>
  );
}
