# Architecture

A short tour of how this site is wired together, what each piece does, and why
the constraints look the way they do.

## Overview

This is a Next.js 14 App Router site exported as static HTML and served from
GitHub Pages. Everything renders at build time. There is no server, no API
route, no runtime database, and no environment variable available at request
time. Every page is a `.html` file in `out/` after `npm run build`.

The site has two content surfaces (the **playground** and the **blog**) and
both are driven by typed TypeScript modules in `lib/`. Adding content is a
matter of appending an object to an array and pushing to `main`.

## Routes

```
/                         app/page.tsx              Home (single long scroll)
/blog/{slug}/             app/blog/[slug]/page.tsx  Post page (one per entry in lib/posts.ts)
```

`generateStaticParams` in `app/blog/[slug]/page.tsx` returns one entry per post,
so the build produces a separate HTML file for each one. There are no other
routes.

## Page composition

The homepage is one file (`app/page.tsx`) containing all sections in order.
Each section is a top-level `<section id="...">` so the nav links scroll to it.

```
SiteNav                                              (sticky)
hero            section.px-4.pt-16.pb-24.text-center (no id)
about           section#about                         narrative bio + 3 capability cards
playground      PlaygroundSection                     (client, filterable grid)
work            section#work                          "At Aetna" 2x2 cards
stack           section#stack                         6 grouped tag lists
cricket         section#cricket                       featured card + 3 supporting + truths list
blog            section#blog                          links to /blog/{slug}/
contact         section#contact                       email CTA
footer          footer
```

The blog post route reuses `SiteNav` so the navigation is consistent.

## Components

| File | Role | Type |
|---|---|---|
| `components/SiteNav.tsx` | Sticky pill nav with 7 anchor links. Used on home + post pages. | Server |
| `components/AnimatedName.tsx` | Looping per-letter slide animation for the brand logo in the nav. | Client |
| `components/PlaygroundSection.tsx` | The playground grid + filter chips. Renders cards from `PROJECTS`. | Client (uses `useState`) |

`PlaygroundSection` is a client component because the filter is interactive.
Everything else on the homepage is server-rendered at build time, including the
blog list (read directly from `lib/posts.ts` at build).

## Data model

### `lib/projects.ts`

```ts
type Status = 'live' | 'experimenting' | 'archived' | 'coming-soon';
type Tag    = 'agentic-ai' | 'gcp' | 'rag' | 'frontend' | 'open-source' | 'tool';

interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  status: Status;
  tags: Tag[];
  liveUrl?: string;       // makes the card clickable
  sourceUrl?: string;
  caseStudyUrl?: string;
  shippedAt: string;      // ISO date, drives the build log
  metric?: { label: string; value: string };
  emoji?: string;
  cardAccent?: 'peach' | 'sage' | 'plum' | 'coral';
}
```

`PROJECTS` is the single source of truth. The grid order matches the array
order (most recent first by convention). `ALL_TAGS`, `TAG_LABEL`, and
`STATUS_LABEL` are exported so the UI never hardcodes display strings.

Cards with `liveUrl` render as `<a target="_blank">` and become clickable. Cards
without it render as a non-interactive `<div>`.

### `lib/posts.ts`

```ts
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO
  source: string;        // attribution URL
  body: string;          // paragraphs separated by \n\n
}
```

`POSTS` is the source of truth for the blog. The homepage list reads it, and
`generateStaticParams` in the dynamic route reads it again at build to produce
each post's HTML file. `formatPostDate(iso)` returns `{ day: '21', mon: 'Apr' }`
for the date stamp in cards.

The post body is plain text. `app/blog/[slug]/page.tsx` splits on `\n\n+` and
renders each paragraph as a `<p>`. No Markdown, no MDX, no rich formatting. If
you need links or emphasis, switch the body to MDX (the config already enables
`mdxRs` and `pageExtensions` includes `md`, `mdx`).

## Styling

### Color tokens (`tailwind.config.ts`)

