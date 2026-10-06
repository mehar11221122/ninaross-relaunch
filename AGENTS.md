<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Blog article JSON `hero` data is the single source for article heroes and thumbnails, preventing mismatched imagery across listings.
- Imported static page designs are rendered through a dedicated adapter module so their approved markup, shared interactions, and asset mappings remain isolated from route metadata.
- The Videos page uses its imported static design through the same adapter pattern, with only verified video metadata emitted in schema.
- One global header and footer for every page come from `src/lib/site-chrome.ts` (HTML strings, values from trust.ts); static pages swap theirs in via `applySiteChromeToDocument`, kit pages via `applySiteChrome`, React pages via `GlobalChrome.tsx`. Why: a single source keeps nav, logo and CTA identical site-wide.
- Run `bun run qa:launch` before launch; raw template variables, unfinished dates, mock reviews, missing-image notes, and coming-soon copy are release blockers.
