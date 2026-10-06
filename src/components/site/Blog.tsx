import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditableImage } from "@/components/site/EditableImage";

const consultImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291422/ninaross/lovable/consultation-notes-with-client-nina-ross-atlanta.png";
const scalpImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/scalp-treatment-shampoo-bowl-nina-ross-atlanta.png";
const clinicImg = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291403/ninaross/lovable/clinic-lounge-nr-logo-wall-nina-ross-atlanta.png";

type Category = "hair-loss" | "scalp-health" | "health-wellness";

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "hair-loss", label: "Hair Loss" },
  { id: "scalp-health", label: "Scalp Health" },
  { id: "health-wellness", label: "Health & Wellness" },
  { id: "all", label: "Read All" },
];

const POSTS: {
  slot: string;
  title: string;
  text: string;
  img: string;
  alt: string;
  categories: Category[];
  dark?: boolean;
}[] = [
  {
    slot: "blog-specialist",
    title: "Top Tips To Find The Best Hair Loss Specialist",
    text: "Insider tips for finding trusted specialists who diagnose and treat hair loss effectively.",
    img: consultImg,
    alt: "Dr. Nina Ross consulting a client",
    categories: ["hair-loss"],
  },
  {
    slot: "blog-iodine",
    title: "Know About Iodine + Hair Loss Conditions",
    text: "How iodine and thyroid health connect to shedding — and what to get checked.",
    img: scalpImg,
    alt: "In-clinic scalp therapy session",
    categories: ["scalp-health", "health-wellness"],
  },
  {
    slot: "blog-atlanta",
    title: "Best Atlanta Hair Doctor For Your Hair Health",
    text: "Holistic, science-backed care from Atlanta's authority on textured hair restoration.",
    img: clinicImg,
    alt: "Nina Ross clinic in Atlanta",
    categories: ["hair-loss", "health-wellness"],
    dark: true,
  },
];

export function Blog() {
  const [filter, setFilter] = useState<Category | "all">("hair-loss");
  const visible = POSTS.filter(
    (p) => filter === "all" || p.categories.includes(filter),
  );

  return (
    <section id="blog" className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow--maroon">From The Blog.</p>
            <h2 className="headline mt-4 text-4xl sm:text-5xl">Recent Posts.</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[9px] font-extrabold tracking-[0.2em] uppercase transition-colors",
                  filter === f.id
                    ? "border-ink bg-ink text-gold"
                    : "border-ink/25 text-ink hover:border-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {visible.map((post) =>
            post.dark ? (
              <article key={post.title} className="flex flex-col bg-ink">
                <div className="p-7">
                  <h3 className="text-sm leading-snug font-extrabold tracking-[0.06em] text-cream uppercase">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ash">{post.text}</p>
                  <a
                    href="#blog"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-gold uppercase"
                  >
                    Read Blogs <ArrowRight className="size-3" />
                  </a>
                </div>
                <EditableImage
                  slot={post.slot}
                  src={post.img}
                  alt={post.alt}
                  className="mt-auto h-44 w-full"
                />
              </article>
            ) : (
              <article key={post.title} className="card-nr flex flex-col">
                <EditableImage
                  slot={post.slot}
                  src={post.img}
                  alt={post.alt}
                  className="h-48 w-full"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-sm leading-snug font-extrabold tracking-[0.06em] text-ink uppercase">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-stone-warm">
                    {post.text}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[9px] font-extrabold tracking-[0.2em] text-ink uppercase">
                      <span className="flex size-5 items-center justify-center rounded-full bg-gold text-[9px] font-black text-ink">
                        N
                      </span>
                      Ninaross
                    </p>
                    <a
                      href="#blog"
                      className="flex items-center gap-1.5 text-[9px] font-extrabold tracking-[0.2em] text-maroon uppercase transition-colors hover:text-ink"
                    >
                      Read <ArrowRight className="size-3" />
                    </a>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
