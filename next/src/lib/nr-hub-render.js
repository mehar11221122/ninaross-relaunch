// Nina Ross Atlanta: hub template for /concerns and /treatments. Same design, different data (posts/_hubs.json).
import { SITE, BOOK, esc, siteHeader, offerModule, siteFooter, pageTail } from './nr-render.js';

const hbBook = (label, cls = 'nr-btn nr-btn--gold') => `<a class="${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book><span>${label}</span><span aria-hidden="true">→</span></a>`;
const pad = n => String(n).padStart(2, '0');

export function renderHub(key, hubs, { base = '' } = {}) {
  const A = p => base + p;
  const hub = hubs[key];
  const other = hubs[key === 'conditions' ? 'treatments' : 'conditions'];
  const url = `${SITE}${hub.base}`;
  const idealFor = hubs.treatments.idealFor;

  // name lookups across both hubs
  const names = {};
  for (const h of [hubs.conditions, hubs.treatments]) h.families.forEach(f => f.items.forEach(i => { names[i.slug] = { name: i.name, href: `${h.base}/${i.slug}` }; }));
  const pairsFor = slug => key === 'treatments'
    ? (idealFor[slug] || [])
    : Object.keys(idealFor).filter(t => idealFor[t].includes(slug));

  let n = 0;
  const all = [];
  hub.families.forEach(f => f.items.forEach(i => { n++; all.push({ ...i, n, fam: f }); }));
  const total = all.length;

  const seg = all.map(i => `<a href="${hub.base}/${i.slug}" style="--c:${i.fam.color}" aria-label="${pad(i.n)} ${esc(i.name)}"><b>${pad(i.n)}</b><span>${esc(i.name)}</span></a>`).join('');
  const legend = hub.families.map(f => `<a href="#${f.id}" style="--c:${f.color}"><i aria-hidden="true"></i>${esc(f.name)} <small>${f.items.length}</small></a>`).join('');

  const chapters = hub.families.map((f, fi) => {
    const cards = f.items.map(i => {
      const it = all.find(a => a.slug === i.slug);
      const pairs = pairsFor(i.slug).filter(s => names[s]);
      return `<article class="hb-card${f.items.length === 1 ? ' hb-card--solo' : ''}" id="${i.slug}" style="--c:${f.color}">
        <p class="hb-card__n" aria-hidden="true">${pad(it.n)}${i.notOffered ? '<span class="hb-card__flag">Not offered · Education only</span>' : ''}</p>
        <h3><a href="${hub.base}/${i.slug}">${esc(i.name)}</a></h3>
        <p class="hb-card__s">${i.text}</p>
        ${pairs.length ? `<div class="hb-card__pair"><span>${esc(hub.pairLabel)}</span><div>${pairs.map(s => `<a href="${names[s].href}">${esc(names[s].name)}</a>`).join('')}</div></div>` : ''}
        <span class="hb-card__go" aria-hidden="true">Read about ${esc(i.name)} →</span>
      </article>`;
    }).join('\n      ');
    return `<section class="hb-fam${f.dark ? ' hb-fam--dark' : fi % 2 ? ' hb-fam--white' : ''}" id="${f.id}" aria-labelledby="${f.id}-h" style="--c:${f.color}">
  <div class="wrap hb-fam__grid">
    <header class="hb-fam__hd">
      <i class="hb-ghost" aria-hidden="true">${pad(fi + 1)}</i>
      <p class="hb-fam__k"><span aria-hidden="true"></span>${esc(f.name)} · ${f.items.length} ${f.items.length > 1 ? hub.nounPlural : hub.noun}</p>
      <h2 id="${f.id}-h">${esc(f.title)}</h2>
      <p class="hb-fam__t">${f.text}</p>
      ${f.callout ? `<p class="hb-call"><span aria-hidden="true">◆</span>${f.callout}</p>` : ''}
    </header>
    <div class="hb-cards">
      ${cards}
    </div>
  </div>
</section>`;
  }).join('\n');

  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${url}#page`, url, name: hub.seoTitle.split(' | ')[0], description: hub.description,
      about: { '@id': `${SITE}/#organization` }, reviewedBy: { '@type': 'Person', name: 'Dr. Nina Ross, ND', url: `${SITE}/about#dr-nina-ross` },
      publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Nina Ross Atlanta', url: SITE } },
    { '@type': 'BreadcrumbList', itemListElement: [['Home', `${SITE}/`], [hub.crumb, url]].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    { '@type': 'ItemList', name: hub.seoTitle.split(' | ')[0], numberOfItems: all.filter(i => !i.notOffered).length, itemListElement: all.filter(i => !i.notOffered).map(i => ({ '@type': 'ListItem', position: i.n, url: `${SITE}${hub.base}/${i.slug}`, name: i.name })) }
  ] };

  const header = siteHeader()
    .replace(/<a href="\/blog" aria-current="page">/g, '<a href="/blog">')
    .replace(new RegExp(`<a href="${hub.base}">`, 'g'), `<a href="${hub.base}" aria-current="page">`);

  const hero = hub.hero;
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(hub.seoTitle)}</title>
<meta name="description" content="${esc(hub.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#101112">
<meta property="og:type" content="website"><meta property="og:site_name" content="Nina Ross Atlanta">
<meta property="og:title" content="${esc(hub.seoTitle)}"><meta property="og:description" content="${esc(hub.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/img/og-${hub.slug}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${A('ds/styles.css')}"><link rel="stylesheet" href="${A('css/blog.css?v=6')}"><link rel="stylesheet" href="${A('css/about.css?v=1')}"><link rel="stylesheet" href="${A('css/hub.css?v=1')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="is-hub is-article" data-hub="${hub.slug}">
${header}
<main>
<section class="hb-hero">
  <i class="hb-hero__num" aria-hidden="true">${pad(total)}</i>
  <div class="wrap hb-hero__grid">
    <div>
      <p class="crumbs"><a href="/">Home</a> / <span>${esc(hub.crumb)}</span></p>
      <h1 class="hb-h1">${hub.h1}</h1>
      <p class="hb-lede">${hub.lede}</p>
      <div class="hb-ctas">${hbBook('Book My $99 Hair &amp; Body Discovery')}<a class="hb-phone" href="tel:+16785614522">(678) 561-4522</a></div>
    </div>
    ${hero?.src ? `<figure class="hb-hero__img"><img src="${A(hero.src)}" width="${hero.width}" height="${hero.height}" alt="${esc(hero.alt)}" fetchpriority="high" loading="eager" decoding="async"><figcaption>${esc(hero.caption)}</figcaption></figure>` : ''}
  </div>
  <div class="wrap">
    <nav class="hb-index" aria-label="All ${total} ${hub.nounPlural}">${seg}</nav>
    <nav class="hb-legend" aria-label="${esc(hub.crumb)} by family">${legend}</nav>
  </div>
