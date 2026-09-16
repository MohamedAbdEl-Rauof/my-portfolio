/**
 * Crops each project cover into a social card.
 *
 * Project pages use their own cover rather than a generated typographic card:
 * a real screenshot of the work is more persuasive in a shared link than the
 * project's name set in a nice font, and it keeps the four flagship pages off
 * a renderer that proved unreliable with Arabic headings.
 *
 * JPEG, not WebP. Several link-preview crawlers still refuse WebP, and a
 * social card that some platforms cannot display is worse than a larger file.
 *
 *   node scripts/make-og-images.mts
 */
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const ROOT = process.cwd();
const PROJECTS = path.join(ROOT, "public/projects");

const dirs = readdirSync(PROJECTS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

let written = 0;
for (const slug of dirs) {
  const cover = path.join(PROJECTS, slug, "cover.webp");
  if (!existsSync(cover)) {
    console.log(`  – ${slug} — no cover to crop`);
    continue;
  }

  const out = path.join(PROJECTS, slug, "og.jpg");
  await sharp(cover)
    // Covers are 1600×1000 (1.6:1) and the card is 1.9:1, so the crop takes
    // the top band: that is where a page's header and headline sit.
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);

  written += 1;
  console.log(`  ✓ ${slug}/og.jpg`);
}

console.log(`\n${written} social cards written.`);
