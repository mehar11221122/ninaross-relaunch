/**
 * Blog index data shell.
 *
 * Only real, published posts belong in `blogPosts`. Do not invent titles,
 * dates, excerpts, authors, or read times to fill the grid. Articles still
 * waiting on migration live in `pendingPosts` and render as honest
 * "POST MIGRATION NEEDED" placeholders.
 *
 * `clinicallyReviewed` is true only where Dr. Nina Ross, ND actually
 * reviewed the clinical content of that article.
 */

export type BlogPost = {
  slug: string;
  title: string;
  category: string; // blog category slug
  excerpt: string;
  readTimeMinutes: number;
  authorId: string;
  clinicallyReviewed: boolean;
  /** ISO date. Omit when the real publication date is not confirmed. */
  publishedAt?: string;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hair-loss-and-potassium-deficiency",
    title: "Is Low Potassium Causing Your Hair Loss?",
    category: "hair-loss",
    excerpt:
      "Low potassium can let sodium build around follicles and block iron and zinc uptake, which can tip hair into diffuse shedding. Signs, food, and what to test.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2020-11-10",
  },
  {
    slug: "traction-alopecia-reversibility",
    title: "Can Traction Alopecia Be Reversed? When It's Too Late",
    category: "hair-loss",
    excerpt:
      "Early traction alopecia is often reversible. Advanced traction alopecia with follicular scarring is manageable and may not fully regrow. Here is how the stage is read at 200x.",

    readTimeMinutes: 7,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    featured: true,
  },
  {
    slug: "iron-deficiency-and-hair-loss",
    title: "Iron Deficiency and Hair Loss: Signs Your Shedding Is Internal",
    category: "health-wellness",
    excerpt:
      "Shedding that tracks with low iron often shows up in ferritin, not only hemoglobin. What to look for, and how we connect labs to the scalp.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    featured: true,
  },
  {
    slug: "hair-growth-hormones",
    title: "Which Hormone Makes Hair Grow? The Four That Matter",
    category: "health-wellness",
    excerpt:
      "Estrogen, thyroid, DHT, and cortisol each move the hair cycle differently. Here is which one is likely yours, and what we check next.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
  },
  {
    slug: "l-lysine-benefits-for-skin",
    title: "L-Lysine Benefits for Skin Before and After: What's Real",
    category: "health-wellness",
    excerpt:
      "L-lysine supports collagen and iron absorption, which matters for scalp and shedding. What is real, what is hype, and why testing beats guessing.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2024-02-04",
  },
  {
    slug: "amino-acids-for-hair-regrowth",
    title: "The Real Truth About Amino Acids for Hair Growth",
    category: "health-wellness",
    excerpt:
      "Seven amino acids behind keratin, blood flow, collagen, and stress pathways. Why more protein alone often fails, and how labs guide the plan.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2020-11-07",
  },
  {
    slug: "magnesium-for-hair-growth",
    title: "Is a Magnesium Deficiency Thinning Your Hair?",
    category: "health-wellness",
    excerpt:
      "Magnesium supports scalp blood flow and keratin building. Signs of low levels, why diet alone often falls short, and where functional testing fits.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2020-10-20",
  },
  {
    slug: "how-to-stop-alopecia-areata-from-spreading",
    title: "How to Stop Alopecia Areata From Spreading: What Works",
    category: "hair-loss",
    excerpt:
      "Smooth patches that keep appearing mean the immune attack is still active. What calms the flare, what only masks it, and how we read the scalp first.",
    readTimeMinutes: 8,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2023-04-27",
    featured: true,
  },
  {
    slug: "minoxidil-itchy-scalp",
    title: "That Minoxidil Itch? Why Your Scalp Hates It",
    category: "hair-loss",
    excerpt:
      "An itchy, red, flaky scalp after minoxidil is irritation, not progress. Why propylene glycol matters, and what to read before forcing growth.",
    readTimeMinutes: 7,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2024-03-18",
  },
  {
    slug: "hair-loss-epidemic-among-black-women",
    title: "The Hair Loss Crisis Every Black Woman Faces",
    category: "hair-loss",
    excerpt:
      "Thinning edges are not a styling failure. Traction alopecia, CCCA, and hormonal drivers, and why culturally competent care changes the outcome.",
    readTimeMinutes: 8,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2021-03-02",
  },
  {
    slug: "choosing-a-trichologist-near-me",
    title: "Choosing a Trichologist Near Me: What to Check First",
    category: "hair-loss",
    excerpt:
      "The top search result is not proof of expertise. What to write down before you search, what to look for on a site, the red flags, and the questions to ask on the phone.",
    readTimeMinutes: 7,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2024-01-19",
  },
  {
    slug: "trichologist-for-black-hair",
    title: "Why Finding the Right Trichologist Near Me Changes Everything",
    category: "hair-loss",
    excerpt:
      "Most trichology training barely covers Black hair. What a specialist actually sees, why generic treatments fail, and how to spot the right fit.",
    readTimeMinutes: 7,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2023-04-12",
    featured: true,
  },
  {
    slug: "oily-scalp-and-hair-loss",
    title: "Oily Scalp and Thinning Hair: How the Two Are Connected",
    category: "scalp-concerns",
    excerpt:
      "An oily, irritated scalp can push hair into shedding. Here is what links the two, and how we calm the scalp so growth can restart.",
    readTimeMinutes: 6,
    authorId: "nina-ross",
    clinicallyReviewed: true,
  },
  {
    slug: "stop-hair-loss-with-dht-blockers",
    title: "DHT Blockers for Hair Loss: The Real Truth",
    category: "hair-loss",
    excerpt:
      "DHT can miniaturize follicles, but it rarely works alone. When blockers help, when they do not, and what we check before you buy another one.",
    readTimeMinutes: 7,
    authorId: "nina-ross",
    clinicallyReviewed: true,
    publishedAt: "2020-11-10",
  },
];

/**
 * Priority articles queued for migration. No invented body content, dates,
 * or claims. Titles here are working titles for the migration queue only.
 */
export type PendingPost = {
  slug: string;
  workingTitle: string;
  category: string;
  priority: boolean;
};

export const pendingPosts: PendingPost[] = [
];

export function postsInCategory(slug: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === slug);
}

export function pendingInCategory(slug: string): PendingPost[] {
  return pendingPosts.filter((p) => p.category === slug);
}
