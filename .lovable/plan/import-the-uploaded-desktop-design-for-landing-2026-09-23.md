# Import the uploaded desktop design for `/landing`

## Goal
Match the uploaded Nina Ross Atlanta landing page on desktop while keeping the current mobile and tablet page unchanged.

## Implementation
1. Keep the existing mobile/tablet stylesheet and markup behavior as the baseline through 999px.
2. Add the uploaded desktop-only layout layer at 1000px and above, including its navigation, multi-column sections, grids, spacing, typography, and desktop interactions.
3. Merge only desktop-required markup additions, ensuring every added desktop element is hidden or layout-neutral below 1000px.
4. Add the uploaded desktop-specific images through the site asset flow and scope their use so existing mobile/tablet images remain unchanged.
5. Preserve the current Vimeo video, booking lightbox behavior, CTA destination, metadata, and `/landing` route.

## Verification
- Compare the rendered desktop page against the uploaded design at 1200px and wider.
- Compare mobile and tablet screenshots before and after at 390px and 768px to confirm no visual changes.
- Test navigation, FAQ, results, Vimeo, and booking popup interactions.
- Confirm the page has no console, runtime, network, or build errors.
