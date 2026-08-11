# Paste this into Codex

Build a production-quality responsive website for **Ancient Indian Botanicals** using the design handoff in this folder.

## Authority order

1. `docs/content.md` controls wording and claims.
2. `docs/design-system.md` controls visual design and responsive behaviour.
3. `assets/images/design-reference-homepage.png` controls overall mood and composition.
4. `docs/site-map.md` controls routes.
5. `asset-manifest.json` controls asset usage.

## Technical expectations

- First inspect the existing repository and follow its framework and conventions. If it is empty, use Next.js App Router + TypeScript + Tailwind CSS.
- Build reusable components; do not create one monolithic page.
- Use semantic HTML, accessible navigation, keyboard-operable menus, visible focus states and reduced-motion support.
- Render all important text as HTML. Never bake interface copy into images.
- Use the included SVG mark and imagery; optimize generated PNGs to AVIF/WebP during the build while retaining originals.
- Implement the homepage and route shells listed in `docs/site-map.md`.
- Implement catalogue data as structured TypeScript/JSON so the remaining products can be added later.
- Add functional client-side catalogue search and filtering.
- Build a validated B2B quote form. If no backend is configured, provide a safe stub with a clear TODO and no false-success network request.
- The AI Spec Consultant and Verify Batch COA controls may open polished informational modals/stubs unless backend/API details exist.
- Do not invent certifications, contact details, legal identity, stock, prices, test results or therapeutic claims.
- Replace every `[CONFIRM ...]` placeholder only if verified data exists in the repository; otherwise keep a clearly marked configuration value and hide the field in production UI.
- Preserve the premium forest/ivory/brass direction. Avoid generic SaaS cards, neon gradients, excessive rounded corners and generic wellness imagery.

## Required verification

- Run lint, type-check and production build.
- Inspect desktop at 1440px, tablet at 834px and mobile at 390px.
- Check navigation, form validation, search/filtering, focus order and image crops.
- Report changed files, commands run, remaining content placeholders and any backend integrations still required.

