import { Check, Star } from "lucide-react";
import { verifiedTestimonials } from "@/data/trust";
import { EditableImage } from "@/components/site/EditableImage";

const client1 = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291427/ninaross/lovable/smiling-woman-natural-curls-portrait-nina-ross-atlanta.png";
const clientsGroup = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291428/ninaross/lovable/three-black-women-smiling-together-nina-ross-atlanta.png";
const client3 = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/smiling-woman-full-curls-after-nina-ross-atlanta.png";

const MARQUEE_QUOTES = verifiedTestimonials.slice(0, 2).map((review) => ({
  quote: review.quote,
  name: review.name,
  place: review.place ?? "Metro Atlanta",
}));

const PHOTOS = [
  { slot: "review-photo-1", src: client1, alt: "Nina Ross client smiling" },
  { slot: "review-photo-2", src: clientsGroup, alt: "Clients of Nina Ross Hair Therapy" },
  { slot: "review-photo-3", src: client3, alt: "Nina Ross client after treatment" },
];

const GRID_REVIEWS = verifiedTestimonials;

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </div>
  );
}

function QuoteCard({ quote, name, place }: { quote: string; name: string; place: string }) {
  return (
    <div className="card-nr flex w-[300px] shrink-0 flex-col justify-between p-7 sm:w-[340px]">
      <div>
        <Stars />
        <p className="mt-4 font-serif text-sm leading-relaxed text-ink italic">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <p className="mt-6 flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-ink uppercase">
        <span className="icon-ring size-5">
          <Check className="size-3" />
        </span>
        {name} <span className="font-semibold text-stone-warm normal-case">· {place}</span>
      </p>
    </div>
  );
}

type MarqueeItem =
  | { type: "photo"; data: { slot: string; src: string; alt: string } }
  | { type: "quote"; data: { quote: string; name: string; place: string } };

export function Reviews() {
  // Interleave photos and quote cards, duplicated for a seamless loop
  const sequence: MarqueeItem[] = [
    { type: "photo", data: PHOTOS[0]! },
    { type: "quote", data: MARQUEE_QUOTES[0]! },
    { type: "photo", data: PHOTOS[1]! },
    { type: "quote", data: MARQUEE_QUOTES[1]! },
    { type: "photo", data: PHOTOS[2]! },
  ];
  const loop = [...sequence, ...sequence];

  return (
    <section className="overflow-hidden bg-card">
      <div className="mx-auto max-w-6xl px-5 pt-20 lg:px-8 lg:pt-28">
        <div className="text-center">
          <div className="flex justify-center">
            <Stars />
          </div>
          <p className="mt-4 text-[10px] font-extrabold tracking-[0.3em] text-ink uppercase">
            Verified Client Reviews
          </p>
          <h2 className="headline mt-4 text-4xl sm:text-5xl">
            Happy Graduates
            <span className="block">Of Our Program.</span>
          </h2>
        </div>
      </div>

      <div className="mt-14 overflow-hidden">
        <div className="marquee-track items-stretch gap-5 pr-5">
          {loop.map((item, i) =>
            item.type === "photo" ? (
              <div key={i} className="card-nr w-[200px] shrink-0 overflow-hidden sm:w-[240px]">
                <EditableImage
                  slot={item.data.slot}
                  src={item.data.src}
                  alt={item.data.alt}
                  className="h-full min-h-[260px] w-full"
                />
              </div>
            ) : (
              <QuoteCard
                key={i}
                quote={item.data.quote}
                name={item.data.name}
                place={item.data.place}
              />
            ),
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 lg:px-8 lg:pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GRID_REVIEWS.map((r) => (
            <div key={r.name} className="card-nr flex flex-col p-6">
              <Stars />
              <p className="mt-4 flex-1 font-serif text-[13px] leading-relaxed text-ink italic">
                {r.quote}
              </p>
              <p className="mt-5 text-[10px] font-extrabold tracking-[0.22em] text-ink uppercase">
                {r.name}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-[11px] text-stone-warm">Reviews shared with client permission. Individual results vary.</p>
      </div>
    </section>
  );
}
