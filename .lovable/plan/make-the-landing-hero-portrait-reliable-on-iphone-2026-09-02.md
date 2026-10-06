# Make the landing hero portrait reliable on iPhone

## Goal
Ensure the main hero portrait is visibly rendered on the published `/landing` page across iPhone browsers, while preserving the current mobile design and the scalp-image overlay.

## Implementation
1. Replace the portrait’s current absolute-positioned, embedded-data image with a normal eager JPEG image element using the existing validated `960×540` file.
2. Give the portrait wrapper an explicit mobile height rather than deriving it through the current `svh` flex-shrink chain.
3. Remove animation, filter, transform, and compositing effects from the portrait layer only; retain the rest of the hero styling and motion.
4. Keep the scalp circle positioned over the portrait and preserve the existing crop, arch, spacing, copy, statistics, and CTA behavior.
5. Version the landing stylesheet and portrait URL to prevent previously published mobile caches from serving the old implementation.

## Verification
- Test the fresh published-style route at iPhone viewport sizes, including 390×844 from the supplied screenshot.
- Confirm the portrait is a painted, nonzero-size image rather than only a present DOM element.
- Confirm the scalp overlay, headline, CTA, and below-the-fold transition retain their intended positions.
- Check the build diagnostics before completion.

## Technical note
Chrome, Brave, and Safari on the same iPhone all use Apple’s WebKit rendering engine. The fix therefore removes the shared WebKit-sensitive combination of an absolutely positioned image, a flex-computed `svh` height, animation/compositing, and a CSS filter instead of treating the browsers as separate rendering engines.
