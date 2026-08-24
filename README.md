# Ancient Indian Botanicals — website source

This repository is the editable source of the Ancient Indian Botanicals website. It is a portable React/Vite project: the repository owner can download it, edit it locally or in GitHub, and deploy it to Vercel or another compatible static host without depending on a proprietary website builder.

This package converts the content audited from `https://botanica-global.vercel.app/#home` into the premium heritage-botanical direction shown in `assets/images/design-reference-homepage.png`.

## Start here

1. Give the complete folder to Codex.
2. Paste `docs/CODEX-BUILD-PROMPT.md` as the implementation request.
3. Treat `docs/content.md` as the approved source of truth for copy.
4. Treat `docs/design-system.md` as the source of truth for layout and styling.

## Included

- `assets/images/hero-botanical-still-life.png` — text-free hero photograph.
- `assets/images/product-families-flatlay.png` — text-free product-family banner.
- `assets/images/design-reference-homepage.png` — selected visual reference.
- `assets/images/aib-official-logo.webp` — optimized official circular company logo.
- `assets/images/aib-official-symbol.webp` — optimized official symbol for compact placements and the favicon.
- `assets/svg/botanical-pattern.svg` — repeatable line-art background.
- `assets/svg/origin-map.svg` — stylized sourcing-region graphic.
- `docs/content.md` — rewritten site-wide content and product data.
- `docs/design-system.md` — visual system, components and responsive behaviour.
- `docs/site-map.md` — routes and information architecture.
- `docs/CODEX-BUILD-PROMPT.md` — ready-to-paste coding brief.
- `asset-manifest.json` — implementation-oriented asset inventory.

## Important content notes

- The live source used the name “Niramaya”; the handoff consistently uses **Ancient Indian Botanicals** to match the supplied design.
- Unverified claims were softened. “GC/MS verified” is framed as documentation supplied **where applicable**, not as a blanket certification claim.
- Contact details and legal policies are placeholders that must be confirmed before launch.
- The site should not embed important copy inside images. All visible text should be HTML.

## Ownership and third-party components

Project-specific source, copy and design work are covered by the repository's proprietary `LICENSE`. Open-source packages and fonts retain their own licences; see `THIRD_PARTY_NOTICES.md`. Public repository visibility does not make the project open source, although a public repository can still be viewed and forked through GitHub.

## Production checklist

- Connect `ancientindianbotanicals.com` to the production deployment without removing Google Workspace MX/TXT records.
- The production build pre-renders 13 main routes and all 92 product routes into route-specific HTML with canonical, social and structured metadata.
- Keep `https://www.ancientindianbotanicals.com/` as the canonical domain, redirect the apex domain to it, verify the domain in Google Search Console and submit `/sitemap.xml`.
- Use real paths such as `/catalogue`, `/contact` and `/products/ashwagandha`; hash URLs are supported only for backward compatibility.
- Confirm GST, IEC, banking and product-specific documentation before publishing any related claims or registration numbers.
