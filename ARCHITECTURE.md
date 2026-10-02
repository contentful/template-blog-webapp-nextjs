# Architecture

The Blog Starter Template is a Next.js app that reads content from Contentful's GraphQL Content API and renders it as a website. Content editors work in Contentful, and the app fetches published content (or draft content in preview).

## Stack

- Next.js App Router (`src/app/[locale]`), React and TypeScript.
- Tailwind CSS for styling and components.
- `next-i18n-router` and `react-i18next` for localisation. Locales come from the Contentful space.
- `@contentful/live-preview` for live updates and inspector mode in the Contentful web app.

## Layout

- `src/components/` holds UI, split into `features/`, `shared/` and `templates/`.
- `src/lib/graphql/*.graphql` holds the GraphQL queries, `src/lib/__generated/` holds the typed SDK generated from them, and `src/lib/client.ts` creates the delivery and preview clients.
- `src/app/api/enable-draft/route.ts` turns on Next.js draft mode for Contentful previews.
- `next.config.js` limits the image optimizer to Contentful's image hosts (`images.ctfassets.net` and `images.eu.ctfassets.net`).
- `bin/` and `docs/tutorials/` support the guided setup described in `README.md`.

## Data flow

A request hits a Next.js page, which queries Contentful's GraphQL API with the delivery token, or the preview token when draft or preview mode is on, and renders the result.
