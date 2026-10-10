# Vercel redirect setup — read before cutover

`vercel.json` covers the path-to-path 301 map (static pages, blog categories, all 16 concern mappings, root-level backlinked URLs, collision fixes, the frozen-winner posts, and a catch-all `/blogs/:category/:slug → /blog/:slug` for the long tail).

**Deploy note:** Production is built from the `next/` app root. Keep `vercel.json` in both the repo root (source of truth) and `next/vercel.json` (what the Vercel deploy uploads). 410s for retired Shopify URLs live in `next/src/middleware.ts`.

Verify / classify helpers:
- `bun scripts/verify-redirects.mjs [baseUrl]`
- `bun scripts/classify-legacy-blogs.mjs` → writes `scripts/legacy-blog-redirect-report.json`

Three things `vercel.json` redirects can NOT do — handle these separately:

## 1. Host canonicalization (apex → www, http → https)
Do this in the **Vercel dashboard**, not in `vercel.json`. When you add the domain:
- Add both `ninaross.co` and `www.ninaross.co`.
- Set **`www.ninaross.co` as the primary/production domain.**
- Vercel then auto-301s `ninaross.co` → `www.ninaross.co` and forces HTTPS.
This is RULE 0. Confirm with `curl -I https://ninaross.co` after DNS → expect `301` to the www host.

## 2. 410 Gone for retired Shopify system URLs
`vercel.json` redirects cannot return a 410. Add **edge middleware** that returns `410` for:
`/collections/*` (except `/collections/all`, which is a redirect above), `/products/*`, `/cart`, `/checkout`, `/account/*`.
(If any `/products/*` URL turns out to hold real backlinks, 301 it to the closest treatment instead.)

## 3. 301 vs 308
`"permanent": true` emits a **308** (permanent). Google treats 308 as equivalent to 301 and passes link equity, so this is fine for SEO. If you specifically want literal `301` status codes, implement the map in edge middleware with `Response.redirect(url, 301)` instead of `vercel.json`.

## Still to complete before cutover
- **Classify the remaining Shopify blog posts.** Done against live `sitemap_articles_1.xml` (102 articles). Explicit maps + treatment remaps: **53 land on real pages**. **49 catch-all targets have no matching `/blog/:slug` yet** — leave as redirect→404 until content is migrated or Ahrefs shows traffic/backlinks worth remapping. Report: `next/scripts/legacy-blog-redirect-report.json`. Do not force bad matches.
- **Spam/injected URLs** (kissanime, adult paths, `/*.php`, `/404.html?CFID=`): handled in `next/src/middleware.ts` (410 + `noindex`). Still disavow in GSC/Ahrefs as needed.
- **DNS cutover (manual):** Point `ninaross.co` + `www.ninaross.co` at Vercel; set **www as primary** in the project Domains UI; submit `https://www.ninaross.co/sitemap.xml` in GSC; request indexing for money pages; watch 404 spikes week 1.

## Verify after deploy (before DNS cutover)
Run on the vercel.app deploy (redirects fire there too):
- `curl -I https://ninarosshair.vercel.app/pages/black-trichologist-atlanta` → 308/301 to `/black-trichologist-atlanta`
- Same for `/blogs/hair-loss/what-is-folliculitis` → `/concerns/folliculitis`, `/hair-extensions-salons-atlanta-ga` → `/trichology`, `/book-now` → `/book`
- Single hop, correct destination, no chains. Then the redirect validation passes and you're clear to flip DNS.
