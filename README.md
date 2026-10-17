# Kimberly Sereduck — Software Engineer Portfolio

A single-page portfolio built with React, TypeScript, Vite, and Tailwind CSS. It includes project showcases, experience and skills sections, an interactive terminal, and a theme toggle.

## Requirements

- Node.js supported by Vite 8
- npm

## Getting started

```sh
npm install
npm run dev
```

Vite serves the site at <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Biome's recommended lint rules and the TypeScript compiler check |
| `npm run typecheck` | Run the TypeScript compiler check |
| `npm test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run deploy` | Build and deploy directly to the `gh-pages` branch on GitHub |

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
