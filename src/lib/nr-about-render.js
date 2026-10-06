// Nina Ross Atlanta: /about. Entity anchor page (Organization + Person schema).
import { SITE, BOOK, esc, siteHeader, offerModule, siteFooter, pageTail } from './nr-render.js';

const abBook = (label, cls = 'nr-btn nr-btn--gold') => `<a class="${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book><span>${label}</span><span aria-hidden="true">→</span></a>`;

const FAQ = [
  ['What guides Dr. Nina Ross’s approach?', 'Dr. Nina Ross, ND, is a naturopathic doctor and a Double Board Certified Trichologist. Her whole-person approach connects what is visible on the scalp with the systems that support healthy hair.'],
  ['Who performs my evaluation?', 'A certified trichologist, one-on-one, for 30 minutes. Dr. Nina Ross designs and oversees the protocols the team follows as Clinical Director, so the standard is the same whoever you see.'],
  ['Where is the clinic?', '8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350, inside the Nina Ross Functional Medicine building, just off GA-400 near the Perimeter. Free parking at the building. Monday to Saturday, 10:00 AM to 3:30 PM. Serving all of Metro Atlanta.'],
  ['Do you work with textured hair?', 'Every day. Coils, locs, braids and relaxed hair each behave differently under magnification, and the team knows the difference between normal texture and damage. Protective styles welcome.'],
  ['Will I be sent somewhere else for the whole-body side?', 'No. Trichology and functional medicine sit under one roof, so the scalp read and the look at the systems behind it happen in the same visit. Everything stays in-house. We never refer out.']
];

export function renderAbout({ base = '' } = {}) {
  const A = p => base + p;
  const url = `${SITE}/about`;
  const org = `${SITE}/#organization`;
  const nina = `${SITE}/about#dr-nina-ross`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'AboutPage', '@id': `${url}#page`, url, name: 'About Nina Ross Atlanta', about: { '@id': org }, mainEntity: { '@id': nina }, primaryImageOfPage: `${SITE}/img/nina-portrait.webp` },
    { '@type': ['MedicalBusiness', 'LocalBusiness'], '@id': org, name: 'Nina Ross Atlanta', url: SITE, telephone: '+1-678-561-4522', image: `${SITE}/img/clinic-lobby.webp`, priceRange: '$$', medicalSpecialty: 'Trichology',
      address: { '@type': 'PostalAddress', streetAddress: '8735 Dunwoody Place, Suite 290', addressLocality: 'Sandy Springs', addressRegion: 'GA', postalCode: '30350', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: 33.9321, longitude: -84.3348 },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '15:30' }],
      areaServed: ['Sandy Springs', 'Atlanta', 'Dunwoody', 'Brookhaven', 'Roswell', 'Marietta', 'Decatur', 'Alpharetta'].map(n => ({ '@type': 'City', name: `${n}, GA` })),
      founder: [{ '@id': nina }, { '@id': `${SITE}/about#jamaal-lassiter` }],
      sameAs: ['https://www.instagram.com/ninarossatl', 'https://www.youtube.com/@ninarossatl', 'https://www.facebook.com/NinaRossATL', 'https://share.google/382XxnFKsSQA6jqo3'] },
    { '@type': 'Person', '@id': nina, name: 'Dr. Nina Ross', honorificSuffix: 'ND', url: `${url}#dr-nina-ross`, image: `${SITE}/img/nina-portrait.webp`,
      jobTitle: 'Founder and Clinical Director', worksFor: { '@id': org },
      description: 'Dr. Nina Ross, ND. Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director.',
      hasCredential: ['Doctor of Naturopathy (ND)', 'Double Board Certified Trichologist', 'PhD in Functional Drugless Medicine', 'Master Cosmetologist'].map(n => ({ '@type': 'EducationalOccupationalCredential', name: n })),
      knowsAbout: ['Trichology', 'Functional medicine', 'Central centrifugal cicatricial alopecia (CCCA)', 'Traction alopecia', 'Textured hair'],
      sameAs: ['https://www.instagram.com/ninarossatl'] },
    { '@type': 'Person', '@id': `${SITE}/about#jamaal-lassiter`, name: 'Jamaal Lassiter', jobTitle: 'Co-Founder and Chief Operating Officer', worksFor: { '@id': org } },
    { '@type': 'BreadcrumbList', itemListElement: [['Home', `${SITE}/`], ['About', url]].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
  ] };

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>About Nina Ross Atlanta | Trichology + Functional Medicine</title>
<meta name="description" content="Founded on one finding: most hair loss has internal root causes. Meet Dr. Nina Ross, ND, and the certified trichology team. Sandy Springs, GA.">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#101112">
<meta property="og:type" content="profile"><meta property="og:site_name" content="Nina Ross Atlanta">
<meta property="og:title" content="Whole-Body Trichology, Led by Dr. Nina Ross"><meta property="og:description" content="Trichology and functional medicine under one roof in Sandy Springs. Serving all of Metro Atlanta."><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/img/og-about.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="preload" as="image" href="${A('img/nina-portrait.webp')}" fetchpriority="high">
<link rel="stylesheet" href="${A('ds/styles.css')}"><link rel="stylesheet" href="${A('css/blog.css?v=6')}"><link rel="stylesheet" href="${A('css/about.css?v=1')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="is-about">
${siteHeader().replace(/<a href="\/blog" aria-current="page">/g, '<a href="/blog">').replace(/<a href="\/about">/g, '<a href="/about" aria-current="page">')}
<main>