</section>

<div class="a3-wrap">
  <section class="a3-short hb-short" aria-labelledby="short">
    <h2 id="short">The short answer</h2>
    <p>${hub.short.text}</p>
    <ul>${hub.short.takeaways.map(k => `<li>${k}</li>`).join('')}</ul>
  </section>
</div>

${chapters}

<section class="hb-unsure">
  <div class="wrap hb-unsure__in">
    <div>
      <h2>${key === 'conditions' ? 'Not sure which one it is?' : 'Not sure which treatment fits?'}</h2>
      <p>${key === 'conditions'
        ? 'That is what the first visit is for. Several of these look identical in the mirror and completely different at 200x.'
        : 'You don\'t have to pick. A certified trichologist reads your scalp at 200x first, and the plan follows what they find.'}</p>
    </div>
    <a class="hb-unsure__x" href="${other.base}">${key === 'conditions' ? 'See the treatments we use' : 'Browse the conditions we treat'} <span aria-hidden="true">→</span></a>
  </div>
</section>

${offerModule()}

<section class="hb-sec" aria-labelledby="care">
  <div class="wrap hb-care">
    <div class="hb-care__who">
      <img src="${A('img/nina-portrait.webp')}" width="1200" height="1200" alt="Dr. Nina Ross, ND, naturopathic doctor who guides every Nina Ross Atlanta hair plan" loading="lazy" decoding="async">
      <div>
        <h2 id="care">Who delivers the care</h2>
        <p>Delivered by a certified trichologist. Method by <a href="/about#dr-nina-ross">Dr. Nina Ross, ND</a>, Double Board Certified Trichologist and PhD in Functional Drugless Medicine, who oversees every protocol as Clinical Director.</p>
        <p class="hb-care__fine">10 years of specialized care · 2,500+ clients seen · Everything in-house, we never refer out</p>
      </div>
    </div>
    <div class="hb-care__visit">
      <h2>Visit the clinic</h2>
      <address><b>Nina Ross Atlanta</b>8735 Dunwoody Place, Suite 290<br>Sandy Springs, GA 30350<br><a href="tel:+16785614522">(678) 561-4522</a><br>Monday to Saturday, 10:00 AM to 3:30 PM</address>
      <ul><li>Free parking at the building, just off GA-400 near the Perimeter</li><li>Pick a time that fits your week</li><li>Your written report the next day</li><li>Serving all of Metro Atlanta</li></ul>
    </div>
  </div>
</section>

<section class="ab-close hb-close">
  <div class="wrap">
    <h2>Let's find out what your hair is <em>trying to tell you.</em></h2>
    <p>You'll see it, or the $99 is on us. Serving all of Metro Atlanta.</p>
    <div class="ab-ctas ab-ctas--c">${hbBook('Book My $99 Hair &amp; Body Discovery')}<a class="ab-phone" href="tel:+16785614522">(678) 561-4522</a></div>
  </div>
</section>
</main>
${siteFooter()}
${pageTail(A)}
</body></html>
`;
}
