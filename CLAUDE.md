# Working in this repo

A bilingual Arabic/English portfolio. Next.js 16 App Router, Tailwind 4,
next-intl. Read `README.md` for the layout and `docs/CONTENT.md` before
touching anything under `content/`.

## Rules that are not negotiable

**Arabic is the default and the site is right-to-left first.** Use logical CSS
properties only: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`,
`text-end`. ESLint fails on the physical equivalents. Exceptions that stay
left-to-right: URLs, code, product names and numbers — mark them `dir="ltr"`
or with the `.ltr` / `.numeric` utilities.

**Never letter-space Arabic.** Its letterforms join, so tracking pulls a word
into disconnected glyphs. The `.eyebrow` utility handles this: mono and
uppercase for Latin, neither for Arabic.

**Every translatable string is a `{ en, ar }` pair.** No fact may exist in one
language and not the other. UI strings live in `messages/*.json` and the two
files stay key-for-key identical.

**Content never lives in a component.** Add it to `content/`, give it a schema
in `src/lib/schemas/`, read it through `src/lib/content/index.ts`.

**Do not invent facts.** Dates, metrics and client names are claims the user
will have to defend in an interview. If a date is unknown, ask rather than
estimating. Only state a measurement that was actually measured.

## Before saying something works

```bash
pnpm validate:content && pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

For anything visual, also look at it, in both languages and both themes. Arabic
is the default, so `/ar` is the page most visitors see.

## Accessibility

The bar is zero axe violations on every page type in both languages and both
themes, and the `incomplete` results get reviewed by hand rather than ignored —
that is where the contrast problems over the background gradient were found.

Interactive controls are at least 44px.

## Gotchas

- **The design was approved from a mockup.** `scripts/`-adjacent history: the
  owner rejected two abstract redesigns before choosing a rendered page. Do not
  change the look from a text description; build a mockup, get the pick, then
  port it. The approved one is the monochrome bento with animation.
- **Fonts are Geist (variable, one file) and IBM Plex Sans Arabic at 400 and 700.** Each Plex weight costs two downloads (Arabic plus a Latin range), so
  do not add weights casually.
- **Motion is CSS.** `MotionRuntime` is the only JavaScript: it adds `js` to
  the root, reveals `.reveal` sections once via IntersectionObserver, and runs
  `[data-count]` counters. Hover, load and name animations are keyframes in
  `globals.css`. No `motion` package. Everything animates transform and
  opacity only, and rests visible in the server HTML.
- **Type sizes live in one place.** `globals.css` has a phone column and a
  640px override per `--text-*` step, in a non-inline `@theme` block on
  purpose. Only the hero name uses `text-4xl`.
- **The page column is `.wrap`**, the card is `.tile`, the grid is `.bento`
  with `span-*`. Reach for those before writing new layout CSS.
- Measuring computed colours right after a theme toggle or during the reveal
  cascade returns mid-transition values. Let animations settle first; the
  verify script does.
- Media scripts read from `media-sources/`, which is not served. Regenerate
  rather than editing anything in `public/`.
- `pnpm verify:pages` against a running `pnpm start` screenshots every page in
  both languages, both themes and two viewports, and asserts overflow, type
  sizes, font count, reveal completion and axe. Run it before calling visual
  work done.