<section class="ab-hero">
  <div class="wrap ab-hero__grid">
    <div class="ab-hero__txt">
      <p class="crumbs"><a href="/">Home</a> / <span>About</span></p>
      <h1 class="ab-h1">Whole-Body Trichology, Led by <em>Dr. Nina Ross</em></h1>
      <p class="ab-lede">This practice was founded on one finding: most hair loss has internal root causes. So trichology and functional medicine sit under one roof in Sandy Springs, where your scalp is read at 200x and the systems behind it are looked at in the same visit.</p>
      <div class="ab-ctas">${abBook('Book My $99 Hair &amp; Body Discovery')}</div>
      <p class="ab-where">Sandy Springs, GA · Serving all of Metro Atlanta</p>
    </div>
  </div>
</section>

<section class="ab-sec ab-insight" aria-labelledby="insight">
  <div class="wrap">
    <p class="kicker">The founding insight</p>
    <h2 class="ab-big" id="insight">Most hair loss has <em>internal</em> root causes.</h2>
    <div class="ab-cols">
      <p>Client after client arrived having already tried oils, serums, supplements and styling changes. The pattern underneath kept repeating. When thyroid function, iron status, hormones, medications or a period of real stress are driving the loss, work done only on the strand runs out of room.</p>
      <p>So the practice was built the other way around, and that is still the whole method. It's why the report exists, why images come from the same positions each visit, and why the internal picture is part of the first appointment instead of something suggested later.</p>
    </div>
    <ol class="ab-steps" id="method">
      <li><i aria-hidden="true">01</i><h3>Read the scalp properly</h3><p>At 200x, on screen, while you watch.</p></li>
      <li><i aria-hidden="true">02</i><h3>Look at the systems</h3><p>Thyroid, iron, hormones, medications and stress, in the same visit.</p></li>
      <li><i aria-hidden="true">03</i><h3>Treat what was found</h3><p>A plan that matches the cause, with every part of that care in-house.</p></li>
    </ol>
  </div>
</section>

<section class="ab-sec ab-sec--white" id="dr-nina-ross" aria-labelledby="drnina">
  <div class="wrap ab-bio">
    <figure class="ab-bio__img"><img src="${A('img/nina-portrait.webp')}" width="1200" height="1200" alt="Portrait of Dr. Nina Ross, ND, naturopathic doctor and founder of Nina Ross Atlanta" loading="lazy" decoding="async"></figure>
    <div class="ab-bio__txt">
      <p class="kicker">Founder and Clinical Director</p>
      <h2 class="ab-h2" id="drnina">Dr. Nina Ross, ND</h2>
      <ul class="ab-creds" aria-label="Credentials">
        <li>Doctor of Naturopathy (ND)</li><li>Double Board Certified Trichologist</li><li>PhD in Functional Drugless Medicine</li><li>Master Cosmetologist</li><li>Founder and Clinical Director</li>
      </ul>
      <p>Dr. Nina Ross chose naturopathic and functional medicine because it lets her treat the whole person, not just the strand. Naturopathic care looks at how the body's systems talk to each other (thyroid, iron, hormones, stress, sleep), and functional medicine asks why those systems are off before reaching for a fix. That's exactly the lens hair loss needs, because most shedding starts inside.</p><br>
      <p>Her naturopathic training is central to the method itself. She builds every protocol and sets the clinical standards the team follows, so the care is the same whoever you sit down with. Even when your scalp evaluation is performed by a certified trichologist on her team, she's the one who shaped what they're looking for and how they respond to it.</p><br>
      <p>Her focus areas are trichology and functional medicine, with particular depth in <a href="/concerns/ccca">CCCA</a> and <a href="/concerns/traction-alopecia">traction alopecia</a>, two of the conditions most often misread on textured hair.</p>
      <div class="ab-claims"><p><b>10 years</b><span>of specialized care</span></p><p><b>2,500+</b><span>clients seen</span></p><p><b>In-house</b><span>from the read through treatment. We never refer out.</span></p></div>
      <div class="ab-links"><a href="/trichology">What a trichologist does →</a><a href="/functional-medicine">The whole-body side →</a></div>
    </div>
  </div>
