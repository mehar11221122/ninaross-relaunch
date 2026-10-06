import { ArrowRight } from "lucide-react";
import { EditableImage } from "@/components/site/EditableImage";
import { BookCta } from "@/components/trust/BookCta";

const scalpImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/scalp-treatment-shampoo-bowl-nina-ross-atlanta.png";
const ivImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/scalp-device-crown-treatment-closeup-nina-ross-atlanta.png";
const redlightImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/hair-serum-dropper-closeup-nina-ross-atlanta.png";

const THERAPIES = [
  {
    slot: "therapy-scalp",
    img: scalpImg,
    alt: "In-clinic scalp therapy",
    title: "In-Clinic Scalp Therapy",
    text: "The foundation. Targeted topical and procedural care for the scalp environment — chosen for your condition, never off a menu.",
  },
  {
    slot: "therapy-iv",
    img: ivImg,
    alt: "IV therapy support",
    title: "IV Therapy",
    text: "Internal support, guided by labs. May be incorporated when your results point to nutrient gaps that affect growth.",
  },
  {
    slot: "therapy-redlight",
    img: redlightImg,
    alt: "Red light therapy",
    title: "Red Light Therapy",
    text: "Light-based support for circulation and the follicle environment — integrated into the larger plan when appropriate.",
  },
];

export function Therapies() {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow eyebrow--maroon">In-Clinic Therapies.</p>
          <h2 className="headline mt-4 text-4xl sm:text-5xl">Scalp. IV. Red Light.</h2>
          <p className="mt-5 text-sm leading-relaxed text-stone-warm">
            Three pillars of in-clinic care. Your $99 Hair & Body Discovery determines which belong in your plan —
            never the other way around.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {THERAPIES.map((t) => (
            <article key={t.title} className="card-nr flex flex-col">
              <EditableImage slot={t.slot} src={t.img} alt={t.alt} className="h-48 w-full" />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
                  {t.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-stone-warm">{t.text}</p>
                <BookCta iconClassName="size-3" className="mt-6 flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-maroon uppercase transition-colors hover:text-ink" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
