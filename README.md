# PalayCheck Landing Page

Marketing site for [PalayCheck](https://github.com/DTHarryyy/PalayCheck), the on-device rice
disease detection app for Filipino farmers and Municipal Agriculture Offices (MAOs).

Built with Next.js (App Router), Tailwind CSS v4 and Motion. The whole page is prerendered
as static HTML and deployed on Vercel.

## Getting started

```sh
npm install
cp .env.example .env.local   # optional, the defaults work
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Dev server                                               |
| `npm run build`     | Production build (every route should be static `○`)      |
| `npm run lint`      | ESLint                                                   |
| `npm run typecheck` | Generates route types, then `tsc --noEmit`               |
| `npm run format`    | Prettier (with Tailwind class sorting)                   |
| `npm run test:e2e`  | Playwright: builds, serves and tests the production site |

## Configuration

All environment handling lives in [`src/config/site.ts`](src/config/site.ts).

| Variable                     | Default                          | Purpose                                            |
| ---------------------------- | -------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_APP_STATUS`     | `coming_soon`                    | `live` turns the CTAs into Google Play links       |
| `NEXT_PUBLIC_PLAY_STORE_URL` | listing for `app.palaycheck.com` | Override the store URL (must be `play.google.com`) |
| `NEXT_PUBLIC_SITE_URL`       | Vercel production URL            | Canonical URL for metadata, sitemap, OG image      |

### Going live on Google Play

The app isn't published yet, so every CTA shows a non-clickable **"Coming soon on Google
Play"** state, which avoids sending visitors to a listing that would 404. Once the listing is
public:

1. In Vercel → Project → Settings → Environment Variables, set `NEXT_PUBLIC_APP_STATUS=live`.
2. Redeploy. No code change is needed.

The hero, navbar, mobile menu, final CTA and footer then link to the listing (new tab,
`rel="noopener noreferrer"`), show the official Google Play badge, and record a
`play_store_click` event with the CTA's location in Vercel Analytics (custom events need a
Vercel Pro plan; page views work on every plan).

## Deploying to Vercel

1. Import this repository in Vercel. The framework preset is detected automatically.
2. Add the environment variables above (Production and Preview).
3. Each pull request gets a preview deployment, and `main` deploys to production.

## Project structure

```
src/
  app/            layout, page, OG image, sitemap, robots, icons
  config/site.ts  environment config (Play Store URL + status, site URL)
  content/        all copy and data. Edit text here, not in components
  components/
    cta/          PlayStoreButton: the only place the store link is rendered
    motion/       client-side reveal/stagger wrappers + reduced-motion config
    sections/     one component per page section
    illustrations/ original SVG leaf artwork per disease
    ui/           layout primitives
e2e/              Playwright tests
```

## Content and asset rules

- **Facts come from the app repo.** Disease names and descriptions mirror
  `lib/data/disease.dart`, and device support mirrors `docs/DEVICE_COMPATIBILITY.md`. Don't add
  accuracy figures or user counts unless they've been verified.
- **No unlicensed images.** The disease photos in the app repo were collected from the web, so
  the site uses original SVG illustrations instead. The logo is the app's own launcher icon.
- **Motion respects the user.** Every animation is disabled or reduced under
  `prefers-reduced-motion`, and the hero headline animates with CSS so it never waits for
  JavaScript.
- **Security headers** (CSP, `X-Frame-Options`, etc.) are set in `next.config.ts`. If you add a
  third-party script or image host, update the CSP there.
