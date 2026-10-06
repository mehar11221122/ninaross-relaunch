# Next.js conversion todo

Constraints: one page at a time · section-by-section · exact HTML fidelity · keep responsive · keep source HTML until approved · Cloudinary URLs · no Lovable git-history rewrite.

## Foundation

- [x] Scaffold Next.js App Router alongside current site (same URLs, Cloudinary, env, `trust.ts`, `cdn.ts`, favicon)
- [x] Port global chrome (`site-chrome.ts` + CSS/JS) into Next root layout

## Core pages (21)

- [x] `/` — cut over: Next owns `next/content/home/index.html`; public landing HTML removed; TanStack `/` redirects to Next
- [x] `/black-trichologist-atlanta` — cut over
- [x] `/ccca-treatment-atlanta` — cut over
- [x] `/hair-loss-treatment-atlanta` — cut over
- [x] `/traction-alopecia-treatment-atlanta` — cut over
- [x] `/alopecia-areata-doctor-atlanta` — cut over
- [x] `/prp-hair-treatment-atlanta` — cut over
- [x] `/hair-doctor-atlanta` — cut over
- [x] `/hair-restoration-sandy-springs` — cut over
- [x] `/trichology` — kit on Next; TanStack redirects
- [x] `/functional-medicine` — cut over
- [x] `/about` — kit on Next; TanStack redirects
- [x] `/contact` — text page on Next; TanStack redirects
- [x] `/book` — text page on Next; TanStack redirects
- [x] `/faq` — text page on Next; TanStack redirects
- [x] `/videos` — kit on Next; TanStack redirects
- [x] `/concerns` — hub on Next; TanStack redirects
- [x] `/treatments` — hub on Next; TanStack redirects
- [x] `/blog` — index on Next; TanStack redirects
- [x] `/editorial-policy` — on Next; TanStack redirects
- [x] `/medical-review-policy` — on Next; TanStack redirects

## Concerns (18)

- [x] `/concerns/ccca`
- [x] `/concerns/lichen-planopilaris`
- [x] `/concerns/alopecia-areata`
- [x] `/concerns/lichen-planus`
- [x] `/concerns/hormonal-hair-loss`
- [x] `/concerns/pcos-hair-loss`
- [x] `/concerns/excess-dht`
- [x] `/concerns/female-hair-loss`
- [x] `/concerns/male-pattern-baldness`
- [x] `/concerns/postpartum-hair-loss`
- [x] `/concerns/folliculitis`
- [x] `/concerns/seborrheic-dermatitis`
- [x] `/concerns/scalp-bumps`
- [x] `/concerns/traction-alopecia`
- [x] `/concerns/trichotillomania`
- [x] `/concerns/anagen-effluvium`
- [x] `/concerns/telogen-effluvium`
- [x] `/concerns/medication-hair-loss`

## Treatments (8)

- [x] `/treatments/exosome-therapy`
- [x] `/treatments/iv-nutrient-therapy`
- [x] `/treatments/fusion-mesotherapy`
- [x] `/treatments/microneedling`
- [x] `/treatments/growth-factors-therapy`
- [x] `/treatments/prp-therapy`
- [x] `/treatments/red-light-therapy`
- [x] `/treatments/restorative-therapy`

## Blog (17)

- [x] `/blog` (index)
- [x] `/blog/hair-loss`
- [x] `/blog/health-wellness`
- [x] `/blog/scalp-concerns`
- [x] `/blog/amino-acids-for-hair-regrowth`
- [x] `/blog/choosing-a-trichologist-near-me`
- [x] `/blog/hair-growth-hormones`
- [x] `/blog/hair-loss-and-potassium-deficiency`
- [x] `/blog/hair-loss-epidemic-among-black-women`
- [x] `/blog/how-to-stop-alopecia-areata-from-spreading`
- [x] `/blog/iron-deficiency-and-hair-loss`
- [x] `/blog/l-lysine-benefits-for-skin`
- [x] `/blog/magnesium-for-hair-growth`
- [x] `/blog/minoxidil-itchy-scalp`
- [x] `/blog/oily-scalp-and-hair-loss`
- [x] `/blog/stop-hair-loss-with-dht-blockers`
- [x] `/blog/traction-alopecia-reversibility`
- [x] `/blog/trichologist-for-black-hair`
- [x] Legacy `/blogs/*` redirects (301 via `next.config.ts`)

## Ship

- [x] Metadata, JSON-LD, canonicals, `/sitemap.xml` (64 URLs), `/llms.txt`, robots
- [x] QA all 64 sitemap URLs vs Next; `QA_BASE_URL=http://localhost:3000 bun run qa:launch` passed

## Extras (not in the 64; keep if still needed)

- [x] `/privacy-policy` — on Next; TanStack redirects
- [x] `/policies` — on Next; TanStack redirects
- [x] `/landing` — redirects to Next `/`
- [x] `/landing-2` — on Next (noindex); TanStack redirects; source HTML kept in `public/landing-2`
- [ ] `/auth` — stays on TanStack (Supabase admin); not part of public conversion
