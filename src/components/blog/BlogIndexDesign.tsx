import { useState } from "react";
import { ArrowRight, Check, Menu, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import { BookCta } from "@/components/trust/BookCta";
import { blogCategories } from "@/data/blog-categories";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { credentials, nap, offer, trust } from "@/data/trust";
import { getBlogHero } from "@/lib/blog-hero";

const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";

const categoryNames = Object.fromEntries(blogCategories.map((category) => [category.slug, category.title]));
const featured = blogPosts.find((post) => post.slug === "traction-alopecia-reversibility") ?? blogPosts[0];
const remainingPosts = featured ? blogPosts.filter((post) => post.slug !== featured.slug) : blogPosts;
const firstPosts = remainingPosts.slice(0, 6);
const lastPosts = remainingPosts.slice(6);

const shortAnswers = [
  { title: "What 200x actually shows", slug: "traction-alopecia-reversibility", marker: "200x" },
  { title: "Is my shedding normal?", slug: "iron-deficiency-and-hair-loss", marker: "01" },
  { title: "Edges: when to worry", slug: "traction-alopecia-reversibility", marker: "02" },
  { title: "The minoxidil itch", slug: "minoxidil-itchy-scalp", marker: "03" },
  { title: "DHT in plain language", slug: "stop-hair-loss-with-dht-blockers", marker: "04" },
  { title: "Oily scalp, thin hair", slug: "oily-scalp-and-hair-loss", marker: "05" },
];


function CategoryTabs() {
  const categoriesWithPosts = blogCategories.filter((category) =>
    blogPosts.some((post) => post.category === category.slug),
  );
  return (
    <nav className="blog-tabs" aria-label="Blog categories">
      <Link to="/blog" aria-current="page">All <small>{blogPosts.length}</small></Link>
      {categoriesWithPosts.map((category) => {
        const count = blogPosts.filter((post) => post.category === category.slug).length;
        return <Link key={category.slug} to="/blog/$segment" params={{ segment: category.slug }}>{category.title} <small>{count}</small></Link>;
      })}
    </nav>
  );
}

function PostArtwork({ post }: { post: BlogPost }) {
  const hero = getBlogHero(post.slug);
  if (hero) return <span className="blog-card-art"><img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} loading="lazy" decoding="async" /></span>;
  return <span className={`blog-card-art blog-card-art--${post.category}`} aria-hidden="true"><span>{post.category === "health-wellness" ? "ROOT" : post.category === "scalp-concerns" ? "SCALP" : "200x"}</span><i /></span>;
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link to="/blog/$segment" params={{ segment: post.slug }} className="blog-post-card">
      <PostArtwork post={post} />
      <span className="blog-card-copy">
        <span className="blog-category">{categoryNames[post.category] ?? post.category}</span>
        <h3>{post.title}</h3><p>{post.excerpt}</p>
        <span className="blog-meta"><span>{post.readTimeMinutes} min read</span>{post.clinicallyReviewed ? <span>Clinically reviewed</span> : null}</span>
      </span>
    </Link>
  );
}

function PostGrid({ posts }: { posts: BlogPost[] }) { return <div className="blog-post-grid">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div>; }

function ShortAnswers() {
  return (
    <section className="blog-short-answers" aria-labelledby="short-answers-title"><div className="blog-wrap">
      <p className="blog-kicker">Straight answers</p><h2 id="short-answers-title">Start with what <em>you noticed.</em></h2>
      <div className="blog-answer-row">{shortAnswers.map((item) => {
        const hero = getBlogHero(item.slug);
        return <Link key={`${item.slug}-${item.title}`} to="/blog/$segment" params={{ segment: item.slug }} className="blog-answer-card"><span className="blog-answer-poster">{hero ? <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} loading="lazy" decoding="async" /> : <><b>{item.marker}</b><i /></>}</span><strong>{item.title}</strong><span>Read the answer <ArrowRight /></span></Link>;
      })}</div>
    </div></section>
  );
}

function DiscoveryOffer() {
  return (
    <section className="blog-offer" id="discovery"><div className="blog-wrap"><div className="blog-offer-card">
      <div><p className="blog-kicker">One visit. Real answers.</p><h2>The $99 Hair &amp; Body <em>Discovery</em></h2><p className="blog-offer-meta">{offer.metaLine}</p><div className="blog-pills">{offer.pills.map((pill) => <span key={pill}>{pill}</span>)}</div></div>
      <div><ul className="blog-offer-list">{offer.includes.map((item) => <li key={item}><Check /><span>{item}</span></li>)}</ul><div className="blog-promise"><b>Our promise</b><p>{offer.riskReversal}</p></div><p className="blog-offer-fine">{trust.payment}</p><div className="blog-offer-actions"><BookCta className="blog-gold-button">{trust.ctaLabel} <ArrowRight /></BookCta><a href={nap.phoneHref}><Phone /> {nap.phone}</a></div></div>
    </div></div></section>
  );
}

function AuthorPanel() {
  return (
    <section className="blog-authors"><div className="blog-wrap"><div className="blog-author-card">
      <img src={ninaPortrait} alt="Dr. Nina Ross, ND, naturopathic doctor who guides every Nina Ross Atlanta hair plan" width="320" height="320" loading="lazy" decoding="async" />
      <div><p className="blog-kicker">Who writes this</p><h2>Written by certified trichologists</h2><p className="blog-author-credential">{credentials.reviewerByline}</p><p>{credentials.delivery} {trust.yearsInPractice} years of specialized care and {trust.clientsSeen.toLowerCase()} clients seen shape what we write.</p><div className="blog-author-links"><Link to="/editorial-policy">Editorial Policy</Link><Link to="/medical-review-policy">Medical Review Policy</Link><Link to="/functional-medicine">Functional Medicine</Link></div></div>
    </div></div></section>
  );
}


export function BlogIndexDesign() {
  if (!featured) return null;
  const featuredHero = getBlogHero(featured.slug);
  return (
    <div className="blog-index-page"><BlogHeader /><main>
      <section className="blog-hero"><div className="blog-wrap"><p className="blog-breadcrumb"><Link to="/">Home</Link> / Blog</p><h1>Hair Loss &amp; Scalp Health Insights</h1><p className="blog-intro">Straight answers on shedding, scalp conditions, hormones and nutrients.</p><div className="blog-trust-line"><img src={ninaPortrait} alt="Dr. Nina Ross, ND, naturopathic doctor who guides every Nina Ross Atlanta hair plan" width="88" height="88" /><span>Written by certified trichologists. <b>{credentials.reviewerByline}.</b></span></div>
        <Link to="/blog/$segment" params={{ segment: featured.slug }} className="blog-featured"><span className="blog-featured-image">{featuredHero ? <img src={featuredHero.src} alt={featuredHero.alt} width={featuredHero.width} height={featuredHero.height} fetchPriority="high" /> : <PostArtwork post={featured} />}</span><span className="blog-featured-copy"><span className="blog-category">Featured · {categoryNames[featured.category]}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><span className="blog-meta">{featured.readTimeMinutes} min read</span></span></Link>
      </div></section>
      <section className="blog-library" id="library"><div className="blog-wrap"><CategoryTabs /><PostGrid posts={firstPosts} /></div><ShortAnswers /><div className="blog-wrap"><PostGrid posts={lastPosts} /></div></section>
      <DiscoveryOffer /><AuthorPanel />
    </main><BlogFooter /><div className="blog-sticky-cta"><span><b>$99</b><small>Pick your time</small></span><BookCta className="blog-gold-button">Book My $99 Discovery <ArrowRight /></BookCta></div></div>
  );
}
