/**
 * Derives the fixed image assets from their sources:
 *   - the profile photo, converted once to WebP at the sizes the page uses
 *   - the favicon set, rendered from the monogram SVG
 *
 * Re-runnable: every output is overwritten from its source, so this never
 * degrades an image by re-encoding what it produced last time.
 */
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const PHOTO_SOURCE = path.join(ROOT, "media-sources/profile-source.jpeg");
const MONOGRAM = path.join(ROOT, "src/assets/brand/monogram.svg");

mkdirSync(path.join(PUBLIC, "icons"), { recursive: true });

if (!existsSync(PHOTO_SOURCE)) {
  throw new Error(`Profile photo source is missing: ${PHOTO_SOURCE}`);
}

const photo = sharp(PHOTO_SOURCE);
const meta = await photo.metadata();
console.log(`profile source: ${meta.width}×${meta.height}`);

/* The source is 640×640. Never upscale: enlarging it would only add softness,
   so 640 is the largest output and the layout caps the element at 320 CSS px,
   which keeps it crisp on a 2× display. */
for (const size of [640, 320]) {
  const out = size === 640 ? "profile.webp" : `profile-${size}.webp`;
  await sharp(PHOTO_SOURCE)
    .resize(size, size, { fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toFile(path.join(PUBLIC, out));
  console.log(`  → /${out}`);
}

const ICONS: Array<[file: string, size: number, padded: boolean]> = [
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  // Maskable icons are cropped to a circle by the launcher, so the mark has to
  // sit inside the safe area rather than bleed to the edge.
  ["icon-512-maskable.png", 512, true],
  ["apple-touch-icon.png", 180, false],
];

for (const [file, size, padded] of ICONS) {
  const inner = padded ? Math.round(size * 0.66) : size;
  const pad = Math.round((size - inner) / 2);
  let image = sharp(MONOGRAM, { density: 512 }).resize(inner, inner);
  if (padded) {
    image = image.extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: "#0B1220",
    });
  }
  await image.png().toFile(path.join(PUBLIC, "icons", file));
  console.log(`  → /icons/${file}`);
}

console.log("✓ images generated");
