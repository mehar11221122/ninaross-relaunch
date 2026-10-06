# Apply the uploaded design to `/blog`

## Goal
Recreate the uploaded Claude design on the main `/blog` page only, while leaving all category pages and individual articles unchanged.

## Implementation
1. Restyle the existing React `/blog` page to match the uploaded index design, including its dark navigation, editorial hero, wide featured article, category tabs with article counts, article grid, dark short-video band treatment, Discovery offer, author section, footer, and mobile sticky booking bar.
2. Keep the current 14 real posts, titles, excerpts, categories, URLs, review status, SEO metadata, canonical URL, and structured data. Use the existing featured-post flag rather than inventing content.
3. Use only provided or already approved imagery. Add the uploaded Nina portrait and blog artwork through the site asset flow where they belong. Do not fabricate article photos or video IDs; image slots without approved photography will use the design’s intentional branded treatment, and the short-video band will not claim playable videos.
4. Preserve the shared $99 Hair & Body Discovery copy, booking lightbox, CTA destination, credentials, address, phone number, and ND disclaimer from the site’s source of truth.
5. Scope all new styling and components to `/blog` so `/landing`, the homepage redirect, category hubs, and article pages do not change.

## Verification
- Compare `/blog` with the uploaded desktop design at the current 1199px viewport and at 1280px.
- Check the mobile layout at 390px, including navigation, tabs, cards, offer, and sticky CTA behavior.
- Test category links, article links, policy links, mobile navigation, and the booking lightbox.
- Confirm `/blog` metadata and structured data remain intact, and there are no build, console, runtime, or network errors caused by the redesign.
