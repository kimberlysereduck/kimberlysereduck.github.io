# Kimberly Sereduck — Software Engineer Portfolio

A single-page portfolio built with React, TypeScript, Vite, and Tailwind CSS. It includes project showcases, experience and skills sections, an interactive terminal, and a theme toggle.

## Requirements

- Node.js 22.12 or newer supported by Vite 8
- Bun 1.4.4 (used for dependency installation and CI)

## Getting started

```sh
bun install --frozen-lockfile
bun run dev
```

Vite serves the site at <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the local development server |
| `bun run build` | Create a production build in `dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run Biome's recommended lint rules and the TypeScript compiler check |
| `bun run typecheck` | Run the TypeScript compiler check |
| `bun run test` | Run unit and integration tests once |
| `bun run test:watch` | Run Vitest in watch mode |
| `bun run test:coverage` | Run Vitest with V8 coverage and enforce minimum thresholds |
| `bun run test:e2e` | Build and test the production site with Playwright |
| `npm run deploy` | Build and deploy directly to the `gh-pages` branch on GitHub |

## Quality checks

Install the browser once with `bunx playwright install chromium` (on Linux, use
`bunx playwright install --with-deps chromium` if system dependencies are missing).
Playwright tests the production build in desktop and mobile Chromium, using port
4173. Vitest reports coverage for application source, excluding the entry point
and type-only definitions, and enforces 55% minimum for statements, branches,
functions, and lines. The LCOV report is written to `coverage/`.

The GitHub Actions workflow runs lint/typecheck, unit/integration tests with
coverage, Playwright, and a production build in parallel on pushes to `main` and
pull requests targeting any branch. Coverage and Playwright reports are uploaded
as workflow artifacts. Deployment occurs only after all checks pass on a push
to `main`. Configure branch protection or rulesets in GitHub if these checks
should be required before merging. Existing Biome warnings do not fail lint.

## GitHub Pages Deployment

The repository is pre-configured for GitHub Pages:
- **Relative base paths (`base: './'`)** in `vite.config.ts` so scripts and styles load without 404s.
- **Automated deployment** via `.github/workflows/deploy.yml` on every push to `main`. The workflow builds the site and publishes it through GitHub Actions (Settings > Pages > Source: **GitHub Actions**).
- **Manual 1-command deployment** is also available via `npm run deploy`, which pushes the built site to the `gh-pages` branch. Use this alternative only when Pages is configured to deploy from that branch; do not run both deployment methods for the same Pages site.

## Project layout

```text
src/
  components/    React UI sections and interactive components
  data/          Portfolio content
  types.ts       Shared TypeScript models
  App.tsx        Application layout and theme state
  main.tsx       Browser entry point
```

Portfolio content can be updated in `src/data/portfolioData.ts`. Shared data shapes are defined in `src/types.ts`.

## Environment

The portfolio does not require environment variables for local development. `.env.example` documents optional values used when the site is hosted through Google AI Studio; configure those values in the host's secrets/environment settings when applicable.
