import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditableImage } from "@/components/site/EditableImage";
import { BookCta } from "@/components/trust/BookCta";

const postBefore = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/curly-hair-back-view-before-nina-ross-atlanta.png";
const postAfter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/long-curly-hair-back-view-after-nina-ross-atlanta.png";
const hormBefore = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/microneedling-pen-scalp-part-closeup-nina-ross-atlanta.png";
const hormAfter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/smiling-woman-full-curls-after-nina-ross-atlanta.png";
const tracBefore = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291437/ninaross/lovable/woman-with-thinning-part-curls-nina-ross-atlanta.png";
const tracAfter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291427/ninaross/lovable/smiling-woman-full-curls-portrait-nina-ross-atlanta.png";
const maleBefore = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/scalp-device-crown-treatment-closeup-nina-ross-atlanta.png";
const maleAfter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/man-with-full-short-hair-nina-ross-atlanta.png";

const RESULTS = [
  {
    slug: "postpartum",
    weeks: 32,
    quote: "Lost confidence after childbirth — Nina Ross restored fullness beautifully.",
    tag: "Postpartum Hair Loss",
    before: postBefore,
    after: postAfter,
  },
  {
    slug: "hormonal",
    weeks: 45,
    quote: "Perimenopause thinning reversed — my scalp feels nourished and strong.",
    tag: "Hormonal Hair Thinning",
    before: hormBefore,
    after: hormAfter,
  },
  {
    slug: "traction",
    weeks: 28,
    quote: "Years of tight braids caused bald spots. Treatment regrew my hair.",
    tag: "Traction Alopecia",
    before: tracBefore,
    after: tracAfter,
  },
  {
    slug: "male",
    weeks: 52,
    quote: "Visible regrowth with a personalized, whole-body plan.",
    tag: "Male Pattern Hair Loss",
    before: maleBefore,
    after: maleAfter,
  },
  {
    slug: "areata",
    weeks: 26,
    quote: "A smooth bald patch filled in completely — I finally feel like myself again.",
    tag: "Alopecia Areata",
    before: postBefore,
    after: postAfter,
  },
  {
    slug: "telogen",
    weeks: 24,
    quote: "Stress shedding stopped and my density came back fuller than before.",
    tag: "Stress-Related Shedding",
    before: hormBefore,
    after: hormAfter,
  },
  {
    slug: "pattern",
    weeks: 40,
    quote: "My widening part narrowed month by month — the photos don't lie.",
    tag: "Female Pattern Thinning",
    before: tracBefore,
    after: tracAfter,
  },
  {
    slug: "edges",
    weeks: 20,
    quote: "My edges grew back strong without giving up the styles I love.",
    tag: "Edges Restoration",
    before: maleBefore,
    after: maleAfter,
  },
  {
    slug: "menopause",
    weeks: 48,
    quote: "Menopause took my volume — Nina Ross gave it back, stronger.",
    tag: "Menopause Thinning",
    before: postBefore,
    after: postAfter,
  },
  {
    slug: "crown",
    weeks: 44,
    quote: "The crown spot I'd been hiding is completely covered now.",
    tag: "Crown Thinning",
    before: maleBefore,
    after: maleAfter,
  },
  {
    slug: "thyroid",
    weeks: 36,
    quote: "Once we treated the root cause, my hair finally started responding.",
    tag: "Thyroid-Related Loss",
    before: hormBefore,
    after: hormAfter,
  },
  {
    slug: "iron",
    weeks: 30,
    quote: "Fixing my ferritin levels stopped the shedding in its tracks.",
    tag: "Iron-Deficiency Shedding",
    before: tracBefore,
    after: tracAfter,
  },
  {
    slug: "chemo",
    weeks: 56,
    quote: "After treatment, my hair came back fuller than I dared hope.",
    tag: "Post-Treatment Regrowth",
    before: hormBefore,
    after: hormAfter,
  },
  {
    slug: "pcos",
    weeks: 42,
    quote: "Treating the hormonal root cause changed everything for my hair.",
    tag: "PCOS-Related Thinning",
    before: postBefore,
    after: postAfter,
  },
  {
    slug: "age",
    weeks: 38,
    quote: "My volume came back — I look like myself in photos again.",
    tag: "Age-Related Volume Loss",
    before: maleBefore,
    after: maleAfter,
  },
  {
    slug: "autoimmune",
    weeks: 46,
    quote: "With the inflammation under control, the regrowth finally stuck.",
    tag: "Autoimmune-Related Loss",
    before: tracBefore,
    after: tracAfter,
  },
  {
    slug: "trich",
    weeks: 34,
    quote: "The patches I hid for years have completely filled in.",
    tag: "Trichotillomania Recovery",
    before: hormBefore,
    after: hormAfter,
  },
];

export function Results() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, RESULTS.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const first = track.children[0] as HTMLElement;
    const step = first.offsetWidth + 20;
    setActive(Math.min(RESULTS.length - 1, Math.round(track.scrollLeft / step)));
  };

  return (
    <section id="results" className="bg-cream-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow--maroon">Real People. Real Results.</p>
            <h2 className="headline mt-4 text-4xl sm:text-5xl">Proof Before Promises.</h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous result"
              onClick={() => scrollToCard(active - 1)}
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next result"
              onClick={() => scrollToCard(active + 1)}
              className="flex size-12 items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-maroon-deep"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {RESULTS.map((r, i) => (
            <article
              key={r.tag}
              className="card-nr w-[82%] max-w-[340px] shrink-0 snap-start sm:w-[340px]"
            >
              <div className="grid grid-cols-2 gap-0.5">
                <figure className="relative m-0">
                  <EditableImage
                    slot={`result-${r.slug}-before`}
                    src={r.before}
                    alt={`Before — ${r.tag}`}
                    loading={i < 4 ? "eager" : "lazy"}
                    className="h-44 w-full"
                  />
                  <span className="ba-pill">Before</span>
                </figure>
                <figure className="relative m-0">
                  <EditableImage
                    slot={`result-${r.slug}-after`}
                    src={r.after}
                    alt={`After — ${r.tag}`}
                    loading={i < 4 ? "eager" : "lazy"}
                    className="h-44 w-full"
                  />
                  <span className="ba-pill">After</span>
                </figure>
              </div>
              <div className="p-6">
                <p className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-ink">{r.weeks}</span>
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-stone-warm uppercase">
                    Weeks
                  </span>
                </p>
                <p className="mt-3 min-h-12 text-sm leading-relaxed font-bold text-ink">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <span className="mt-5 inline-block rounded-full border border-ink/20 px-4 py-1.5 text-[9px] font-extrabold tracking-[0.18em] text-ink uppercase">
                  {r.tag}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {RESULTS.map((r, i) => (
            <button
              key={r.tag}
              type="button"
              aria-label={`Go to result ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={cn(
                "h-1 w-6 transition-colors",
                i === active ? "bg-ink" : "bg-line",
              )}
            />
          ))}
        </div>

        <div className="card-nr mt-12 flex flex-wrap items-center justify-between gap-6 px-8 py-6">
          <p className="text-sm">
            <span className="font-extrabold tracking-[0.08em] text-ink uppercase">
              Wondering If Your Hair Could Respond?{" "}
            </span>
            <span className="text-stone-warm">The $99 Hair & Body Discovery answers that first.</span>
          </p>
          <BookCta className="btn btn-outline-gold" />
        </div>

        <p className="mt-6 text-[11px] text-stone-warm">
          Individual results vary. Photos shared with client consent; timeframes shown are sample
          data for this mockup.
        </p>
      </div>
    </section>
  );
}
