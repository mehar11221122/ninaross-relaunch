// Wraps the approved render.mjs (copied verbatim as nr-render.js) for use in the React route.
import { renderArticle } from "./nr-render.js";
import catalog from "@/content/posts/_catalog.json";
import { withBlogHeroes } from "@/lib/blog-hero";

const heroPotassium = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-checking-thinning-hair-mirror-nina-ross-atlanta.webp";
const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";
const trichoscopyTelogen = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291397/ninaross/lovable/blog-kit/telogen-shedding-200x-trichoscopy-nina-ross-atlanta.jpg";
const tractionHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291398/ninaross/lovable/blog-kit/trichologist-examining-hairline-magnifier-nina-ross-atlanta.webp";
const tractionMirror = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291399/ninaross/lovable/blog-kit/woman-checking-braided-hairline-mirror-nina-ross-atlanta.webp";
const tractionStages = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291392/ninaross/lovable/blog-kit/early-vs-advanced-traction-alopecia-follicle-nina-ross-atlanta.webp";
const minoxidilHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/minoxidil-bottle-scalp-irritation-nina-ross-atlanta.webp";
const alopeciaAreataHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291390/ninaross/lovable/blog-kit/alopecia-areata-patch-before-after-nina-ross-atlanta.webp";
const alopeciaCycleTracking = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/hair-loss-symptom-tracking-journal-nina-ross-atlanta.png";
const alopeciaWomanPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291401/ninaross/lovable/blog-kit/woman-natural-curls-portrait-nina-ross-atlanta.webp";
const crisisHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291390/ninaross/lovable/blog-kit/black-woman-thinning-edges-portrait-nina-ross-atlanta.webp";
const crisisConversation = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/black-women-talking-about-hair-loss-nina-ross-atlanta.png";
const crisisConsultation = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291390/ninaross/lovable/blog-kit/client-reviewing-scalp-analysis-screen-nina-ross-atlanta.webp";
const trichologistExam = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/client-scalp-exam-under-microscope-nina-ross-atlanta.webp";
const trichologistStrand = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291398/ninaross/lovable/blog-kit/trichologist-hair-strand-analysis-notes-nina-ross-atlanta.webp";
const trichologistFollicle = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291393/ninaross/lovable/blog-kit/hair-follicle-anatomy-illustration-nina-ross-atlanta.webp";
const dhtHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/dht-binding-hair-follicle-illustration-nina-ross-atlanta.webp";
const dhtBottle = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291392/ninaross/lovable/blog-kit/dht-blocker-supplement-bottle-nina-ross-atlanta.png";
const dhtMiniaturization = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291392/ninaross/lovable/blog-kit/dht-miniaturized-vs-healthy-follicle-nina-ross-atlanta.webp";
const ironFerritinDraw = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291393/ninaross/lovable/blog-kit/ferritin-blood-draw-iron-test-nina-ross-atlanta.webp";
const ironLevelsChart = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/iron-levels-hair-health-chart-nina-ross-atlanta.webp";
const ironSheddingHair = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-holding-shed-hair-at-sink-nina-ross-atlanta.webp";
const hormoneMedallions = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/hormones-affecting-hair-growth-icons-nina-ross-atlanta.webp";
const hormoneConsultation = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291402/ninaross/lovable/blog-kit/woman-reviewing-hormone-lab-results-nina-ross-atlanta.png";
const hairGrowthCycle = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291393/ninaross/lovable/blog-kit/hair-growth-cycle-hormones-infographic-nina-ross-atlanta.webp";
const lysineMoleculeHero = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291395/ninaross/lovable/blog-kit/l-lysine-molecule-hair-skin-collagen-nina-ross-atlanta.png";
const lysineSmoothieBowl = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/l-lysine-capsule-smoothie-bowl-nina-ross-atlanta.webp";
const lysineBenefitsChart = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291395/ninaross/lovable/blog-kit/l-lysine-skin-benefits-chart-nina-ross-atlanta.webp";
const aminoKeratinStrand = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291394/ninaross/lovable/blog-kit/keratin-amino-acids-hair-strand-nina-ross-atlanta.webp";
const aminoProteinMeal = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-eating-protein-rich-meal-nina-ross-atlanta.png";
const aminoFlowDiagram = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291397/ninaross/lovable/blog-kit/protein-to-amino-acids-hair-diagram-nina-ross-atlanta.webp";
const magnesiumDeficiencySigns = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291395/ninaross/lovable/blog-kit/magnesium-deficiency-signs-infographic-nina-ross-atlanta.webp";
const magnesiumBottle = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/magnesium-supplement-capsules-chocolate-nina-ross-atlanta.webp";
const magnesiumNight = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291399/ninaross/lovable/blog-kit/woman-awake-at-night-sleepless-nina-ross-atlanta.webp";
const oilySebumDiagram = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/normal-vs-excess-sebum-follicle-diagram-nina-ross-atlanta.png";
const oilyWashing = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291403/ninaross/lovable/blog-kit/woman-shampooing-oily-scalp-nina-ross-atlanta.webp";
const oilyMirror = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291400/ninaross/lovable/blog-kit/woman-checking-part-hand-mirror-nina-ross-atlanta.webp";
const trichologistBlackCompare = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291399/ninaross/lovable/blog-kit/what-a-trichologist-sees-scalp-comparison-nina-ross-atlanta.webp";
const trichologistBlackReview = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291391/ninaross/lovable/blog-kit/client-surprised-at-200x-scalp-view-nina-ross-atlanta.webp";
const trichologistBlackTools = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291398/ninaross/lovable/blog-kit/trichology-tools-microscope-flat-lay-nina-ross-atlanta.png";

