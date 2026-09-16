# Media pipeline

Every image and video under `public/` is produced by a script from a source in
`media-sources/`. Nothing is hand-edited, so any of it can be regenerated.

`media-sources/` is not served. It holds the original screen recordings and the
profile photo master, which together are larger than the rest of the site.

## Covers

A project cover is 1600×1000. There are four ways one gets made, in order of
preference:

1. **A screenshot of the live site** — `pnpm media:screenshots`. Playwright
   driving the system Chrome. It shoots a viewport 500px taller than the crop
   and keeps the top, which pushes consent banners and support widgets out of
   frame without clicking "accept" on anyone's behalf.
2. **A frame from a recording** — `pnpm media:covers`, for the recordings that
   are 1920px wide.
3. **A framed device shot** — the same script, for recordings between 426 and
   960px. The frame sits in browser chrome on the site's own background, so the
   low resolution reads as a device shot rather than a blurry upscale.
   Every project on the site has a cover from one of these three. If a project
   cannot produce one — because it sits behind a client login, needs a seeded
   database to boot, or has no interface at all — it does not go on the site.
   Do not mock up a screen that was never taken.

## Social cards

`pnpm media:og` crops each project cover to 1200×630. `pnpm media:cards`
produces the cards for the home, work, about and contact pages in both
languages.

Both output JPEG. Several link-preview crawlers still refuse WebP, and a card
some platforms cannot display is worse than a larger file.

These are rendered with sharp rather than the JSX card renderer, which threw on
a subset of Arabic headings during prerender. librsvg shapes Arabic correctly:
it joins the letterforms and orders the line right to left.

## Video

`pnpm media:videos` moves each recording to `public/projects/<slug>/demo.mp4`,
re-encoding anything over 1.5 MB or wider than 1280px and dropping the dead
audio track. Recordings narrower than 800px are skipped, because at that size
the still already shows more than the video.

Video only ever plays on a project's own page. The `<video>` element has no
`src` until the visitor presses play, so the file is never fetched by someone
who scrolls past.

## Icons and photo

`pnpm media:images` renders the favicon set from `src/assets/brand/monogram.svg`
and converts the profile photo. The photo source is 640×640 and is never
upscaled.

## Fonts

`src/assets/fonts/` holds TTF copies of Readex Pro and JetBrains Mono, used by
the card scripts. They are vendored because a renderer needs font data as a
buffer, which `next/font` does not expose. Both are SIL Open Font License.
