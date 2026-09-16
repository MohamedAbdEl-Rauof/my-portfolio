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

Motion respects `prefers-reduced-motion`. Anything that animates on its own for
more than five seconds needs a pause control; the logo marquee has one.

Interactive controls are at least 44px.

## Gotchas

- Scroll reveals render their starting state into the server HTML. A
  `noscript` rule in the layout forces `[data-reveal]` visible, so content is
  never blank without JavaScript. Keep that rule if you add motion wrappers.
- `next/font` emits a preload for every family the module calls, whether the
  page uses it or not. The two Latin-only faces are `preload: false` because
  Arabic is the default locale.
- Measuring computed colours right after a theme toggle returns mid-transition
  values. Reload before trusting a contrast reading.
- Media scripts read from `media-sources/`, which is not served. Regenerate
  rather than editing anything in `public/`.
