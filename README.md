# Portfolio — Mohamed Abd El-Raouf

Bilingual (Arabic and English) portfolio built with Next.js 16, Tailwind CSS 4
and next-intl. Arabic is the default language and the site is designed
right-to-left first, with English as a first-class alternate rather than an
afterthought.

Live at <https://developer-moraouf.vercel.app>.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /ar
```

Node 20.9 or newer, and pnpm. `pnpm build` runs content validation first, so a
malformed content file stops the build rather than shipping a broken page.

## How it is put together

| Concern         | Where                                                               |
| --------------- | ------------------------------------------------------------------- |
| Routes          | `src/app/[locale]/` — every URL carries its language                |
| Locale routing  | `src/i18n/`, with the middleware in `src/proxy.ts`                  |
| UI strings      | `messages/ar.json`, `messages/en.json` (kept key-for-key identical) |
| Content         | `content/` — JSON validated by Zod schemas in `src/lib/schemas/`    |
| Reading content | `src/lib/content/index.ts` — the only module that touches the files |
| Design tokens   | `src/app/globals.css` (`@theme inline`)                             |
| Components      | `src/components/` grouped by the section they serve                 |
| Media pipeline  | `scripts/`, sources in `media-sources/`                             |

Two rules keep the bilingual side honest. Every translatable field is a
`{ en, ar }` pair, so a fact cannot exist in one language and not the other.
And layout uses logical CSS properties only (`ms-`, `me-`, `ps-`, `pe-`,
`text-start`), so the page mirrors instead of being laid out twice. ESLint
fails the build on `ml-`, `mr-`, `pl-`, `pr-`, `text-left` and `text-right`.

## Adding or changing content

Nothing about a project lives in a component. See [docs/CONTENT.md](docs/CONTENT.md)
for the field-by-field guide, and [docs/MEDIA.md](docs/MEDIA.md) for how covers,
videos and social cards are produced.

The short version: add `content/projects/<slug>.json`, list the slug in
`content/projects/_index.json`, put a cover at
`public/projects/<slug>/cover.webp`, then run `pnpm validate:content`.

## Scripts

```bash
pnpm dev                 # development server
pnpm build               # validates content, then builds
pnpm start               # serve the production build
pnpm lint                # eslint, including the RTL guard
pnpm typecheck           # tsc --noEmit
pnpm test                # content tests (vitest)
pnpm format              # prettier
pnpm validate:content    # schemas plus cross-file references

pnpm media:screenshots   # capture live sites (Playwright, system Chrome)
pnpm media:covers        # posters and framed covers from recordings
pnpm media:cards         # title cards for systems that cannot be screenshotted
pnpm media:videos        # move and re-encode demo recordings
pnpm media:og            # social cards from project covers
pnpm media:images        # profile photo variants and the icon set
```

## Deploying

Vercel, from `main`. The only variable that must be set is
`NEXT_PUBLIC_SITE_URL`, the public origin used for canonical URLs, the sitemap,
social tags and structured data. A production build that resolves a non-https
origin fails on purpose rather than silently shipping wrong canonicals.

`robots.ts` closes any non-production deployment to crawlers, so preview builds
cannot compete with the live site in search results.

The bare domain serves a small page carrying the social card and forwards to
`/ar`, so a link shared as `developer-moraouf.vercel.app` gets a preview. Note
that WhatsApp caches a failed preview for days; after a deploy, test with a
variant such as `?v=2` or purge it in Facebook's Sharing Debugger.

## What the old site was

Version one was a client-rendered single page app on MUI and Tailwind 3, with
content fetched in the browser and no locale in the URL. It is preserved at the
`v1-mui` git tag. The five paths it published (`/home`, `/about`, `/projects`,
`/certificates`, `/contact`) are permanently redirected to their Arabic
equivalents in `next.config.ts`.
