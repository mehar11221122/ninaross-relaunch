// Nina Ross Atlanta: blog article template.
// One function renders every post from its JSON in /posts. Used by build.mjs.
// Strings in posts are trusted, authored HTML. Use {cite:N} for superscript citations.

export const SITE = 'https://www.ninaross.co';
export const BOOK = 'https://ninaross.as.me/hairlossevaluations';

export const PEOPLE = {
  nina: {
    name: 'Dr. Nina Ross, ND',
    url: '/about',
    photo: 'img/nina-portrait.webp',
    bio: 'Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director of Nina Ross Atlanta, with 10 years of specialized care and 2,500+ clients seen.'
  }
};

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = s => String(s ?? '').replace(/\{cite:\d+\}/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const fmtDate = d => d ? new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';

const logo = '<span class="nr-logo nr-logo--light"><span class="nr-logo__main">NINA&nbsp;ROSS</span><span class="nr-logo__sub"><i></i><span>ATLANTA</span><i></i></span></span>';
const book = (label, cls = 'nr-btn nr-btn--gold') => `<a class="${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book><span>${label}</span><span aria-hidden="true">→</span></a>`;
const nav = '<a href="/trichology">Trichology</a><a href="/treatments">Treatments</a><a href="/concerns">Concerns</a><a href="/about">About</a><a href="/blog" aria-current="page">Blog</a><a href="/contact">Contact</a>';

export const siteHeader = () => `<header class="hd">
  <div class="hd__in">
    <a href="/" aria-label="Nina Ross Atlanta home">${logo}</a>
    <nav class="hd__nav" aria-label="Primary">${nav}</nav>
    <div class="hd__right">${book('Book $99 Discovery', 'nr-btn nr-btn--gold hd__cta')}<button class="hd__menu" type="button" aria-label="Menu" aria-expanded="false" data-menu><span></span></button></div>
  </div>
  <nav class="mnav" aria-label="Mobile">${nav}</nav>
</header>`;

export const offerModule = () => `<section class="offer offer--after offer--article" id="discovery">
  <div class="wrap"><div class="offer__card">
    <div><p class="kicker">One visit. Real answers.</p><h2>The $99 Hair &amp; Body <em>Discovery</em></h2><p class="offer__meta">$99 · 30 minutes · Serving all of Metro Atlanta</p><div class="pills"><span>No prep</span><span>One visit</span><span>Your time, your pick</span><span>No judgment</span><span>Serving all of Metro Atlanta</span></div></div>
    <div class="col2"><ul class="offer__list"><li>One-on-one scalp health session with a certified trichologist</li><li>200x magnification read of your scalp, on screen, while you watch</li><li>A full-body biofeedback scan</li><li>Your Hair &amp; Body Discovery Report, delivered the next day</li></ul><p class="promise"><b>Our promise</b>You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us.</p><p class="offer__fine">Fully HSA/FSA eligible. 0% financing for qualified applicants.</p><div class="offer__cta" data-offer-cta>${book('Book My $99 Hair &amp; Body Discovery')}<a class="phone" href="tel:+16785614522">(678) 561-4522</a></div></div>
  </div></div>
</section>`;

export const siteFooter = () => `<footer class="ft"><div class="wrap"><div class="ft__grid">
  <div>${logo}<p style="margin:14px 0 0;max-width:30ch">Serving all of Metro Atlanta from Sandy Springs.</p></div>
  <div><h3>Quick Links</h3><ul><li><a href="/trichology">Trichology</a></li><li><a href="/treatments">Treatments</a></li><li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li></ul></div>
  <div><h3>Conditions We Treat</h3><ul><li><a href="/concerns/ccca">CCCA</a></li><li><a href="/concerns/traction-alopecia">Traction Alopecia</a></li><li><a href="/concerns/alopecia-areata">Alopecia Areata</a></li><li><a href="/concerns">All Concerns</a></li></ul></div>
  <div><h3>Company</h3><ul><li><a href="/contact">Contact</a></li><li><a href="/editorial-policy">Editorial Policy</a></li><li><a href="/medical-review-policy">Medical Review Policy</a></li></ul></div>
  <div><h3>Connect</h3><address>8735 Dunwoody Place, Suite 290<br>Sandy Springs, GA 30350<br><a href="tel:+16785614522">(678) 561-4522</a><br>Monday to Saturday, 10:00 AM to 3:30 PM<br><a href="https://instagram.com/ninarossatl">@ninarossatl</a></address></div>
</div><p class="ft__disc">Educational information only. It does not replace care from your own prescriber, and nothing here is a reason to stop a medication you were prescribed.</p><div class="ft__bottom"><span>© ${new Date().getFullYear()} Nina Ross Atlanta</span><span>Serving all of Metro Atlanta</span></div></div></footer>`;

export const pageTail = A => `<div class="sticky" data-sticky data-hidden="true"><span><b>$99</b><small>Pick your time</small></span>${book('Book My $99 Discovery')}</div><div class="vp" hidden data-vp role="dialog" aria-modal="true" aria-label="Video player"><div class="vp__p"><button class="vp__x" type="button" aria-label="Close video" data-vp-close>×</button><div class="vp__frame" data-vp-frame></div><p class="vp__t" data-vp-title></p><a class="vp__link" href="#" data-vp-link>Read the full article →</a></div></div><script src="${A('js/blog.js?v=4')}" defer></script>`;

function renderInline(s, cites) {
  return String(s ?? '').replace(/\{cite:(\d+)\}/g, (_, n) => {
    const first = !cites.has(n); cites.add(n);
    return `<sup><a href="#ref-${n}"${first ? ` id="cite-${n}"` : ''}>${n}</a></sup>`;
  });
}

export function block(b, ctx) {
  const t = s => renderInline(s, ctx.cites);
  switch (b.type) {
    case 'p': return `<p>${t(b.text)}</p>`;
    case 'h2': return `<h2 id="${esc(b.id)}">${t(b.text)}</h2>`;
    case 'h3': return `<h3>${t(b.text)}</h3>`;
    case 'pullquote': return `<blockquote class="a3-pq"><p>${t(b.text)}</p><cite>${esc(b.by || PEOPLE.nina.name)}</cite></blockquote>`;
    case 'timeline': return `<ol class="a3-tl" aria-label="${esc(b.label || 'How the timing unfolds')}">${b.steps.map(s => `<li><b>${t(s.title)}</b><span>${t(s.text)}</span></li>`).join('')}</ol>`;
    case 'figure': return b.src ? `<figure class="a3-fig"><img src="${esc(b.src)}" width="${b.width}" height="${b.height}" alt="${esc(b.alt)}" loading="lazy" decoding="async"><figcaption>${t(b.caption)}</figcaption></figure>` : '';
    case 'checklist': return `<ul class="a3-check">${b.items.map(i => `<li>${t(i)}</li>`).join('')}</ul>`;
    case 'foodgrid': return `<div class="a3-food">${b.groups.map(g => `<div class="a3-food__g"><h4>${t(g.title)}</h4><ul>${g.items.map(i => `<li>${t(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
    case 'callout': {
      const a = b.tone === 'attention';
      return `<div class="a3-call a3-call--${a ? 'a' : 'c'}"><span aria-hidden="true">${a ? '◆' : '○'}</span><p>${b.title ? `<b>${t(b.title)}</b> ` : ''}${t(b.text)}${b.resultsDisclaimer ? ' <em>Results not typical. Individual results will vary.</em>' : ''}</p></div>`;
    }
    case 'table': return `<div class="a3-table"><table><thead><tr>${b.head.map(h => `<th scope="col">${t(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr><th scope="row">${t(r[0])}</th>${r.slice(1).map(c => `<td>${t(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'video': return '';
    case 'booking': return `<div class="a3-inbook"><p><b>${t(b.lead || 'Not sure this is you?')}</b> ${t(b.text || 'See your scalp at 200x.')}</p>${book('Book My $99 Discovery')}</div>`;
    case 'links': return `<nav class="a3-links" aria-label="Related pages"><h2 class="a3-links__h">${esc(b.title || 'Go deeper')}</h2>${b.items.map(l => `<a href="${esc(l.href)}"><small>${esc(l.kind)}</small><b>${esc(l.title)}</b><span>${t(l.text)}</span></a>`).join('')}</nav>`;
    case 'html': return b.html;
    default: throw new Error(`Unknown block type "${b.type}"`);
  }
}

export function card(p) {
  return `<a class="card" href="/blog/${p.slug}">${articleThumbnail(p)}<span class="card__b"><span class="cat">${esc(p.category)}</span><h3 class="t-card">${esc(p.title)}</h3><p class="card__sum">${esc(p.summary)}</p><span class="meta">${p.readTime} min read</span></span></a>`;
}

export function articleThumbnail(p, eager = false) {
  const hero = p.hero || {};
  return hero.src
    ? `<span class="article-thumb"><img src="${esc(hero.src)}" width="${hero.width || 1448}" height="${hero.height || 1086}" alt="${esc(hero.alt || p.title)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></span>`
    : `<span class="ph" data-slot="HERO-${esc(p.slug)}" role="img" aria-label="${esc(hero.alt || `Hero image for ${p.title}`)}"></span>`;
}

// Up next: explicit slugs first, then same category, then anything else.
function pickRelated(post, catalog) {
  const others = catalog.filter(p => p.slug !== post.slug);
  const bySlug = s => others.find(p => p.slug === s);
  const chosen = [];
  const add = p => { if (p && !chosen.includes(p)) chosen.push(p); };
  [post.upNext, ...(post.related || [])].forEach(s => add(bySlug(s)));
  others.filter(p => p.category === post.category).forEach(add);
  others.forEach(add);
  return { next: chosen[0], rest: chosen.slice(1, 4) };
}

export function renderArticle(post, catalog, { base = '' } = {}) {
  const url = `${SITE}/blog/${post.slug}`;
  const author = PEOPLE[post.author] || PEOPLE.nina;
  const reviewer = PEOPLE[post.reviewer] || PEOPLE.nina;
  const same = author === reviewer;
  const ctx = { cites: new Set() };
  const catSlug = post.categorySlug;
  const shortTitle = post.shortTitle || post.title;
  const A = p => base + p; // asset path

  const isPotassium = post.slug === 'hair-loss-and-potassium-deficiency';
  const isTraction = post.slug === 'traction-alopecia-reversibility';
  const isMinoxidil = post.slug === 'minoxidil-itchy-scalp';
  const isAlopeciaAreata = post.slug === 'how-to-stop-alopecia-areata-from-spreading';
  const isCrisis = post.slug === 'hair-loss-epidemic-among-black-women';
  const isChoosing = post.slug === 'choosing-a-trichologist-near-me';
  const isDht = post.slug === 'stop-hair-loss-with-dht-blockers';
  const isIron = post.slug === 'iron-deficiency-and-hair-loss';
  const isHormones = post.slug === 'hair-growth-hormones';
  const isLysine = post.slug === 'l-lysine-benefits-for-skin';
  const isAmino = post.slug === 'amino-acids-for-hair-regrowth';
  const isMagnesium = post.slug === 'magnesium-for-hair-growth';
  const isOily = post.slug === 'oily-scalp-and-hair-loss';
  const isTrichoBlack = post.slug === 'trichologist-for-black-hair';
  const figHtml = (fig, lead) => fig && fig.src
    ? `<figure class="a3-fig${lead ? ' a3-fig--lead' : ''}"><img src="${esc(fig.src)}" width="${fig.width || 1200}" height="${fig.height || 900}" alt="${esc(fig.alt || '')}" loading="lazy" decoding="async"><figcaption>${esc(fig.caption || '')}</figcaption></figure>`
    : '';
  const firstArticleImage = figHtml(post.leadFigure, true) || (isPotassium
    ? `<figure class="a3-fig a3-fig--lead"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291402/ninaross/lovable/blog-kit/woman-reading-supplement-label-kitchen-nina-ross-atlanta.webp" width="1448" height="1086" alt="A woman at her kitchen table reading the label on a supplement bottle" loading="lazy" decoding="async"><figcaption>Before adding a supplement, it helps to know what your body is actually low in.</figcaption></figure>`
    : isTraction
      ? `<figure class="a3-fig a3-fig--lead"><img src="img/traction-mirror-check.png" width="1463" height="768" alt="A woman gently checking her hairline in a mirror" loading="lazy" decoding="async"><figcaption>Changes around the edges can be easier to notice when you compare the same areas over time.</figcaption></figure>`
    : isMinoxidil
      ? `<figure class="a3-fig a3-fig--lead"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291401/ninaross/lovable/blog-kit/woman-reading-minoxidil-label-nina-ross-atlanta.webp" width="1448" height="1086" alt="A woman reading the Drug Facts label on a minoxidil bottle, including the inactive ingredients list" loading="lazy" decoding="async"><figcaption>Often it is the ingredients that carry the medication, not the medication itself, that the scalp reacts to.</figcaption></figure>`
      : isAlopeciaAreata
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/alopecia-cycle-tracking.png" width="1024" height="768" alt="A woman recording cycle timing, symptoms and daily habits in a journal" loading="lazy" decoding="async"><figcaption>A timeline of symptoms, health changes and daily patterns can give useful context to the scalp read.</figcaption></figure>`
      : isCrisis
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/crisis-women-conversation.png" width="1731" height="909" alt="Three women of different generations talking together on a couch at home" loading="lazy" decoding="async"><figcaption>Hair loss runs through families and friendships, and it is talked about far less than it is lived.</figcaption></figure>`
      : isChoosing
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/trichologist-strand-analysis.png" width="1731" height="909" alt="A specialist reviewing hair strand measurements, a scalp map and written observations at a consultation desk" loading="lazy" decoding="async"><figcaption>A thorough evaluation measures, documents and explains. It does not start with a product.</figcaption></figure>`
      : isDht
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/dht-blocker-bottle.png" width="1448" height="1086" alt="A DHT blocker supplement bottle on a bathroom counter beside a note reading ask about this" loading="lazy" decoding="async"><figcaption>Whatever sits on the shelf, the first step is understanding what is actually driving the change.</figcaption></figure>`
      : isIron
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/iron-shedding-hair.png" width="1731" height="909" alt="A woman at her bathroom sink looking at a palmful of shed hair" loading="lazy" decoding="async"><figcaption>Shedding you can see in your hand often has an internal story behind it.</figcaption></figure>`
      : isHormones
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/hormone-consultation.png" width="1448" height="1086" alt="A client reviewing lab results with a specialist during a consultation" loading="lazy" decoding="async"><figcaption>Your lab work and your hair tell the same story when someone reads them together.</figcaption></figure>`
      : isLysine
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/lysine-smoothie-bowl.png" width="1448" height="1086" alt="A woman pouring the contents of an L-lysine capsule into a smoothie bowl at a kitchen counter" loading="lazy" decoding="async"><figcaption>A supplement added on hope is not the same as a plan built on what your body actually needs.</figcaption></figure>`
      : isAmino
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/amino-protein-meal.png" width="1731" height="909" alt="A woman enjoying a protein rich meal with salmon, lentils, eggs and greens" loading="lazy" decoding="async"><figcaption>Protein eaten is only the first step. The question is which building blocks your body can actually put to work.</figcaption></figure>`
      : isMagnesium
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/magnesium-deficiency-signs.png" width="1448" height="1086" alt="Illustration of a woman with labeled signs of magnesium deficiency: scalp thinning, temple headaches, chest palpitations, hand tingling and leg cramps" loading="lazy" decoding="async"><figcaption>Magnesium plays a vital role in your nerves, muscles, heart and hair. Here are common signs of deficiency to watch for.</figcaption></figure>`
      : isOily
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/oily-scalp-washing.png" width="1448" height="1086" alt="A woman massaging shampoo into her scalp at home, working the suds down to the roots" loading="lazy" decoding="async"><figcaption>Wash habits are part of the picture, and they read differently once the scalp itself has been examined.</figcaption></figure>`
      : isTrichoBlack
        ? `<figure class="a3-fig a3-fig--lead"><img src="img/trichologist-black-what-you-see.png" width="1731" height="909" alt="Split illustration comparing what the mirror shows, a healthy-looking part, with what a trichologist sees at 200x magnification: miniaturized follicles, early inflammation, sebum buildup and thinning density" loading="lazy" decoding="async"><figcaption>The mirror shows a part. A trichologist sees the early signs hiding inside it.</figcaption></figure>`
      : `<figure class="a3-fig a3-fig--lead"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291372/ninaross/landing/img/scalp-imaging-trichoscope-session-nina-ross-atlanta.webp" width="1200" height="900" alt="A trichologist examining a client's scalp with magnified imaging at Nina Ross Atlanta" loading="lazy" decoding="async"><figcaption>Magnified scalp imaging helps us look beyond what can be seen in the mirror.</figcaption></figure>`);
  const laterArticleImage = figHtml(post.midFigure, false) || (isPotassium
    ? `<figure class="a3-fig"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/potassium-iron-zinc-magnesium-follicle-nina-ross-atlanta.webp" width="1448" height="1086" alt="Illustration of potassium, iron, zinc and magnesium reaching a hair follicle beneath the scalp" loading="lazy" decoding="async"><figcaption>Potassium works alongside other minerals like iron, zinc and magnesium at the follicle.</figcaption></figure>`
    : isTraction
      ? `<figure class="a3-fig"><img src="img/traction-follicle-stages.png" width="1024" height="768" alt="Illustration comparing an intact follicle in early traction alopecia with scarring in advanced traction alopecia" loading="lazy" decoding="async"><figcaption>Early traction and advanced scarring call for different expectations and different care.</figcaption></figure>`
      : isMinoxidil
        ? `<figure class="a3-fig"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291396/ninaross/lovable/blog-kit/propylene-glycol-irritated-vs-healthy-scalp-nina-ross-atlanta.webp" width="1448" height="1086" alt="Cross-section illustration comparing an irritated scalp affected by propylene glycol with a calm, healthy scalp" loading="lazy" decoding="async"><figcaption>Propylene glycol helps the medication absorb, and it can also be the part that irritates the scalp barrier.</figcaption></figure>`
        : isAlopeciaAreata
          ? `<figure class="a3-fig"><img src="img/alopecia-woman-portrait.png" width="1463" height="768" alt="A woman with natural textured hair looking toward the camera" loading="lazy" decoding="async"><figcaption>A clear baseline makes it easier to follow what changes and decide what deserves attention next.</figcaption></figure>`
        : isCrisis
          ? `<figure class="a3-fig"><img src="img/crisis-scalp-consultation.png" width="1448" height="1086" alt="A client and a specialist reviewing a magnified scalp analysis together on a monitor" loading="lazy" decoding="async"><figcaption>Seeing the scalp at magnification, together, turns worry into something specific to work with.</figcaption></figure>`
        : isChoosing
          ? `<figure class="a3-fig"><img src="img/trichologist-follicle-anatomy.png" width="1731" height="909" alt="Anatomical illustration of a hair follicle with its layers, glands, muscles and blood supply labeled" loading="lazy" decoding="async"><figcaption>Understanding the follicle itself is part of what separates a scalp specialist from a general consultation.</figcaption></figure>`
        : isDht
          ? `<figure class="a3-fig"><img src="img/dht-miniaturization.png" width="1448" height="1086" alt="Diagram comparing a miniaturized follicle thinned by DHT with a healthy, deeply rooted follicle" loading="lazy" decoding="async"><figcaption>When DHT contributes, follicles can shrink over time, which is why pattern thinning deserves a proper read before treatment.</figcaption></figure>`
        : isIron
          ? `<figure class="a3-fig"><img src="img/iron-levels-chart.png" width="1448" height="1086" alt="Illustration comparing depleted, building and thriving follicles across ferritin iron levels" loading="lazy" decoding="async"><figcaption>Ferritin reflects stored iron, and follicles respond to those stores before a basic panel tells the whole story.</figcaption></figure>`
        : isHormones
          ? `<figure class="a3-fig"><img src="img/hair-growth-cycle.png" width="1448" height="1086" alt="Illustration of the four phases of the hair growth cycle, anagen, catagen, telogen and exogen, with the hormones that influence each" loading="lazy" decoding="async"><figcaption>Each phase of the growth cycle responds to different signals, which is why the full picture matters.</figcaption></figure>`
        : isLysine
          ? `<figure class="a3-fig"><img src="img/lysine-benefits-chart.png" width="1448" height="1086" alt="Chart ranking L-lysine benefits from best supported to most overstated, with collagen support and cold sore prevention ahead of hair growth and skin transformation" loading="lazy" decoding="async"><figcaption>The strongest evidence for lysine sits with collagen support and iron absorption, well ahead of the before-and-after promises.</figcaption></figure>`
        : isAmino
          ? `<figure class="a3-fig"><img src="img/amino-flow-diagram.png" width="1731" height="909" alt="Diagram showing protein eaten being broken into amino acids, then used by the body for keratin, collagen and tissue repair" loading="lazy" decoding="async"><figcaption>How protein becomes hair: it is broken into amino acids first, and the body shares those across its own priorities.</figcaption></figure>`
        : isMagnesium
          ? `<figure class="a3-fig"><img src="img/magnesium-night.png" width="1731" height="909" alt="A woman lying awake at night, resting her hand on her forehead beside a softly glowing lamp" loading="lazy" decoding="async"><figcaption>Poor sleep and ongoing stress quietly drain magnesium, and hair often feels the difference early.</figcaption></figure>`
        : isOily
          ? `<figure class="a3-fig"><img src="img/oily-thinning-mirror.png" width="1731" height="909" alt="A woman parting her hair at the crown while checking her part in a handheld mirror" loading="lazy" decoding="async"><figcaption>Noticing where the part widens, and when, is the kind of detail a scalp read turns into a plan.</figcaption></figure>`
        : isTrichoBlack
          ? `<figure class="a3-fig"><img src="img/trichologist-black-tools.png" width="1448" height="1086" alt="A trichology evaluation desk with a magnifying device, hair strand samples, scalp mapping illustrations and a dropper bottle" loading="lazy" decoding="async"><figcaption>The right evaluation brings its own tools: magnification, strand samples and a scalp map drawn to your pattern.</figcaption></figure>`
        : `<figure class="a3-fig"><img src="https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/fm/functional-medicine-body-scan-consultation-nina-ross-atlanta.webp" width="1200" height="900" alt="Dr. Nina Ross reviewing a client's health and scalp findings during a consultation" loading="lazy" decoding="async"><figcaption>Scalp findings make more sense when they are reviewed alongside the full health picture.</figcaption></figure>`);
  const laterImageAt = Math.max(4, Math.floor(post.body.length * 0.55));
  const body = post.body.map((b, index) => `${index === laterImageAt ? `${laterArticleImage}\n    ` : ''}${block(b, ctx)}`).join('\n    ');
  const toc = post.body.filter(b => b.type === 'h2' && b.toc !== false)
    .map(b => `<li><a href="#${esc(b.id)}">${esc(b.toc || strip(b.text))}</a></li>`)
    .concat(post.faq?.length ? ['<li><a href="#faq">FAQ</a></li>'] : [])
    .concat(post.references?.length ? ['<li><a href="#refs">References</a></li>'] : []).join('');
  const shortAnswer = renderInline(post.shortAnswer.text, ctx.cites);
  const { next, rest } = pickRelated(post, catalog);
  const hero = post.hero || {};
  const ogImage = hero.og || `${SITE}/img/HERO-${post.slug}-1200x630.jpg`;
  const sms = encodeURIComponent(`${post.title} ${url}`);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'MedicalWebPage', '@id': `${url}#page`, url, headline: post.title, description: post.description, image: ogImage,
        datePublished: post.published, dateModified: post.modified || post.lastReviewed || post.published,
        ...(post.lastReviewed ? { lastReviewed: post.lastReviewed } : {}),
        author: { '@type': 'Person', name: author.name, url: SITE + author.url },
        reviewedBy: { '@type': 'Person', name: reviewer.name, url: SITE + reviewer.url },
        publisher: { '@type': 'Organization', name: 'Nina Ross Atlanta', url: SITE } },
      { '@type': 'BreadcrumbList', itemListElement: [
        ['Home', `${SITE}/`], ['Blog', `${SITE}/blog`], [post.category, `${SITE}/blog/${catSlug}`], [shortTitle, url]
      ].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
      ...(post.faq?.length ? [{ '@type': 'FAQPage', mainEntity: post.faq.map(f => ({ '@type': 'Question', name: strip(f.q), acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) }] : [])
    ]
  };

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(post.seoTitle || post.title)} | Nina Ross</title>
<meta name="description" content="${esc(post.description)}">
<meta name="author" content="${esc(author.name)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#101112">
<meta property="og:type" content="article"><meta property="og:site_name" content="Nina Ross Atlanta">
<meta property="og:title" content="${esc(post.title)}"><meta property="og:description" content="${esc(post.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(ogImage)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="article:published_time" content="${esc(post.published)}"><meta name="twitter:card" content="summary_large_image">
${hero.src ? `<link rel="preload" as="image" href="${A(hero.src)}" fetchpriority="high">\n` : ''}<link rel="stylesheet" href="${A('ds/styles.css')}"><link rel="stylesheet" href="${A('css/blog.css?v=4')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="is-article" data-slug="${esc(post.slug)}">
<div class="prog" data-prog aria-hidden="true"></div>
<header class="hd">
  <div class="hd__in">
    <a href="/" aria-label="Nina Ross Atlanta home">${logo}</a>
    <nav class="hd__nav" aria-label="Primary">${nav}</nav>
    <div class="hd__right">${book('Book $99 Discovery', 'nr-btn nr-btn--gold hd__cta')}<button class="hd__menu" type="button" aria-label="Menu" aria-expanded="false" data-menu><span></span></button></div>
  </div>
  <nav class="mnav" aria-label="Mobile">${nav}</nav>
</header>
<main>
<figure class="a3-hero a3-cover">
  ${hero.src
    ? `<img class="a3-cover__img" src="${A(hero.src)}" width="${hero.width}" height="${hero.height}" fetchpriority="high" loading="eager" decoding="async" alt="${esc(hero.alt)}"${hero.focus ? ` style="object-position:${esc(hero.focus)}"` : ''}>`
    : ''}
  <div class="a3-cover__in a3-wrap">
    <p class="crumbs"><a href="/">Home</a> / <a href="/blog">Blog</a> / <a href="/blog/${catSlug}">${esc(post.category)}</a> / <span>${esc(shortTitle)}</span></p>
    <a class="a3-cat" href="/blog/${catSlug}">${esc(post.category)}</a>
    <h1 class="a3-h1">${esc(post.title)}</h1>
    <p class="a3-sub">${post.subtitle}</p>
    ${hero.caption ? `<figcaption class="a3-cover__fc">${hero.caption}</figcaption>` : ''}
  </div>
</figure>
<header class="a3-hd"><div class="a3-wrap">
  <aside class="a3-note" aria-label="A note from ${esc(reviewer.name)}">
    ${post.note ? `<p class="a3-note__lbl">A note from ${esc(PEOPLE.nina.name)}</p>
    <blockquote><p>${post.note.text}</p></blockquote>` : ''}
    <div class="a3-note__sig">
      <img src="${A(author.photo)}" width="112" height="112" alt="${esc(author.name)}">
      <div class="a3-note__by"><p>${same
        ? `<a href="${author.url}"><b>Written and reviewed by ${esc(author.name)}</b></a>`
        : `<a href="${author.url}"><b>By ${esc(author.name)}</b></a> · Clinically reviewed by <a href="${reviewer.url}">${esc(reviewer.name)}</a>`}</p><p class="a3-by__m"><span>Published ${fmtDate(post.published)}</span>${post.lastReviewed ? `<span>Last reviewed ${fmtDate(post.lastReviewed)}</span>` : ''}<span>${post.readTime} min read</span></p></div>
      <div class="a3-share"><button type="button" class="a3-share__btn" data-share aria-expanded="false">Share</button><div class="a3-share__menu" hidden data-share-menu><button type="button" data-copy>Copy link</button><a href="sms:?&amp;body=${sms}">Text message</a></div></div>
    </div>
  </aside>
</div></header>

<div class="a3-wrap">
  <section class="a3-short" aria-labelledby="short">
    <h2 id="short">The short answer</h2>
    <p>${shortAnswer}</p>
    <ul>${post.shortAnswer.takeaways.map(k => `<li>${k}</li>`).join('')}</ul>
  </section>
  ${firstArticleImage}
</div>

<div class="a3-wrap a3-body">
  <aside class="a3-side">
    <details class="toc" open><summary>In this article</summary><ol>${toc}</ol></details>
    <div class="a3-sidebook"><p><b>See your scalp at 200x.</b> 30 minutes, $99, a time you choose.</p>${book('Book My $99 Discovery')}</div>
  </aside>

  <article class="a3-prose">
    ${body}

    ${post.faq?.length ? `<section id="faq" class="a3-faq"><h2>Frequently asked questions</h2>${post.faq.map(f => `<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</section>` : ''}

    ${post.references?.length ? `<section id="refs" class="a3-refs"><h2>References</h2><ol>
      ${post.references.map((r, i) => `<li id="ref-${i + 1}">${r.url ? `<a href="${esc(r.url)}" rel="noopener" target="_blank">${r.text}</a>` : (r.text || `[Source needed: ${r.claim}]`)} <a href="#cite-${i + 1}" aria-label="Back to text">↩</a></li>`).join('\n      ')}</ol></section>` : ''}

    <section class="a3-authors" aria-label="About the author and reviewer">
      ${same
        ? `<div class="a3-person"><img src="${A(author.photo)}" width="160" height="160" alt="${esc(author.name)}" loading="lazy"><div><p class="a3-person__role">Written and reviewed by</p><p class="a3-person__name"><a href="${author.url}">${esc(author.name)}</a></p><p>${author.bio}</p></div></div>`
        : [['Written by', author], ['Clinically reviewed by', reviewer]].map(([role, p]) => `<div class="a3-person"><img src="${A(p.photo)}" width="160" height="160" alt="${esc(p.name)}" loading="lazy"><div><p class="a3-person__role">${role}</p><p class="a3-person__name"><a href="${p.url}">${esc(p.name)}</a></p><p>${p.bio}</p></div></div>`).join('')}
      <p class="a3-pol"><a href="/editorial-policy">Editorial Policy</a><a href="/medical-review-policy">Medical Review Policy</a></p>
    </section>
  </article>
</div>

<section class="a3-next"><div class="wrap">
  <h2 class="a3-next__h">Up next</h2>
  ${next ? `<a class="a3-big" href="/blog/${next.slug}">${articleThumbnail(next)}<span class="a3-big__b"><span class="cat">${esc(next.category)} · ${next.readTime} min read</span><b>${esc(next.title)}</b><span>${esc(next.summary)}</span></span></a>` : ''}
  <div class="grid grid--even">${rest.map(card).join('')}</div>
</div></section>
<section class="offer offer--after offer--article" id="discovery">
  <div class="wrap">
    <div class="offer__card">
      <div>
        <p class="kicker">One visit. Real answers.</p>
        <h2>The $99 Hair &amp; Body <em>Discovery</em></h2>
        <p class="offer__meta">$99 · 30 minutes · Serving Greater Atlanta</p>
        <div class="pills"><span>No prep</span><span>One visit</span><span>Your time, your pick</span><span>No judgment</span><span>Serving all of Metro Atlanta</span></div>
      </div>
      <div class="col2">
        <ul class="offer__list"><li>One-on-one scalp health session with a certified trichologist</li><li>200x magnification read of your scalp, on screen, while you watch</li><li>A full-body biofeedback scan</li><li>Your Hair &amp; Body Discovery Report, delivered the next day</li></ul>
        <p class="promise"><b>Our promise</b>You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us.</p>
        <p class="offer__fine">Fully HSA/FSA eligible. 0% financing for qualified applicants.</p>
        <div class="offer__cta" data-offer-cta>${book('Book My $99 Hair &amp; Body Discovery')}<a class="phone" href="tel:+16785614522">(678) 561-4522</a></div>
      </div>
    </div>
  </div>
</section>
</main>
<footer class="ft">
  <div class="wrap">
    <div class="ft__grid">
      <div>${logo}<p style="margin:14px 0 0;max-width:30ch">Serving all of Metro Atlanta from Sandy Springs.</p></div>
      <div><h3>Quick Links</h3><ul><li><a href="/trichology">Trichology</a></li><li><a href="/treatments">Treatments</a></li><li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li></ul></div>
      <div><h3>Conditions We Treat</h3><ul><li><a href="/concerns/ccca">CCCA</a></li><li><a href="/concerns/traction-alopecia">Traction Alopecia</a></li><li><a href="/concerns/alopecia-areata">Alopecia Areata</a></li><li><a href="/concerns">All Concerns</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="/contact">Contact</a></li><li><a href="/editorial-policy">Editorial Policy</a></li><li><a href="/medical-review-policy">Medical Review Policy</a></li></ul></div>
      <div><h3>Connect</h3><address>8735 Dunwoody Place, Suite 290<br>Sandy Springs, GA 30350<br><a href="tel:+16785614522">(678) 561-4522</a><br>Monday to Saturday, 10:00 AM to 3:30 PM<br><a href="https://instagram.com/ninarossatl">@ninarossatl</a></address></div>
    </div>
    <p class="ft__disc">Educational information only. It does not replace care from your own prescriber, and nothing here is a reason to stop a medication you were prescribed.</p>
    <div class="ft__bottom"><span>© ${new Date().getFullYear()} Nina Ross Atlanta</span><span>Serving all of Metro Atlanta</span></div>
  </div>
</footer>
<div class="sticky" data-sticky data-hidden="true"><span><b>$99</b><small>Pick your time</small></span>${book('Book My $99 Discovery')}</div>
<script src="${A('js/blog.js?v=4')}" defer></script>
</body></html>
`;
}

// Content checks from the master standard. Returns a list of problems; build fails on errors.
const BANNED = ['miracle', 'quick fix', 'guaranteed', 'instant', 'one-size-fits-all', 'cheap', 'magic', 'secret', 'breakthrough', 'forever', '10K+', '98%', '100% science'];
export function lint(post) {
  const errors = [], warns = [];
  const need = ['slug', 'title', 'description', 'category', 'categorySlug', 'subtitle', 'published', 'readTime', 'author', 'reviewer', 'shortAnswer', 'body'];
  need.forEach(k => { if (post[k] == null) errors.push(`missing "${k}"`); });
  const text = JSON.stringify(post);
  if (/\u2014/.test(text)) errors.push('em dash found (not allowed)');
  if (/Nina Ross Hair Therapy/i.test(text)) errors.push('"Nina Ross Hair Therapy" is retired; use "Nina Ross Atlanta"');
  if (/biofeedback/i.test(text)) errors.push('biofeedback scan belongs only in the offer module; remove it from post content');
  if (/\bM\.?D\.?\b|dermatologist/.test(text.replace(/not a dermatologist/g, ''))) warns.push('mentions MD/dermatologist; Dr. Ross is ND only');
  if (/same[- ]week/i.test(text)) errors.push('"same week" is retired');
  if (/\/book\b/.test(text)) errors.push('use the booking lightbox, not /book links');
  BANNED.forEach(w => { if (new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(strip(text))) errors.push(`banned word: "${w}"`); });
  const sa = strip(post.shortAnswer?.text).split(' ').length;
  if (sa < 40 || sa > 60) warns.push(`short answer is ${sa} words (target 40 to 60)`);
  if ((post.shortAnswer?.takeaways || []).length !== 3) warns.push('short answer should have exactly 3 takeaways');
  if (post.faq && (post.faq.length < 4 || post.faq.length > 6)) warns.push(`FAQ has ${post.faq.length} questions (target 4 to 6)`);
  const bookings = (post.body || []).filter(b => b.type === 'booking').length;
  if (bookings !== 1) warns.push(`${bookings} inline booking cards (use exactly 1, about two-thirds down)`);
  const vids = (post.body || []).filter(b => b.type === 'video').length;
  if (vids > 1) warns.push(`${vids} videos in body (use at most 1)`);
  const cites = new Set([...text.matchAll(/\{cite:(\d+)\}/g)].map(m => +m[1]));
  const refs = (post.references || []).length;
  cites.forEach(n => { if (n > refs) errors.push(`{cite:${n}} has no matching reference`); });
  if (/results?|regrow|grow back|return toward/i.test(strip(text)) && !/Results not typical\. Individual results will vary\./.test(text)) warns.push('outcomes mentioned without "Results not typical. Individual results will vary."');
  return { errors, warns };
}