const ASSETS: Record<string, string> = {
  "img/nina-portrait.webp": ninaPortrait,
  "img/hero-hair-loss-and-potassium-deficiency.webp": heroPotassium,
  "img/potassium-trichoscopy-telogen.jpg": trichoscopyTelogen,
  "img/traction-scalp-examination.png": tractionHero,
  "img/traction-mirror-check.png": tractionMirror,
  "img/traction-follicle-stages.png": tractionStages,
  "img/hero-minoxidil-itchy-scalp.png": minoxidilHero,
  "img/hero-alopecia-areata-spread.png": alopeciaAreataHero,
  "img/alopecia-cycle-tracking.png": alopeciaCycleTracking,
  "img/alopecia-woman-portrait.png": alopeciaWomanPortrait,
  "img/hero-hair-loss-crisis.png": crisisHero,
  "img/crisis-women-conversation.png": crisisConversation,
  "img/crisis-scalp-consultation.png": crisisConsultation,
  "img/trichologist-scalp-exam-200x.png": trichologistExam,
  "img/trichologist-strand-analysis.png": trichologistStrand,
  "img/trichologist-follicle-anatomy.png": trichologistFollicle,
  "img/hero-dht-blockers.png": dhtHero,
  "img/dht-blocker-bottle.png": dhtBottle,
  "img/dht-miniaturization.png": dhtMiniaturization,
  "img/iron-ferritin-draw.png": ironFerritinDraw,
  "img/iron-levels-chart.png": ironLevelsChart,
  "img/iron-shedding-hair.png": ironSheddingHair,
  "img/hormone-medallions.png": hormoneMedallions,
  "img/hormone-consultation.png": hormoneConsultation,
  "img/hair-growth-cycle.png": hairGrowthCycle,
  "img/lysine-molecule-hero.png": lysineMoleculeHero,
  "img/lysine-smoothie-bowl.png": lysineSmoothieBowl,
  "img/lysine-benefits-chart.png": lysineBenefitsChart,
  "img/amino-keratin-strand.png": aminoKeratinStrand,
  "img/amino-protein-meal.png": aminoProteinMeal,
  "img/amino-flow-diagram.png": aminoFlowDiagram,
  "img/magnesium-deficiency-signs.png": magnesiumDeficiencySigns,
  "img/magnesium-bottle.png": magnesiumBottle,
  "img/magnesium-night.png": magnesiumNight,
  "img/oily-sebum-follicle-diagram.png": oilySebumDiagram,
  "img/oily-scalp-washing.png": oilyWashing,
  "img/oily-thinning-mirror.png": oilyMirror,
  "img/trichologist-black-what-you-see.png": trichologistBlackCompare,
  "img/trichologist-black-200x-review.png": trichologistBlackReview,
  "img/trichologist-black-tools.png": trichologistBlackTools,
};

export function renderArticleParts(post: unknown) {
  let html: string = renderArticle(post, withBlogHeroes(catalog));
  for (const [from, to] of Object.entries(ASSETS)) html = html.split(from).join(to);
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("<script src=");
  const body = html.slice(bodyStart, bodyEnd);
  const heroPreload = html.match(/<link rel="preload" as="image" href="([^"]+)"/)?.[1];
  return { body, schema, heroPreload };
}
