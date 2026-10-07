import { blogCategories } from "@/data/blog-categories";
import { blogPosts } from "@/data/blog-posts";
import { credentials, ctas, nap, offer, trust } from "@/data/trust";
import { getBlogHero } from "@/lib/blog-hero";

const ninaPortrait =
  "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";

const categoryNames = Object.fromEntries(blogCategories.map((c) => [c.slug, c.title]));
const featured = blogPosts.find((p) => p.slug === "traction-alopecia-reversibility") ?? blogPosts[0];
const remaining = featured ? blogPosts.filter((p) => p.slug !== featured.slug) : blogPosts;
const firstPosts = remaining.slice(0, 6);
const lastPosts = remaining.slice(6);

const shortAnswers = [
  { title: "What 200x actually shows", slug: "traction-alopecia-reversibility", marker: "200x" },
  { title: "Is my shedding normal?", slug: "iron-deficiency-and-hair-loss", marker: "01" },
  { title: "Edges: when to worry", slug: "traction-alopecia-reversibility", marker: "02" },
  { title: "The minoxidil itch", slug: "minoxidil-itchy-scalp", marker: "03" },
  { title: "DHT in plain language", slug: "stop-hair-loss-with-dht-blockers", marker: "04" },
  { title: "Oily scalp, thin hair", slug: "oily-scalp-and-hair-loss", marker: "05" },
];

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function postCard(slug: string, title: string, category: string, excerpt: string, readTime: number, reviewed: boolean): string {
  const hero = getBlogHero(slug);
  const art = hero
    ? `<span class="blog-card-art"><img src="${hero.src}" alt="${esc(hero.alt)}" width="${hero.width}" height="${hero.height}" loading="lazy" decoding="async" /></span>`
    : `<span class="blog-card-art blog-card-art--${esc(category)}" aria-hidden="true"><span>${category === "health-wellness" ? "ROOT" : category === "scalp-concerns" ? "SCALP" : "200x"}</span><i></i></span>`;
  return `<a href="/blog/${esc(slug)}" class="blog-post-card">${art}<span class="blog-card-copy"><span class="blog-category">${esc(categoryNames[category] ?? category)}</span><h3>${esc(title)}</h3><p>${esc(excerpt)}</p><span class="blog-meta"><span>${readTime} min read</span>${reviewed ? "<span>Clinically reviewed</span>" : ""}</span></span></a>`;
}

