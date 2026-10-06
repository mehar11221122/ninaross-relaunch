# Rebuild every blog article with one reusable template

## Goal
Replace the 14 hand-built article pages with one shared Nina Ross Atlanta article template. Each article will come from a structured JSON file, while `/blog` and the five category pages keep their existing purpose and URLs.

## What will change

### 1. Structured article content
- Add one JSON file per published post under `src/content/posts/`, using the uploaded potassium file as the schema.
- Add the uploaded `_catalog.json` as the article directory for related and “Up Next” cards.
- Migrate the existing approved text from all 14 article routes into this structure without adding clinical claims.
- Keep missing photos, videos, captions, review dates, and references as explicit labeled slots or `[Source needed: …]` entries.

### 2. One article route and template
- Refactor `/blog/$segment` so it can distinguish a known category from a known article slug.
- Known categories continue to render category hubs; known article slugs render the shared article template; anything else returns the existing 404 state.
- Remove the 14 duplicate hand-built article route files after their content is migrated. Existing Shopify redirect routes remain intact.
- Eliminate the current route-collision warnings caused by dynamic links resolving to duplicate static article routes.

### 3. Shared editorial design
- Reuse the compact Nina Ross Atlanta blog header and footer from the blog index, with no Admin link.
- Build the fixed article order from the uploaded specification: full-bleed hero, Doctor’s Note/byline, Short Answer, article body, FAQ, references, author/reviewer, Up Next, related articles, one Discovery offer, footer.
- Use one cream editorial background, Montserrat hierarchy, subtle dividers, generous spacing, and a roughly 680px reading column.
- Desktop receives a sticky table of contents and compact booking card. Mobile receives a collapsible contents menu and a non-obstructive sticky booking bar.
- Add the reading progress bar after the hero, active-section highlighting, copy-link and text-message sharing, and the existing global booking lightbox.

### 4. Reusable article blocks
Create one renderer for each approved block type:
- Paragraphs, H2/H3 headings, citations, pull quotes
- ◆ attention and ○ calm callouts
- Timelines, checklists, food grids, comparison tables
- Labeled hero/trichoscopy/image slots with captions and fixed dimensions
- Poster-first video blocks that never autoplay
- One slim topic-specific inline booking card
- Defined “Go deeper” links

All written content, FAQs, reference placeholders, and links remain present in the server-rendered HTML without requiring JavaScript.

### 5. Images and media
- Use the existing permission-cleared Dr. Nina Ross portrait for the note/byline and author area.
- Since the uploaded archive contains JSON but no hero or trichoscopy image files, render clearly labeled `HERO-[slug]`, `TRICHO-[slug]-01`, and `TRICHO-[slug]-02` slots wherever sources are empty or unavailable.
- Do not invent video IDs or use stock/AI faces. Empty videos render an honest labeled poster slot without a fake play action.
- Real hero images will load eagerly with high priority; all below-fold media will lazy-load with fixed dimensions.

### 6. Metadata, schema, and static HTML
- Generate each article’s unique title, description, author meta, canonical URL, Open Graph fields, and Twitter fields from its JSON.
- Generate `MedicalWebPage`, `BreadcrumbList`, `FAQPage`, and `VideoObject` only when real video data exists.
- Keep the biofeedback scan out of structured data.
- Pre-render the 14 concrete article URLs during builds so article copy, FAQ answers, and schema are delivered as HTML.
- Preserve the canonical host `https://www.ninaross.co` and the existing legacy redirects.

### 7. Content validation
Add a build-time validator for article JSON that:
- Blocks retired branding, em dashes, `/book` links, banned claims/phrases, and post-authored biofeedback copy.
- Warns when the Short Answer is outside 40–60 words, takeaways are not exactly three, FAQ count is outside 4–6, inline booking count is not one, or more than one body video is present.
- Validates citation markers and related slugs.
- Applies validation to article-authored JSON only, so the fixed approved Discovery offer can still name its included biofeedback scan.

## Verification
- Confirm the potassium article matches the uploaded article structure on 390px mobile and 1280px desktop.
- Verify sticky contents, active section state, progress bar, sharing, mobile contents menu, and every booking button.
- Verify all 14 article URLs render from JSON, all five category pages still work, and unknown slugs return 404.
- Inspect generated HTML for article text, FAQ answers, canonical metadata, and schema.
- Confirm the global site header/footer do not duplicate the dedicated article header/footer.
- Confirm there are no build, runtime, console, route-collision, or broken-link errors.

## Known content gaps retained as slots
- Permission-cleared hero and 200x trichoscopy images for each post
- Real @ninarossatl video IDs/files and poster frames
- Real source citations
- Confirmed last-reviewed dates where absent
