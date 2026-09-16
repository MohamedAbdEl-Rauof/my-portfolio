/**
 * Optimises the certificate scans for the web.
 *
 * The sources are camera and scanner originals, 2,000–2,900px on the long
 * edge and up to half a megabyte each, two of them PNG with an alpha channel a
 * scan has no use for. The grid shows them at about 240px wide. Each is
 * resized to at most 1200px, flattened onto white, and written as WebP, then
 * the content file is pointed at the new path.
 *
 * Sources live in media-sources/certificates/<id>.<ext>, named by the
 * certificate id, so no lookup table is needed. Re-runnable; never reads from
 * public/.
 *
 *   node scripts/optimize-certificates.mts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCES = path.join(ROOT, "media-sources/certificates");
const OUT = path.join(ROOT, "public/certificates");
const CONTENT = path.join(ROOT, "content/certificates.json");

mkdirSync(OUT, { recursive: true });

const data = JSON.parse(readFileSync(CONTENT, "utf8")) as {
  items: Array<{ id: string; image: string }>;
};

let changed = false;
let totalBytes = 0;

for (const item of data.items) {
  const source = ["jpg", "jpeg", "png"]
    .map((ext) => path.join(SOURCES, `${item.id}.${ext}`))
    .find((file) => existsSync(file));

  if (!source) {
    throw new Error(
      `No source scan for certificate "${item.id}" in media-sources/certificates/`,
    );
  }

  const out = path.join(OUT, `${item.id}.webp`);
  const info = await sharp(source)
    // Honour EXIF orientation, which phone scans frequently carry.
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    // The PNGs carry an alpha channel; a certificate is opaque paper.
    .flatten({ background: "#ffffff" })
    .webp({ quality: 80 })
    .toFile(out);

  totalBytes += info.size;
  console.log(
    `  ✓ ${item.id}.webp — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB`,
  );

  const publicPath = `/certificates/${item.id}.webp`;
  if (item.image !== publicPath) {
    item.image = publicPath;
    changed = true;
  }
}

if (changed) {
  writeFileSync(CONTENT, JSON.stringify(data, null, 2) + "\n");
  console.log("  content/certificates.json paths updated");
}

console.log(
  `\n${data.items.length} certificates, ${(totalBytes / 1024).toFixed(0)} KB total.`,
);