/** Blog index body markup matching BlogIndexDesign structure. */
export function renderBlogIndexBody(): string {
  if (!featured) return "";
  const featuredHero = getBlogHero(featured.slug);
  const tabs = [
    `<a href="/blog" aria-current="page">All <small>${blogPosts.length}</small></a>`,
    ...blogCategories
      .filter((c) => blogPosts.some((p) => p.category === c.slug))
      .map((c) => {
        const count = blogPosts.filter((p) => p.category === c.slug).length;
        return `<a href="/blog/${esc(c.slug)}">${esc(c.title)} <small>${count}</small></a>`;
      }),
  ].join("");

  const featuredImg = featuredHero
    ? `<img src="${featuredHero.src}" alt="${esc(featuredHero.alt)}" width="${featuredHero.width}" height="${featuredHero.height}" fetchpriority="high" />`
    : "";

  const answers = shortAnswers
    .map((item) => {
      const hero = getBlogHero(item.slug);
      const poster = hero
        ? `<img src="${hero.src}" alt="${esc(hero.alt)}" width="${hero.width}" height="${hero.height}" loading="lazy" decoding="async" />`
        : `<b>${esc(item.marker)}</b><i></i>`;
      return `<a href="/blog/${esc(item.slug)}" class="blog-answer-card"><span class="blog-answer-poster">${poster}</span><strong>${esc(item.title)}</strong><span>Read the answer →</span></a>`;
    })
    .join("");

  const pills = offer.pills.map((p) => `<span>${esc(p)}</span>`).join("");
  const includes = offer.includes.map((item) => `<li><span>✓</span><span>${esc(item)}</span></li>`).join("");

  // Body only — buildKitDocument applies global header/footer once.
  return `
<main>
  <section class="blog-hero"><div class="blog-wrap">
    <p class="blog-breadcrumb"><a href="/">Home</a> / Blog</p>
    <h1>Hair Loss &amp; Scalp Health Insights</h1>
    <p class="blog-intro">Straight answers on shedding, scalp conditions, hormones and nutrients.</p>
    <div class="blog-trust-line"><img src="${ninaPortrait}" alt="Dr. Nina Ross, ND" width="88" height="88" /><span>Written by certified trichologists. <b>${esc(credentials.reviewerByline)}.</b></span></div>
    <a href="/blog/${esc(featured.slug)}" class="blog-featured"><span class="blog-featured-image">${featuredImg}</span><span class="blog-featured-copy"><span class="blog-category">Featured · ${esc(categoryNames[featured.category] ?? featured.category)}</span><h2>${esc(featured.title)}</h2><p>${esc(featured.excerpt)}</p><span class="blog-meta">${featured.readTimeMinutes} min read</span></span></a>
  </div></section>
  <section class="blog-library" id="library"><div class="blog-wrap">
    <nav class="blog-tabs" aria-label="Blog categories">${tabs}</nav>
    <div class="blog-post-grid">${firstPosts.map((p) => postCard(p.slug, p.title, p.category, p.excerpt, p.readTimeMinutes, p.clinicallyReviewed)).join("")}</div>
  </div>
  <section class="blog-short-answers" aria-labelledby="short-answers-title"><div class="blog-wrap">
    <p class="blog-kicker">Straight answers</p><h2 id="short-answers-title">Start with what <em>you noticed.</em></h2>
    <div class="blog-answer-row">${answers}</div>
  </div></section>
  <div class="blog-wrap"><div class="blog-post-grid">${lastPosts.map((p) => postCard(p.slug, p.title, p.category, p.excerpt, p.readTimeMinutes, p.clinicallyReviewed)).join("")}</div></div>
  </section>
  <section class="blog-offer" id="discovery"><div class="blog-wrap"><div class="blog-offer-card">
    <div><p class="blog-kicker">One visit. Real answers.</p><h2>The $99 Hair &amp; Body <em>Discovery</em></h2><p class="blog-offer-meta">${esc(offer.metaLine)}</p><div class="blog-pills">${pills}</div></div>
      <div><ul class="blog-offer-list">${includes}</ul><div class="blog-promise"><b>Our promise</b><p>${esc(offer.riskReversal)}</p></div><p class="blog-offer-fine">${esc(trust.payment)}</p><div class="blog-offer-actions"><a class="blog-gold-button" href="${trust.bookingUrl}" target="_blank" rel="noopener">${esc(ctas.primary)} →</a><a href="${nap.phoneHref}">${esc(nap.phone)}</a></div></div>
  </div></div></section>
  <section class="blog-authors"><div class="blog-wrap"><div class="blog-author-card">
    <img src="${ninaPortrait}" alt="Dr. Nina Ross, ND" width="320" height="320" loading="lazy" decoding="async" />
    <div><p class="blog-kicker">Who writes this</p><h2>Written by certified trichologists</h2><p class="blog-author-credential">${esc(credentials.reviewerByline)}</p><p>${esc(credentials.delivery)} ${trust.yearsInPractice} years of specialized care and ${esc(trust.clientsSeen.toLowerCase())} clients seen shape what we write.</p><div class="blog-author-links"><a href="/editorial-policy">Editorial Policy</a><a href="/medical-review-policy">Medical Review Policy</a><a href="/functional-medicine">Functional Medicine</a></div></div>
  </div></div></section>
</main>
<div class="blog-sticky-cta"><span><b>$99</b><small>Pick your time</small></span><a class="blog-gold-button" href="${trust.bookingUrl}" target="_blank" rel="noopener">Book My $99 Discovery →</a></div>
`;
}