</section>

<section class="ab-sec" aria-labelledby="team">
  <div class="wrap">
    <p class="kicker">Who you sit with</p>
    <h2 class="ab-h2" id="team">The certified trichology team</h2>
    <p class="ab-lede ab-lede--dark">Your evaluation and your hands-on treatments are performed by certified trichologists: formal training in hair and scalp science, reading the strand, interpreting the follicle and scalp under magnification, and recognizing the patterns that separate one condition from another.</p>
    <div class="ab-chair">
      <div><h3>One-on-one, 30 minutes</h3><p>Time and explanation. Questions answered in plain language.</p></div>
      <div><h3>Your scalp on screen</h3><p>The trichologist talks through what is visible as it appears.</p></div>
      <div><h3>Findings in writing</h3><p>Written down for you, not described once and forgotten.</p></div>
      <div><h3>One standard</h3><p>The team follows the protocols Dr. Nina Ross sets, whoever you see.</p></div>
    </div>
    <p class="ab-honest"><span aria-hidden="true">○</span>Individual team member names, photos and bios are not published here yet. We would rather leave this honest than list people we have not confirmed.</p>
  </div>
</section>

<section class="ab-sec ab-sec--alt" aria-labelledby="two">
  <div class="wrap">
    <p class="kicker">The method</p>
    <h2 class="ab-h2" id="two">Two kinds of care, <em>one visit</em></h2>
    <p class="ab-lede ab-lede--dark">A plan that matches the cause, and a way to check whether it is working using your own baseline instead of a memory.</p>
    <div class="ab-two">
      <article><img src="${A('img/scope-healthy.webp')}" width="800" height="800" alt="Healthy hair follicles seen at 200x magnification during a Nina Ross Atlanta scalp analysis" loading="lazy"><div><h3>Trichology reads the scalp</h3><p>Whether follicular openings are preserved, how many hairs come from each one, miniaturization, inflammation and breakage pattern. This decides what is still possible and where to work.</p><a href="/trichology">Trichology at this clinic →</a></div></article>
      <article><img src="${A('img/functional-medicine-consult.webp')}" alt="Functional medicine consultation at Nina Ross Atlanta" loading="lazy" decoding="async" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block"><div><h3>Functional medicine reads the body</h3><p>Thyroid, iron, vitamin D, hormones, medications, and recent illness or stress. This decides whether the scalp work has the internal support to hold.</p><a href="/functional-medicine">The whole-body program →</a></div></article>
    </div>
    <div class="ab-links ab-links--row"><a href="/treatments">See all treatments →</a><a href="/concerns">Browse every condition →</a></div>
  </div>
</section>

