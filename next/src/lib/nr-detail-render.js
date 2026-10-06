// Nina Ross Atlanta: detail template for /concerns/[slug] and /treatments/[slug].
// Same visual language as the hubs; reads family, number, color and related items from posts/_hubs.json.
import { SITE, BOOK, PEOPLE, esc, siteHeader, offerModule, siteFooter, pageTail } from './nr-render.js';

const dtBook = (label, cls = 'nr-btn nr-btn--gold') => `<a class="${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book><span>${label}</span><span aria-hidden="true">→</span></a>`;
const pad = n => String(n).padStart(2, '0');
const dtStrip = s => String(s ?? '').replace(/\{cite:\d+\}/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const dtQuickAnswer = (answer, format) => {
  const protectedAnswer = String(answer ?? '').replace(/\bDr\./g, 'Dr§');
  const sentences = protectedAnswer
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(sentence => sentence.replace(/Dr§/g, 'Dr.').trim())
    .filter(Boolean);

  if (sentences.length < 3) return `<p>${format(answer)}</p>`;

  const paragraphs = [];
  let current = [];
  let wordCount = 0;
  const targetWords = sentences.length >= 6 ? 42 : 52;

  for (const sentence of sentences) {
    const sentenceWords = dtStrip(sentence).split(/\s+/).filter(Boolean).length;
    if (current.length && wordCount + sentenceWords > targetWords && paragraphs.length < 2) {
      paragraphs.push(current.join(' '));
      current = [];
      wordCount = 0;
    }
    current.push(sentence);
    wordCount += sentenceWords;
  }
  if (current.length) paragraphs.push(current.join(' '));

  const rendered = paragraphs.map(paragraph => `<p>${format(paragraph)}</p>`);
  if (rendered.length === 1) return rendered[0];
  return `<div class="dt-qa__lead">${rendered[0]}<details class="dt-qa__more"><summary>Read the full answer <span aria-hidden="true">↓</span></summary><div>${rendered.slice(1).join('')}</div></details></div>`;
};

export function renderDetail(page, hubs, { base = '' } = {}) {
  const A = p => base + p;
  const hubKey = page.type === 'treatment' ? 'treatments' : 'conditions';
  const hub = hubs[hubKey];
  const url = `${SITE}${hub.base}/${page.slug}`;
  const idealFor = hubs.treatments.idealFor;

  // index every item in both hubs: number, family, color
  const idx = {};
  for (const k of ['conditions', 'treatments']) {
    let n = 0;
    hubs[k].families.forEach((f, fi) => f.items.forEach(i => { n++; idx[i.slug] = { ...i, n, fam: f, famIndex: fi, hub: hubs[k], href: `${hubs[k].base}/${i.slug}` }; }));
  }
  const me = idx[page.slug];
  if (!me) throw new Error(`"${page.slug}" is not in _hubs.json`);
  const fam = me.fam;
  const all = Object.values(idx).filter(i => i.hub === hub);
  const total = all.length;

  // cite markers
  const cites = new Set();
  const t = s => String(s ?? '').replace(/\{cite:(\d+)\}/g, (_, n) => { const f = !cites.has(n); cites.add(n); return `<sup><a href="#ref-${n}"${f ? ` id="cite-${n}"` : ''}>${n}</a></sup>`; });

  const seg = all.map(i => `<a href="${i.href}" style="--c:${i.fam.color}"${i.slug === page.slug ? ' class="is-me" aria-current="page"' : ''} aria-label="${pad(i.n)} ${esc(i.name)}"><b>${pad(i.n)}</b><span>${esc(i.name)}</span></a>`).join('');

  const card = i => {
    const pairs = (hubKey === 'conditions' ? Object.keys(idealFor).filter(x => idealFor[x].includes(i.slug)) : (idealFor[i.slug] || [])).filter(s => idx[s] && !idx[s].notOffered);
    return `<article class="hb-card" style="--c:${i.fam.color}">
        <p class="hb-card__n" aria-hidden="true">${pad(i.n)} · ${esc(i.fam.name)}</p>
        <h3><a href="${i.href}">${esc(i.name)}</a></h3>
        <p class="hb-card__s">${i.text}</p>
        <span class="hb-card__go" aria-hidden="true">Read about ${esc(i.name)} →</span>
      </article>`;
  };

  const sections = [];

  if (page.type === 'treatment') {
    const grid = (id, k, s, white) => `<section class="dt-sec${white ? ' dt-sec--white' : ''}" aria-labelledby="${id}">
  <div class="wrap">
    <p class="dt-k">${esc(k)}</p>
    <h2 class="dt-h2" id="${id}">${s.title}</h2>
    <ol class="dt-causes dt-causes--4">${s.items.map((c, n) => `<li><i aria-hidden="true">${pad(n + 1)}</i><h3>${esc(c.title)}</h3><p>${t(c.text)}</p></li>`).join('')}</ol>
    ${s.note ? `<p class="dt-note">${t(s.note)}</p>` : ''}
  </div>
</section>`;
    if (page.notOffered) sections.push(`<section class="dt-sec dt-sec--white"><div class="wrap"><p class="hb-call dt-notice"><span aria-hidden="true">◆</span>${page.notOffered}</p></div></section>`);
    if (page.benefits) sections.push(grid('benefits', page.benefits.kicker || 'What it does for you', page.benefits, false));
    if (page.how) sections.push(grid('how', page.how.kicker || 'How it works', page.how, true));
    if (page.insight) sections.push(`<section class="dt-insight" aria-labelledby="insight"><div class="wrap"><p class="dt-k">${esc(page.insight.kicker || 'What we see that others miss')}</p><h2 class="dt-h2" id="insight">${page.insight.title}</h2>${page.insight.paras.map(p => `<p class="dt-insight__p">${t(p)}</p>`).join('')}</div></section>`);
    if (page.expect) sections.push(`<section class="dt-sec" aria-labelledby="expect"><div class="wrap dt-more__in"><div><p class="dt-k">What to expect</p><h2 class="dt-h2" id="expect">${page.expect.title}</h2></div><ol class="dt-expect">${page.expect.steps.map((s, n) => `<li><i aria-hidden="true">${pad(n + 1)}</i><div><h3>${esc(s.title)}</h3><p>${t(s.text)}</p></div></li>`).join('')}</ol></div></section>`);
    if (page.realistic) sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="realistic"><div class="wrap"><p class="dt-k">What is realistic</p><h2 class="dt-h2" id="realistic">${page.realistic.title}</h2><div class="dt-more__b dt-real">${page.realistic.paras.map(p => `<p>${t(p)}</p>`).join('')}</div><p class="dt-results">Results not typical. Individual results will vary.</p></div></section>`);
    const fits = (idealFor[page.slug] || []).map(s => idx[s]).filter(Boolean);
    if (fits.length) sections.push(`<section class="dt-sec" aria-labelledby="ideal"><div class="wrap"><p class="dt-k">Ideal for</p><h2 class="dt-h2" id="ideal">${page.idealTitle || `Conditions it is <em>often considered for</em>`}</h2><div class="dt-rel">${fits.map(card).join('')}</div></div></section>`);
    if (page.notFor) sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="notfor"><div class="wrap dt-more__in"><div><p class="dt-k">Honest screening</p><h2 class="dt-h2" id="notfor">${page.notFor.title}</h2></div><ul class="dt-notfor">${page.notFor.items.map(x => `<li><span aria-hidden="true">◆</span><p>${t(x)}</p></li>`).join('')}</ul></div></section>`);
    if (page.welcome) sections.push(`<section class="ab-textured dt-welcome" aria-labelledby="welcome"><div class="wrap"><p class="kicker">${esc(page.welcome.kicker || 'You are welcome here')}</p><h2 class="ab-big ab-big--light" id="welcome">${page.welcome.title}</h2><div class="ab-cols ab-cols--light">${page.welcome.paras.map(p => `<p>${p}</p>`).join('')}</div></div></section>`);
    if (!page.notOffered) sections.push(offerModule());
    sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="direction"><div class="wrap"><div class="hb-care dt-dir"><div class="hb-care__who"><img src="${A('img/nina-portrait.webp')}" width="1200" height="1200" alt="Dr. Nina Ross, ND, naturopathic doctor who guides every Nina Ross Atlanta hair plan" loading="lazy"><div><h2 id="direction">Clinical direction</h2><p>Hands-on treatments are performed by certified trichologists, with clinical direction from <a href="/about#dr-nina-ross">Dr. Nina Ross, ND</a>, Double Board Certified Trichologist. Everything is handled in-house.</p><p class="hb-care__fine">10 years of specialized care · 2,500+ clients seen · All care in-house</p></div></div></div></div></section>`);
    if (page.faq?.length) sections.push(`<section class="dt-sec" aria-labelledby="faq"><div class="wrap dt-faq"><div><p class="dt-k">Questions, answered</p><h2 class="dt-h2" id="faq">Honest answers <em>before you commit</em></h2></div><div class="a3-faq">${page.faq.map(f => `<details><summary><h3>${esc(f.q)}</h3></summary><p>${t(f.a)}</p></details>`).join('')}</div></div></section>`);
    if (page.references?.length) sections.push(`<section class="dt-refs" aria-labelledby="refs"><div class="wrap"><h2 id="refs">References</h2><ol>${page.references.map((r, k) => `<li id="ref-${k + 1}">${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.text}</a>` : r.text} <a href="#cite-${k + 1}" aria-label="Back to text">↩</a></li>`).join('')}</ol></div></section>`);
  } else {

  if (page.triage) sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="triage">
  <div class="wrap">
    <p class="dt-k">${esc(page.triage.kicker || 'Start here')}</p>
    <h2 class="dt-h2" id="triage">${page.triage.title}</h2>
    <div class="dt-rel">${page.triage.items.map((x, k) => `<article class="hb-card" style="--c:${fam.color}"><p class="hb-card__n" aria-hidden="true">${pad(k + 1)}</p><h3>${x.href ? `<a href="${x.href}">${esc(x.name)}</a>` : esc(x.name)}</h3><p class="hb-card__s">${x.text}</p>${x.href ? `<span class="hb-card__go" aria-hidden="true">Read more →</span>` : ''}</article>`).join('')}</div>
  </div>
</section>`);

  if (page.symptoms) sections.push(`<section class="dt-sec" aria-labelledby="noticing">
  <div class="wrap">
    <p class="dt-k">What you might be noticing</p>
    <h2 class="dt-h2" id="noticing">${page.symptoms.title}</h2>
    <p class="dt-lede">${page.symptoms.lede || 'Tap the one that sounds like you to see why it happens and how we figure it out.'}</p>
    <div class="dt-sym">${page.symptoms.items.map((it, k) => { const o = Array.isArray(it) ? { you: it[0], us: it[1] } : it; return `<details class="dt-sym__d"><summary><i aria-hidden="true">${pad(k + 1)}</i><q>${esc(o.you)}</q><span>${esc(o.us)}</span><em aria-hidden="true">✋🏾</em></summary>${o.why ? `<div class="dt-sym__b"><div><h3>Why it happens</h3><p>${t(o.why)}</p></div><div><h3>How we figure it out</h3><p>${t(o.check)}</p></div></div>` : ''}</details>`; }).join('')}</div>
    ${page.symptoms.draftNote ? `<span class="draft">${esc(page.symptoms.draftNote)}</span>` : ''}
  </div>
</section>`);

  if (page.causes) sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="causes">
  <div class="wrap">
    <p class="dt-k">What causes it</p>
    <h2 class="dt-h2" id="causes">${page.causes.title}</h2>
    <ol class="dt-causes">${page.causes.items.map((c, k) => `<li><i aria-hidden="true">${pad(k + 1)}</i><h3>${esc(c.title)}</h3><p>${t(c.text)}</p></li>`).join('')}</ol>
  </div>
</section>`);

  if (page.more) sections.push(`<section class="dt-sec dt-more" aria-labelledby="more">
  <div class="wrap dt-more__in">
    <div><p class="dt-k">${esc(page.more.kicker || 'More detail')}</p><h2 class="dt-h2" id="more">${page.more.title}</h2></div>
    <div class="dt-more__b">${page.more.paras.map(p => `<p>${t(p)}</p>`).join('')}</div>
  </div>
</section>`);

  if (page.insight) { const s = page.insight; sections.push(`<section class="dt-insight" aria-labelledby="insight">
  <div class="wrap">
    <p class="dt-k">${esc(s.kicker)}</p>
    <h2 class="dt-h2" id="insight">${s.title}</h2>
    ${(s.paras || []).map(p => `<p class="dt-insight__p">${t(p)}</p>`).join('')}
    ${s.figures?.filter(f => f.src).length ? `<div class="dt-vs">${s.figures.filter(f => f.src).map(f => `<figure><img src="${A(f.src)}" width="${f.width || 1448}" height="${f.height || 1086}" alt="${esc(f.alt || f.label)}" loading="lazy"><figcaption><b>${esc(f.label)}</b>${esc(f.caption)}</figcaption></figure>`).join('<span class="dt-vs__x" aria-hidden="true">vs</span>')}</div>` : ''}
    ${s.table ? `<div class="a3-table dt-table"><table><thead><tr>${s.table.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
    ${s.text ? `<p class="dt-insight__t">${t(s.text)}</p>` : ''}
  </div>
</section>`); }

  if (page.care) { const c = page.care; sections.push(`<section class="dt-sec" aria-labelledby="care">
  <div class="wrap dt-care">
    <div>
      <p class="dt-k">How we treat it</p>
      <h2 class="dt-h2" id="care">${c.title}</h2>
      <p class="dt-care__t">${t(c.text)}</p>
      ${c.steps ? `<ol class="dt-steps">${c.steps.map((s, k) => `<li><i aria-hidden="true">${pad(k + 1)}</i>${esc(s)}</li>`).join('')}</ol>` : ''}
      ${c.links?.length ? `<p class="dt-links">${c.links.map(l => `<a href="${l.href}">${esc(l.label)} →</a>`).join('')}</p>` : ''}
    </div>
    <div class="hb-cards dt-care__cards">${c.treatments.map(x => { const i = idx[x.slug]; return `<article class="hb-card" style="--c:${i.fam.color}"><p class="hb-card__n" aria-hidden="true">Treatment · ${esc(i.fam.name)}</p><h3><a href="${i.href}">${esc(i.name)}</a></h3><p class="hb-card__s">${esc(x.text || i.text)}</p><span class="hb-card__go" aria-hidden="true">See ${esc(i.name)} →</span></article>`; }).join('')}</div>
  </div>
</section>`); }

  if (!page.offerLate) sections.push(offerModule());

  if (page.welcome) sections.push(`<section class="ab-textured dt-welcome" aria-labelledby="welcome">
  <div class="wrap">
    <p class="kicker">You are welcome here</p>
    <h2 class="ab-big ab-big--light" id="welcome">${page.welcome.title}</h2>
    <div class="ab-cols ab-cols--light">${page.welcome.paras.map(p => `<p>${p}</p>`).join('')}</div>
    <p class="ab-pills"><span>10 years of specialized care</span><span>2,500+ clients seen</span><span>No judgment</span></p>
  </div>
</section>`);

  if (page.related?.length) sections.push(`<section class="dt-sec" aria-labelledby="related">
  <div class="wrap">
    <p class="dt-k">Related ${hub.nounPlural}</p>
    <h2 class="dt-h2" id="related">Often confused <em>with this</em></h2>
    <div class="dt-rel">${page.related.map(s => idx[s]).filter(Boolean).map(card).join('')}</div>
    <p class="dt-rel__all"><a href="${hub.base}">See all ${total} ${hub.nounPlural} →</a></p>
  </div>
</section>`);

  if (page.faq?.length) sections.push(`<section class="dt-sec dt-sec--white" aria-labelledby="faq">
  <div class="wrap dt-faq">
    <div><p class="dt-k">Questions, answered</p><h2 class="dt-h2" id="faq">Honest answers <em>before you commit</em></h2></div>
    <div class="a3-faq">${page.faq.map(f => `<details><summary><h3>${esc(f.q)}</h3></summary><p>${t(f.a)}</p></details>`).join('')}</div>
  </div>
</section>`);

  if (page.offerLate) sections.push(offerModule());

  if (page.references?.length) sections.push(`<section class="dt-refs" aria-labelledby="refs"><div class="wrap">
  <h2 id="refs">References</h2>
  <ol>${page.references.map((r, k) => `<li id="ref-${k + 1}">${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.text}</a>` : (r.text || `[Source needed: ${esc(r.claim)}]`)} <a href="#cite-${k + 1}" aria-label="Back to text">↩</a></li>`).join('')}</ol>${page.results ? '<p class="dt-results">Results not typical. Individual results will vary.</p>' : ''}
</div></section>`);

  if (!page.references?.length && page.results) sections.push('<section class="dt-refs"><div class="wrap"><p class="dt-results">Results not typical. Individual results will vary.</p></div></section>');
  }

  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'MedicalWebPage', '@id': `${url}#page`, url, name: dtStrip(page.h1), description: page.description,
      about: { '@id': `${url}#${page.type}` }, ...(page.lastReviewed ? { lastReviewed: page.lastReviewed } : {}),
      reviewedBy: { '@type': 'Person', name: PEOPLE.nina.name, url: SITE + PEOPLE.nina.url },
      publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Nina Ross Atlanta', url: SITE } },
    page.type === 'treatment'
      ? { '@type': 'MedicalTherapy', '@id': `${url}#treatment`, name: page.name, description: dtStrip(page.quickAnswer) }
      : { '@type': 'MedicalCondition', '@id': `${url}#condition`, name: page.name, alternateName: page.alternateName, description: dtStrip(page.quickAnswer),
          signOrSymptom: (page.symptoms?.items || []).map(it => ({ '@type': 'MedicalSignOrSymptom', name: Array.isArray(it) ? it[1] : it.us })),
          possibleTreatment: (page.care?.treatments || []).map(x => ({ '@type': 'MedicalTherapy', name: idx[x.slug].name, url: SITE + idx[x.slug].href })) },
    { '@type': 'BreadcrumbList', itemListElement: [['Home', `${SITE}/`], [hub.crumb, `${SITE}${hub.base}`], [page.name, url]].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    ...(page.faq?.length ? [{ '@type': 'FAQPage', mainEntity: page.faq.filter(f => !/\[PASTE/.test(f.a)).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: dtStrip(f.a) } })) }] : [])
  ] };

  const header = siteHeader()
    .replace(/<a href="\/blog" aria-current="page">/g, '<a href="/blog">')
    .replace(new RegExp(`<a href="${hub.base}">`, 'g'), `<a href="${hub.base}" aria-current="page">`);
  const hero = page.hero || {};

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.seoTitle)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#101112">
<meta property="og:type" content="article"><meta property="og:site_name" content="Nina Ross Atlanta">
<meta property="og:title" content="${esc(page.seoTitle)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/img/og-${page.slug}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${A('ds/styles.css')}"><link rel="stylesheet" href="${A('css/blog.css?v=6')}"><link rel="stylesheet" href="${A('css/about.css?v=1')}"><link rel="stylesheet" href="${A('css/hub.css?v=2')}"><link rel="stylesheet" href="${A('css/detail.css?v=4')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="is-hub is-detail is-article" data-page="${esc(page.slug)}">
${header}
<main>
<section class="hb-hero dt-hero${page.cover?.src ? ' dt-hero--cover' : ''}" style="--c:${fam.color}">${page.cover?.src ? `<img class="dt-hero__bg" src="${A(page.cover.src)}" width="${page.cover.width || 1600}" height="${page.cover.height || 900}" alt="" aria-hidden="true" fetchpriority="high" loading="eager" decoding="async"${page.cover.focus ? ` style="object-position:${esc(page.cover.focus)}"` : ''}>` : ''}
  <i class="hb-hero__num" aria-hidden="true">${pad(me.n)}</i>
  <div class="wrap hb-hero__grid${hero.src ? '' : ' hb-hero__grid--solo'}">
    <div>
      <p class="crumbs"><a href="/">Home</a> / <a href="${hub.base}">${esc(hub.crumb)}</a> / <a href="${hub.base}#${fam.id}">${esc(fam.name)}</a> / <span>${esc(page.name)}</span></p>
      <p class="dt-fam"><span aria-hidden="true"></span>${esc(fam.name)} · ${hub.noun} ${pad(me.n)} of ${total}</p>
      <h1 class="hb-h1 dt-h1">${page.h1}</h1>
      <p class="hb-lede">${page.subtitle}</p>
      <p class="dt-rev"><img src="${A('img/nina-portrait.webp')}" width="96" height="96" alt="Dr. Nina Ross, ND, naturopathic doctor who guides every Nina Ross Atlanta hair plan"><span><a href="/about#dr-nina-ross">Clinically reviewed by Dr. Nina Ross, ND</a><small>Serving all of Metro Atlanta</small></span></p>
      <div class="hb-ctas">${dtBook('Book My $99 Hair &amp; Body Discovery')}<a class="hb-phone" href="tel:+16785614522">(678) 561-4522</a></div>
    </div>
    ${hero.src ? `<figure class="hb-hero__img dt-lens"><img src="${A(hero.src)}" width="${hero.width}" height="${hero.height}" alt="${esc(hero.alt)}" fetchpriority="high" loading="eager"><figcaption>${esc(hero.caption || 'At 200x')}</figcaption></figure>` : ''}
  </div>
  <div class="wrap"><nav class="hb-index dt-index" aria-label="All ${total} ${hub.nounPlural}">${seg}</nav></div>
</section>

<div class="a3-wrap">
  <section class="a3-short dt-qa" aria-labelledby="qa">
    <h2 id="qa">Quick answer</h2>
    <div class="dt-qa__copy">${dtQuickAnswer(page.quickAnswer, t)}</div>
    ${page.takeaways?.length ? `<ul>${page.takeaways.map(k => `<li>${k}</li>`).join('')}</ul>` : ''}
  </section>
</div>

${sections.join('\n\n')}

<section class="ab-close hb-close">
  <div class="wrap">
    <h2>${page.close?.title || "Let's find out what your hair is <em>trying to tell you.</em>"}</h2>
    <p>${page.close?.text || "You'll see it, or the $99 is on us. Serving all of Metro Atlanta."}</p>
    <div class="ab-ctas ab-ctas--c">${dtBook('Book My $99 Hair &amp; Body Discovery')}<a class="ab-phone" href="tel:+16785614522">(678) 561-4522</a></div>
    <p class="dt-nap">Nina Ross Atlanta, 8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350. Monday to Saturday, 10:00 AM to 3:30 PM.</p>
  </div>
</section>
</main>
${siteFooter()}
${pageTail(A)}
</body></html>
`;
}
