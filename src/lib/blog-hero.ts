import { articlePosts } from "@/content/posts";

const potassiumHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-checking-thinning-hair-mirror-nina-ross-atlanta.webp";
const tractionHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291398/ninaross/lovable/blog-kit/trichologist-examining-hairline-magnifier-nina-ross-atlanta.webp";
const minoxidilHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/minoxidil-bottle-scalp-irritation-nina-ross-atlanta.webp";
const alopeciaAreataHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291390/ninaross/lovable/blog-kit/alopecia-areata-patch-before-after-nina-ross-atlanta.webp";
const crisisHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291390/ninaross/lovable/blog-kit/black-woman-thinning-edges-portrait-nina-ross-atlanta.webp";
const trichologistExamHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/client-scalp-exam-under-microscope-nina-ross-atlanta.webp";
const dhtHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/dht-binding-hair-follicle-illustration-nina-ross-atlanta.webp";
const ironHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291393/ninaross/lovable/blog-kit/ferritin-blood-draw-iron-test-nina-ross-atlanta.webp";
const hormoneHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/hormones-affecting-hair-growth-icons-nina-ross-atlanta.webp";
const lysineHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291395/ninaross/lovable/blog-kit/l-lysine-molecule-hair-skin-collagen-nina-ross-atlanta.png";
const aminoHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/keratin-amino-acids-hair-strand-nina-ross-atlanta.webp";
const magnesiumHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/magnesium-supplement-capsules-chocolate-nina-ross-atlanta.webp";
const oilySebumHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/normal-vs-excess-sebum-follicle-diagram-nina-ross-atlanta.png";
const trichologistBlackHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/client-surprised-at-200x-scalp-view-nina-ross-atlanta.webp";

const resolvedHeroSources: Record<string, string> = {
  "img/hero-hair-loss-and-potassium-deficiency.webp": potassiumHero,
  "img/traction-scalp-examination.png": tractionHero,
  "img/hero-minoxidil-itchy-scalp.png": minoxidilHero,
  "img/hero-alopecia-areata-spread.png": alopeciaAreataHero,
  "img/hero-hair-loss-crisis.png": crisisHero,
  "img/trichologist-scalp-exam-200x.png": trichologistExamHero,
  "img/hero-dht-blockers.png": dhtHero,
  "img/iron-ferritin-draw.png": ironHero,
  "img/hormone-medallions.png": hormoneHero,
  "img/lysine-molecule-hero.png": lysineHero,
  "img/amino-keratin-strand.png": aminoHero,
  "img/magnesium-bottle.png": magnesiumHero,
  "img/oily-sebum-follicle-diagram.png": oilySebumHero,
  "img/trichologist-black-200x-review.png": trichologistBlackHero,
};

export type BlogHero = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function getBlogHero(slug: string): BlogHero | undefined {
  const hero = articlePosts[slug]?.hero;
  if (!hero?.src) return undefined;
  return {
    src: resolvedHeroSources[hero.src] ?? hero.src,
    alt: hero.alt,
    width: hero.width,
    height: hero.height,
  };
}

export function withBlogHeroes<T extends { slug: string }>(posts: T[]) {
  return posts.map((post) => ({ ...post, hero: getBlogHero(post.slug) }));
}