| Token | Hex | Role |
|---|---|---|
| `cream` | `#fdf8f3` | Page background |
| `peach` | `#ffe4d1` | Warm card tint |
| `coral` | `#ff7a59` | Display accent (large text, hero only) |
| `coral-text` | `#b03a08` | Body-grade coral (links, eyebrows, AA-compliant) |
| `sage` | `#a8c4a2` | Cool card tint |
| `plum` | `#6b4e71` | Tertiary accent |
| `ink` | `#2a2a3a` | Body text (~13:1 on cream) |
| `soft` | `#5a5466` | Muted body text (~7:1 on cream, AA) |

The dual coral tokens are intentional: `coral` is too light for body text on
cream (fails contrast), `coral-text` is the darker variant for anything
small or text-heavy.

### Typography

Two families, loaded via `<link>` in `app/layout.tsx`:

- **DM Serif Display** for headings (`font-serif`), used at weight 400 only.
  Italic accent words carry the typographic motif.
- **DM Sans** for body and UI (`font-sans`), weights 400/500/600/700.

Fonts are loaded at runtime instead of via `next/font/google` so the build
stays deterministic and offline-safe.

### Layout patterns

- Centered editorial layout: `max-w-6xl mx-auto` for sections, narrower
  (`max-w-3xl`) for prose-heavy cards.
- Generous vertical rhythm: section padding is `py-20`.
- Cards: white background, `rounded-3xl`, soft shadow.
- Floating gradient orbs in `app/layout.tsx` provide ambient warmth without
  reducing text contrast (both at low opacity behind `relative z-10` content).

### One custom CSS utility

`globals.css` defines `.squiggle`: an inline italic span with a hand-drawn
coral underline (inline SVG, base64-encoded). Used once, on the H1 hero word
"agentic". Everything else is Tailwind utilities.

## Build and deploy

### Static export

`next.config.js` sets `output: 'export'`. This pins the framework to
build-time rendering only. Consequences:

- No `app/api/` routes.
- No `getServerSideProps`, no Route Handlers.
- `next/image` runs through `images: { unoptimized: true }` so raw paths work
  (Pages cannot serve the image optimization endpoint).
- `trailingSlash: true` so Pages serves `/blog/foo/index.html` correctly.

### CI/CD

`.github/workflows/deploy.yml` runs on push to `main` and on manual dispatch:

1. Checkout, set up Node 20 with npm cache.
2. `actions/configure-pages@v5` (tells Next this is a Pages target).
3. `npm ci` + `npm run build`.
4. `touch out/.nojekyll` so Pages does not Jekyll-process `_next/` filenames
   that start with underscores.
5. `actions/upload-pages-artifact@v3` uploads `out/`.
6. `actions/deploy-pages@v4` publishes.

`concurrency.group: pages` with `cancel-in-progress: false` means a second push
during a deploy queues instead of cancelling, so the artifact you build is the
one that gets shipped.

### Why these constraints

GitHub Pages is free, fast, and survives indefinite traffic spikes, but it
serves static files only. The architecture follows from that single
constraint: data lives in `.ts` modules, everything renders at build time,
zero runtime dependencies. If the site ever needs a server-side feature
(auth, chat, dynamic search), the move is to Vercel with the static export
config removed, not to bolt a backend onto Pages.

## Metadata and SEO

`app/layout.tsx` exports `metadata` with OG and Twitter card config. The OG
image lives at `app/opengraph-image.png` and is picked up automatically by
Next's metadata convention. Per-post metadata comes from
`generateMetadata` in `app/blog/[slug]/page.tsx`, which sets `title` and
`description` from the post entry.

## Where to make common changes

| Change | File |
|---|---|
| Add or edit a project | `lib/projects.ts` |
| Add or edit a blog post | `lib/posts.ts` |
| Edit a homepage section | `app/page.tsx` |
| Edit the nav | `components/SiteNav.tsx` |
| Edit a color or add a new token | `tailwind.config.ts` |
| Change the OG image | `app/opengraph-image.png` |
| Change the deploy pipeline | `.github/workflows/deploy.yml` |
