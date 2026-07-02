# UPSTREAM 2026 Registration Cost Calculator

Estimate registration and Ridgecrest costs for UPSTREAM 2026 (Dec 29 – Jan 2, Ridgecrest, NC).

**Live site:** `https://<your-github-username>.github.io/registration-cost-calculator/`

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

To preview the production build locally (with the GitHub Pages base path):

```bash
npm run build
npm run preview
```

Then open `http://localhost:4173/registration-cost-calculator/`.

## Updating rates and copy

| What to change | File |
|----------------|------|
| Room rates, meal prices, registration fees | [`src/config/rates.ts`](src/config/rates.ts) |
| Event title, dates, notice text | [`src/config/event.ts`](src/config/event.ts) |

## Updating the UI

Design tokens (colors, spacing, radii) live in [`src/styles/theme.css`](src/styles/theme.css). Component layout and styling is in [`src/styles/calculator.css`](src/styles/calculator.css).

UI components are split by section under [`src/components/calculator/`](src/components/calculator/) and reusable primitives under [`src/components/ui/`](src/components/ui/).

## Deploy to GitHub Pages

1. Create a GitHub repository named **`registration-cost-calculator`** (must match the `base` path in `vite.config.ts`).
2. Push this project to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source** → select **GitHub Actions**.
4. Every push to `main` triggers the deploy workflow automatically.

If you use a different repo name, update the `base` value in [`vite.config.ts`](vite.config.ts) to match (`/<repo-name>/`).
