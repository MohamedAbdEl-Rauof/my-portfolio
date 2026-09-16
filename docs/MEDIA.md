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

## Certificates

`pnpm media:certificates` reads the scans from `media-sources/certificates/`,
named by certificate id, resizes each to at most 1200px, flattens the PNGs
onto white and writes WebP to `public/certificates/`, then points
`content/certificates.json` at the new paths. Seven scans went from 2.4 MB to
about 0.5 MB. The grid shows them in a fixed 4:3 frame with `object-contain`,
so a portrait scan is shown whole rather than cropped.

## Fonts

Geist (variable) and IBM Plex Sans Arabic (400, 700) via `next/font`, the
pairing from the owner's original portfolio. `src/assets/fonts/` still holds
TTF copies of Readex Pro and JetBrains Mono from an earlier pass; nothing reads
them and they can be deleted.
