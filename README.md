# Compass Data Solutions — Website

A single-page marketing site for **Compass Data Solutions** (a demo company offering business intelligence solutions and AI automations).

Built as a single `index.html` with Tailwind CSS (via CDN), Poppins + Inter typography, a custom brand palette, layered gradients, and spring-eased interactions.

## Sections
Header · Hero · Stats · Experience · Services · Process · Consultation form · Footer

## Run locally
```bash
node serve.mjs      # serves the site at http://localhost:3000
```

## Tooling
- `serve.mjs` — minimal static file server
- `screenshot.mjs` — full-page screenshots via puppeteer-core (`node screenshot.mjs http://localhost:3000`)

## Notes
- Imagery uses `placehold.co` placeholders — swap in real assets when available.
- The contact and newsletter forms are front-end only (no backend wired up yet).
