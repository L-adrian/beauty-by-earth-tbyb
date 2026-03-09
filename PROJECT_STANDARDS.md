# BBE Section Standards (Project Memory)

These standards are required for all custom `bbe-*` Shopify theme sections.

## Core rules
- Mobile-first implementation first, then scale up at `768px` and desktop breakpoints.
- Zero layout shift targets: always provide image dimensions and responsive `widths`/`sizes`.
- Follow Shopify section schema structure strictly: `name`, `tag`, `class`, `settings`, `blocks`, `presets` only.
- Every setting and block setting must include a `default` when the setting type supports defaults.
- Every section with blocks must include default block instances in `presets`.

## Required global section settings
- `section_max_width`
- `content_padding_y`
- `background_color`
- `text_color`
- `button_style` where the section has primary CTA buttons

## Required interaction setting IDs
- Reviews carousel: `review_autoplay`, `review_autoplay_seconds`
- FAQ accordion: `faq_single_open`
- UGC gallery arrows: `ugc_show_arrows`

## Accessibility
- Keyboard navigation for sliders/carousels/accordions.
- Proper `aria-label`, `aria-controls`, `aria-expanded`, and `aria-live` behavior.
- Visible focus states for all interactive elements.

## Performance
- Prefer native browser features and vanilla JS.
- Lazy-load non-critical media.
- Avoid third-party JS libraries for section interactions.