<section class="ab-sec ab-sec--white" aria-labelledby="clinic">
  <div class="wrap ab-clinic">
    <div class="ab-clinic__txt">
      <p class="kicker">The clinic</p>
      <h2 class="ab-h2" id="clinic">Inside the Nina Ross Functional Medicine building</h2>
      <p>We're just off GA-400 near the Perimeter, with free parking at the building. The hair clinic sits inside the Nina Ross Functional Medicine building, which is why the whole-body side happens in the same visit.</p>
      <p>Walking in is quiet and private. You're taken to a treatment room, and the screen you'll watch your scalp on is right there. Sessions run one-on-one.</p>
      <address class="ab-nap"><b>Nina Ross Atlanta</b>8735 Dunwoody Place, Suite 290<br>Sandy Springs, GA 30350<br><a href="tel:+16785614522">(678) 561-4522</a><br>Monday to Saturday, 10:00 AM to 3:30 PM</address>
      <p class="ab-areas">Serving all of Metro Atlanta. Clients come to us from Sandy Springs, Atlanta, Dunwoody, Brookhaven, Roswell, Marietta, Decatur and Alpharetta.</p>
      <div class="ab-links"><a href="https://www.google.com/maps/search/?api=1&amp;query=8735+Dunwoody+Place+Suite+290+Sandy+Springs+GA+30350" target="_blank" rel="noopener">Directions →</a><a href="/contact">Hours and contact →</a><a href="/hair-restoration-sandy-springs">Hair restoration in Sandy Springs →</a></div>
    </div>
    <div class="ab-clinic__imgs">
      <figure><img src="${A('img/clinic-lobby.webp')}" width="717" height="956" alt="The lobby at Nina Ross Atlanta, Suite 290, with black leather chairs and framed line art" loading="lazy"><figcaption>The lobby, Suite 290</figcaption></figure>
      <figure><img src="${A('img/treatment-room.jpg')}" width="1086" height="1086" alt="A Nina Ross Atlanta practitioner in scrubs applying a Scalp Renew peptide complex to a client's scalp during an in-clinic treatment" loading="lazy" decoding="async" style="aspect-ratio:1"><figcaption>Treatment room</figcaption></figure>
    </div>
  </div>
</section>

<section class="ab-sec ab-sec--alt" aria-labelledby="jamaal" id="jamaal-lassiter">
  <div class="wrap ab-co">
    <figure class="ab-co__img"><img src="${A('img/jamaal-lassiter.jpg')}" width="1200" height="1200" alt="Portrait of Jamaal Lassiter, Co-Founder and Chief Operating Officer" loading="lazy" decoding="async"></figure>
    <div>
      <p class="kicker">Co-Founder</p>
      <h2 class="ab-h2" id="jamaal">Jamaal Lassiter</h2>
      <p class="ab-role">Co-Founder and Chief Operating Officer</p>
      <p>Jamaal leads service excellence and operations, which covers how the practice runs day to day: scheduling, the standard of care you receive from your first call through your report, and keeping the experience consistent for every client who walks in.</p>
    </div>
  </div>
</section>

<section class="ab-textured" aria-labelledby="textured">
  <div class="wrap">
    <p class="kicker">Built for textured hair</p>
    <h2 class="ab-big ab-big--light" id="textured">You shouldn't have to <em>explain your hair.</em></h2>
    <div class="ab-cols ab-cols--light">
      <p>Many of our clients have already sat through appointments where the first ten minutes went into explaining what a relaxer is, how locs are installed, or how often a sew-in gets taken down. That time is gone, and the read is often worse for it.</p>
      <p>Textured hair is read here every day. Coils, locs, braids and relaxed hair each behave differently under magnification, and the team knows normal texture from damage before the conversation starts. Questions about tension, timing and product come without commentary on your choices.</p>
    </div>
    <p class="ab-pills"><span>Protective styles welcome</span><span>Come as you are</span><span>No judgment</span></p>
  </div>
</section>

${offerModule()}

<section class="ab-sec" aria-labelledby="faq">
  <div class="wrap ab-faqwrap">
    <h2 class="ab-h2" id="faq">About the practice</h2>
    <div class="a3-faq">${FAQ.map(([q, a]) => `<details><summary><h3>${q}</h3></summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>

<section class="ab-close" id="book">
  <div class="wrap">
    <h2>The best way to know us is to <em>sit with us.</em></h2>
    <p>One small step: book the $99 Hair &amp; Body Discovery, meet a certified trichologist for 30 minutes, see your own scalp at 200x, and read your report the next day.</p>
    <div class="ab-ctas ab-ctas--c">${abBook('Book My $99 Hair &amp; Body Discovery')}<a class="ab-phone" href="tel:+16785614522">(678) 561-4522</a></div>
    <p class="ab-close__n">Pick a time that fits your week.</p>
  </div>
</section>
</main>
${siteFooter()}
${pageTail(A)}
</body></html>
`;
}
