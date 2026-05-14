# ramesh-v-playground.github.io

Personal site for Ramesh Venkatachalam, Lead Solutions Architect (Dallas, TX).
A statically-exported Next.js 14 site served by GitHub Pages.

Live: <https://ramesh-v-playground.github.io/>

## Stack

- **Next.js 14** (App Router) with `output: 'export'` for static HTML
- **Tailwind CSS** with a custom warm palette (cream, peach, coral, sage, plum, ink, soft)
- **DM Serif Display + DM Sans** loaded via `<link>` in `app/layout.tsx`
- **GitHub Actions** builds on every push to `main` and deploys to Pages
- **No backend.** No API routes, no env vars at runtime, no server code.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build, locally verifiable:

```bash
npm run build        # writes ./out (static HTML, JS, CSS)
npx serve out        # preview at http://localhost:3000
```

Lint:

```bash
npm run lint
```

## Adding content

The site has two content surfaces, both data-driven:

### Add a playground project

1. Open `lib/projects.ts`.
2. Append a new entry to the `PROJECTS` array. The list is rendered in order, so put the most recent first.
3. Required fields: `slug`, `name`, `oneLiner`, `status`, `tags`, `shippedAt` (ISO date).
4. Optional: `liveUrl` (makes the card clickable), `sourceUrl`, `caseStudyUrl`, `metric`, `emoji`, `cardAccent`.

The grid (`components/PlaygroundSection.tsx`) and the filter chips read straight from this file. No other change needed.

### Add a blog post

1. Open `lib/posts.ts`.
2. Append a new entry to `POSTS` with `slug`, `title`, `excerpt`, `date` (ISO), `source`, `body`.
3. Paragraphs in `body` are separated by blank lines (`\n\n`).

The homepage list at `#blog` and the individual post page at `/blog/{slug}` are generated automatically. `generateStaticParams` in `app/blog/[slug]/page.tsx` produces one HTML file per post at build time.

### Edit homepage sections

The homepage is a single file: `app/page.tsx`. Each section (hero, about, work, stack, cricket, blog, CTA) is a top-level `<section>` with an `id` matching its nav link.

### Edit colors / fonts

- Color tokens: `tailwind.config.ts` (`theme.extend.colors`).
- Typography: change the Google Fonts link in `app/layout.tsx` and the `fontFamily` entries in `tailwind.config.ts`.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`. One-time setup:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`, or trigger manually from **Actions → Deploy to GitHub Pages → Run workflow**.

The workflow:

1. `npm ci` + `npm run build`
2. `touch out/.nojekyll` (so Pages serves `_next/` correctly)
3. Uploads `out/` as the Pages artifact
4. Deploys

Concurrency is capped at one deploy; if a second push lands mid-deploy it queues, it does not cancel.

## What's NOT in this build

The earlier chatbot and RAG pipeline were removed because GitHub Pages cannot run server code (no Node runtime, no API routes, no runtime env vars). If you want "Ask about Ramesh" back, deploy to Vercel instead, where an Edge function can hold the API key and stream responses.

## Project structure

```
.github/workflows/deploy.yml     GitHub Actions: build + Pages deploy
app/
  layout.tsx                     Root layout, Google Fonts, gradient orbs
  page.tsx                       Homepage (hero, about, work, stack, cricket, blog, CTA)
  globals.css                    Tailwind directives + .squiggle utility
  opengraph-image.png            OG/Twitter card
  blog/[slug]/page.tsx           Per-post page (statically generated)
components/
  SiteNav.tsx                    Sticky pill nav (used on home + post pages)
  AnimatedName.tsx               Looping letter slide animation for the nav logo
  PlaygroundSection.tsx          Filterable project grid (client component)
lib/
  projects.ts                    Playground data + types
  posts.ts                       Blog data + date helper
next.config.js                   Static export config (output: 'export')
tailwind.config.ts               Color palette, font families, keyframes
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the page tree, component map, and data model.
