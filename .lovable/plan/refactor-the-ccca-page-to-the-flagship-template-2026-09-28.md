# Refactor the CCCA page to the flagship template

## Goal
Make `/ccca-treatment-atlanta` use the same visual system, responsive layout, section hierarchy, cards, navigation, conversion panels, and interactions as `/black-trichologist-atlanta`, while preserving every existing CCCA-facing word exactly.

## Implementation
- Use the Black Trichologist page as the structural source of truth for the header, hero, section containers, grids, proof presentation, symptom cards, expertise section, Discovery panel, practitioner section, reviews, service area, FAQ, final call to action, footer, and mobile behavior.
- Recompose the existing CCCA sections and text inside those same structural patterns. Keep every CCCA heading, paragraph, label, CTA label, FAQ answer, disclaimer, and metadata value unchanged.
- Preserve the CCCA-specific images, links, structured data, booking-lightbox behavior, and canonical URL.
- Remove CCCA-only layout overrides where they conflict with the flagship template, retaining only narrowly necessary selectors for CCCA content that has no direct flagship equivalent.
- Keep the mobile hero requirement intact: clinic photo plus the “Scalp at 200x” circle at the top.

## Verification
- Compare both pages at desktop and mobile widths for matching hierarchy, spacing, typography, surfaces, card treatment, and navigation behavior.
- Confirm the CCCA page contains the same visible copy before and after the refactor.
- Test all real calls to action and section links, inspect browser errors, and confirm the preview build is clean.

## Technical note
The CCCA page is a static HTML bundle served by its existing TanStack route. The refactor will stay within that page bundle and its presentation dependencies; no backend or content-source changes are needed.
