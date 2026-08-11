# Design system

## Creative direction

**Premium Indian botanical provenance:** modern export credibility layered with restrained heritage cues. The visual language comes from archival maps, botanical line drawings, carved jali geometry, amber apothecary glass and natural stone—not religious iconography or a generic wellness/spa aesthetic.

## Colour tokens

```css
:root {
  --forest-950: #062b23;
  --forest-900: #083a30;
  --forest-800: #125344;
  --sage-500: #82966f;
  --leaf-400: #a8c76b;
  --ivory-50: #fbf7ed;
  --ivory-100: #f2ead9;
  --parchment-200: #dfcfad;
  --brass-500: #b88a2c;
  --brass-600: #967020;
  --ink-900: #17231e;
  --stone-500: #7f7b6f;
  --error: #9f3d32;
}
```

Use forest for large fields, ivory for reading surfaces, and brass only for emphasis. Maintain WCAG AA contrast for body text and controls.

## Typography

- Display: `Cormorant Garamond`, 600; fallback Georgia, serif.
- Interface/body: `Manrope`, 400/500/600; fallback system sans-serif.
- Eyebrows and navigation: uppercase, `0.10em`–`0.14em` tracking.
- Desktop H1: clamp(3.2rem, 5vw, 5.8rem), line-height 0.95.
- Body: 1rem–1.125rem, line-height 1.6.

## Layout

- Maximum content width: 1440px.
- Desktop grid: 12 columns; 24px gutters; 48–72px outer padding.
- Hero: 5 columns copy / 7 columns image at ≥1100px; minimum 650px tall.
- Section spacing: 104–136px desktop, 72–88px tablet, 56–72px mobile.
- Border radius: 0 for primary architecture; 18px for floating assurance cards.
- Fine rules: 1px brass at 45% opacity.

## Header

Two levels:

1. Ivory utility strip: sourcing statement left; AI Spec Consultant and Verify Batch COA right.
2. Forest navigation: brand at left, primary navigation centered/right, search control at end.

Desktop header may be sticky after the hero begins scrolling. Mobile uses one 64px forest row with brand mark, search and menu; utility actions move into the drawer.

## Homepage composition

1. Utility strip + navigation.
2. Split hero: forest/map copy panel and photographic asset.
3. Three assurance modules: Identity & markers, Export documentation, Traceable lots.
4. Four product-family cards over/near the flat-lay asset.
5. Provenance section with Mandsaur, Alleppey and Mysore.
6. Quality workflow: Specify → Match → Document → Pack → Dispatch.
7. Featured catalogue grid (8–12 products), then catalogue search.
8. Packaging routes.
9. B2B enquiry CTA.
10. Footer.

## Components

### Buttons

- Primary: brass fill, forest text, 48px min height.
- Secondary: transparent with brass border and ivory text on dark fields.
- Light-field secondary: transparent with forest border and forest text.
- Hover: translateY(-1px), subtle brightness change; no exaggerated glow.

### Product cards

- 4:3 image, category eyebrow, common name, botanical name in italic serif, available forms, enquiry arrow.
- Never promise stock. Use “Enquire for current lot availability.”

### Assurance card

- Forest-900 background, 1px brass border, 18px radius.
- Icon, concise title, 2–3 lines, optional text link.

### Forms

Quote form fields: name, company, country, email, phone/WhatsApp optional, product, form/grade, quantity, application, destination port/country, packaging preference, documentation needs, message, consent.

Do not request payment in the quote form. Display an acknowledgement with an enquiry reference.

## Motion

- 180–240ms ease-out transitions.
- Hero image scale-in no more than 1.015.
- Botanical map lines may reveal on scroll; disable for `prefers-reduced-motion`.
- No autoplay video or parallax on mobile.

## Responsive rules

- ≥1100px: full split hero and two-row navigation.
- 768–1099px: compact header; hero 6/6 or stacked depending on width.
- <768px: image first or immediately after headline; one-column content; assurance cards horizontal-scroll with accessible snap or stacked.
- <480px: 20px side padding; buttons full width; H1 ≤3.2rem.

## Image treatment

- Use `object-fit: cover`; preserve amber bottles and raw herbs.
- Hero focal point: 60% 50% desktop; 55% 50% mobile.
- Apply only a very light forest overlay where text overlaps photography.
- Convert PNGs to AVIF/WebP during build; retain PNG originals.

## Accessibility and SEO

- One H1 per page; logical heading order.
- Visible focus rings in leaf-400/ivory.
- Descriptive alt text; decorative patterns use empty alt or CSS backgrounds.
- Catalogue data must be indexable HTML, not canvas.
- Add Product and Organization structured data only for verified facts.

