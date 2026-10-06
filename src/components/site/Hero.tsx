import { ArrowRight, Crown, FlaskConical, Headphones, Heart, Lightbulb } from "lucide-react";
import { EditableImage } from "@/components/site/EditableImage";
import { BookCta } from "@/components/trust/BookCta";
import { trust } from "@/data/trust";

const heroImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/dr-nina-ross-nd-portrait-logo-scrubs-nina-ross-atlanta.png";

const TRUST_ITEMS = [
  { icon: Crown, label: "Double Board Certified Trichology" },
  { icon: Headphones, label: "Textured Hair Expertise" },
  { icon: FlaskConical, label: "Lab-Guided Support" },
  { icon: Lightbulb, label: "Red Light Therapy" },
  { icon: Heart, label: "Whole-Body Care" },
];

export function Hero() {
  return (
    <>
      <section id="top" className="hero-texture bg-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">Whole-Body Hair Restoration • Serving Metro Atlanta</p>
            <h1 className="headline mt-4 text-4xl text-cream sm:mt-6 sm:text-5xl lg:text-7xl">
              Hair Loss Has A Root Cause.
              <span className="mt-2 block text-gold">We Find It.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed font-bold text-cream sm:mt-7 sm:text-lg">
              Expert-led restoration for textured hair — built on evidence, not promises.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ash sm:mt-4">
              Every plan starts with {trust.offerName.toLowerCase()}: {trust.deliverables}. Then we
              treat the why, not just the symptoms.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 sm:mt-9">
              <BookCta className="btn btn-gold" />
              <a href="#results" className="btn btn-outline-light">
                See Real Results <ArrowRight className="size-3.5" />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-cream/10 pt-5 sm:mt-12 sm:pt-7">
              <span className="icon-ring size-12 shrink-0">
                <Crown className="size-5" />
              </span>
              <div>
                <p className="text-xs font-extrabold tracking-[0.14em] text-cream uppercase">
                  Led By Dr. Nina Ross
                </p>
                <p className="mt-1 text-xs text-ash">
                  Double Board Certified Trichologist • Holistic Health Practitioner
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <EditableImage
              slot="hero-portrait"
              src={heroImg}
              alt="Dr. Nina Ross, ND, PhD, Double Board Certified Trichologist"
              className="arch-img h-[300px] w-full sm:h-[420px] lg:h-[520px]"
              loading="eager"
            />
            <div className="absolute -top-4 right-2 flex size-28 flex-col items-center justify-center rounded-full border border-gold bg-ink/80 px-3 text-center backdrop-blur sm:-right-4">
              <span className="font-serif text-2xl text-gold">NR</span>
              <span className="mt-1 text-[6.5px] font-bold tracking-[0.18em] text-cream uppercase">
                Stronger Hair • Stronger You
              </span>
            </div>
            <div className="absolute -bottom-6 left-2 flex items-center gap-3 bg-card px-5 py-4 shadow-xl sm:-left-6">
              <Headphones className="size-6 shrink-0 text-maroon" />
              <p className="text-xs leading-snug">
                <span className="block font-extrabold tracking-[0.1em] text-ink uppercase">
                  We Treat The Why,
                </span>
                <span className="text-stone-warm">not just the symptoms.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-4 text-center">
              <span className="icon-ring size-14">
                <Icon className="size-5" />
              </span>
              <p className="max-w-[140px] text-[10px] font-extrabold tracking-[0.22em] text-ink uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
