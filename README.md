# ramesh-v-playground.github.io

Personal site for Ramesh Venkatachalam — Solutions Architect, Dallas, TX.
Static site built with Next.js 14, exported as plain HTML for GitHub Pages.

## Stack

- **Next.js 14** — App Router, static export (`output: 'export'`)
- **Tailwind CSS** — custom palette (cream / coral / sage / plum)
- **DM Serif Display + DM Sans** — typography via `next/font`
- **GitHub Actions** — builds on every push to `main` and deploys to Pages

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production build (test before pushing)

```bash
npm run build
# inspect the static output
npx serve out
```

## Deploying to GitHub Pages

The `.github/workflows/deploy.yml` action handles this automatically. **One-time setup:**

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Under "Build and deployment," set **Source: GitHub Actions**
4. Push a commit to `main`

That's it. The workflow runs, builds the static site into `out/`, and deploys to `https://ramesh-v-playground.github.io/`. Subsequent pushes to `main` redeploy automatically.

You can also trigger a manual deploy from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

## Adding content

- **Edit pages** — `app/page.tsx` (home), `app/playground/page.tsx` (playground)
- **Edit projects** — `lib/projects.ts` is the single source of truth for the playground grid and build log
- **Edit colors** — `tailwind.config.ts`

## What's NOT in this build

The chatbot and RAG pipeline were removed because GitHub Pages can't run server-side code (no Node, no API routes, no environment variables at runtime). If you want the "Ask about Ramesh" chat back, deploy to Vercel instead — the chat needs an Edge function to hold the API key and stream responses.

## Project structure

```
.github/workflows/   # GitHub Actions for auto-deploy
app/
  layout.tsx         # root layout, fonts, floating gradient orbs
  page.tsx           # home: hero, about, work, stack, cricket, writing, contact
  playground/        # /playground page
  globals.css        # Tailwind directives + custom utilities
components/
  AnimatedName.tsx   # the looping "Ramesh Venkatachalam" letter animation
lib/
  projects.ts        # playground data
next.config.js       # static export config
tailwind.config.ts   # palette, keyframes
```
