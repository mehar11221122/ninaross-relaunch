// Nina Ross Atlanta: blog category page template. One function renders every /blog/[category].
// Data: posts/_categories.json (copy + links per category) and posts/_catalog.json (articles).
import { SITE, PEOPLE, esc, card, articleThumbnail, block, siteHeader, offerModule, siteFooter, pageTail } from './nr-render.js';

const pad = n => String(n).padStart(2, '0');

export function renderCategory(cat, categories, catalog, { base = '' } = {}) {
  const A = p => base + p;
  const url = `${SITE}/blog/${cat.slug}`;
  const posts = catalog.filter(p => p.categorySlug === cat.slug);
  const featured = posts.find(p => p.slug === cat.featured) || posts[0];
  const rest = posts.filter(p => p !== featured);
  const empty = posts.length === 0;
  const hero = cat.hero || {};
  const countOf = s => catalog.filter(p => p.categorySlug === s).length;
  const fallback = (cat.whileYouWait || []).map(s => catalog.find(p => p.slug === s)).filter(Boolean).slice(0, 3);

  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${url}#page`, url, name: cat.name, description: cat.description,
      isPartOf: { '@id': `${SITE}/blog#blog` }, publisher: { '@type': 'Organization', name: 'Nina Ross Atlanta', url: SITE },
      reviewedBy: { '@type': 'Person', name: PEOPLE.nina.name, url: SITE + PEOPLE.nina.url } },
    { '@type': 'BreadcrumbList', itemListElement: [['Home', `${SITE}/`], ['Blog', `${SITE}/blog`], [cat.name, url]]
      .map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    ...(empty ? [] : [{ '@type': 'ItemList', itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/blog/${p.slug}`, name: p.title })) }])
  ] };

  const tiles = [{ slug: '', name: 'All articles', n: catalog.length }, ...categories.filter(c => c.slug !== cat.slug).map(c => ({ slug: c.slug, name: c.name, n: countOf(c.slug) })).filter(t => t.n > 0)]
    .map(t => `<a class="cat-tile" href="/blog${t.slug ? '/' + t.slug : ''}"><i aria-hidden="true">${pad(t.n)}</i><b>${esc(t.name)}</b><span>${t.n} article${t.n > 1 ? 's' : ''} →</span></a>`).join('');

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(cat.seoTitle || cat.name)} | Nina Ross</title>
<meta name="description" content="${esc(cat.description)}">
${empty ? '<meta name="robots" content="noindex,follow">\n' : ''}<link rel="canonical" href="${url}">
<meta name="theme-color" content="#101112">
<meta property="og:type" content="website"><meta property="og:site_name" content="Nina Ross Atlanta">
<meta property="og:title" content="${esc(cat.name)} | Nina Ross"><meta property="og:description" content="${esc(cat.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(hero.og || `${SITE}/img/og-blog.png`)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
${hero.src ? `<link rel="preload" as="image" href="${A(hero.src)}" fetchpriority="high">\n` : ''}<link rel="stylesheet" href="${A('ds/styles.css')}"><link rel="stylesheet" href="${A('css/blog.css?v=5')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="is-article is-category" data-category="${esc(cat.slug)}">
${siteHeader()}
<main>
<figure class="a3-hero a3-cover cat-cover">
  ${hero.src
    ? `<img class="a3-cover__img" src="${A(hero.src)}" width="${hero.width}" height="${hero.height}" fetchpriority="high" loading="eager" decoding="async" alt="${esc(hero.alt)}"${hero.focus ? ` style="object-position:${esc(hero.focus)}"` : ''}>`
    : ''}
  <div class="a3-cover__in a3-wrap">
    <p class="crumbs"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span>${esc(cat.name)}</span></p>
    <p class="a3-cat">${esc(cat.name)}</p>
    <h1 class="a3-h1">${esc(cat.title)}</h1>
    <p class="a3-sub">${cat.intro}</p>
    <p class="cat-meta">${empty ? '' : `<span>${posts.length} article${posts.length > 1 ? 's' : ''}</span>`}<span>Clinically reviewed by <a href="${PEOPLE.nina.url}">${esc(PEOPLE.nina.name)}</a></span></p>
    ${hero.caption ? `<figcaption class="a3-cover__fc">${hero.caption}</figcaption>` : ''}
  </div>
</figure>

<div class="a3-wrap">
  <section class="a3-short cat-short" aria-labelledby="short">
    <h2 id="short">The short version</h2>
    <p>${cat.shortVersion.text}</p>
    <ul>${cat.shortVersion.takeaways.map(k => `<li>${k}</li>`).join('')}</ul>
  </section>
</div>

${empty ? `<section class="cat-sec"><div class="wrap">
  <div class="cat-empty"><div><h2>Related reading</h2><p>Explore these clinically reviewed articles while browsing ${esc(cat.name.toLowerCase())}.</p></div></div>
  ${fallback.length ? `<div class="grid grid--even">${fallback.map(card).join('')}</div>` : ''}
</div></section>` : `<section class="cat-sec" aria-labelledby="start"><div class="wrap">
  <h2 class="cat-h" id="start">Start here</h2>
  <a class="a3-big" href="/blog/${featured.slug}">${articleThumbnail(featured, true)}<span class="a3-big__b"><span class="cat">${featured.readTime} min read</span><b>${esc(featured.title)}</b><span>${esc(featured.summary)}</span></span></a>
  ${rest.length ? `<h2 class="cat-h cat-h--sm">More in ${esc(cat.name)}</h2><div class="grid grid--even">${rest.map(card).join('')}</div>` : ''}
</div></section>`}

${cat.links?.length ? `<section class="cat-sec"><div class="wrap cat-links">${block({ type: 'links', title: 'Where this leads', items: cat.links }, { cites: new Set(), videos: [] })}</div></section>` : ''}

<section class="cat-sec" aria-labelledby="browse"><div class="wrap">
  <h2 class="cat-h" id="browse">Keep browsing</h2>
  <nav class="cat-tiles" aria-label="Blog categories">${tiles}</nav>
</div></section>

${offerModule()}
</main>
${siteFooter()}
${pageTail(A)}
</body></html>
`;
}
