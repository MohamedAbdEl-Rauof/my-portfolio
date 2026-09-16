/**
 * Builds covers from the archived screen recordings.
 *
 * The recordings in this repo range from 426px to 1920px wide. A 1920px frame
 * is a fine cover on its own. Anything smaller cannot be shown full-bleed at
 * 1600px without looking like a mistake, so it is composited into a dark
 * browser frame instead: the image keeps its native size, sits on the site's
 * own ink-and-amber background, and the low resolution reads as a deliberate
 * device shot rather than a blurry upscale.
 *
 *   node scripts/make-covers.mts [slug ...]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

type Cover = {
  slug: string;
  name: string;
  /** File under public/images/projects. */
  source: string;
  /** Frame to grab, as ffmpeg accepts it. */
  at: string;
};

const COVERS: Cover[] = [
  // Full-bleed: these recordings are 1920px wide.
  {
    slug: "whatsapp-patient-platform",
    name: "cover",
    source: "chatwoot.mp4",
    at: "00:00:06",
  },
  {
    slug: "lab-results-automation",
    name: "cover",
    source: "n8n.mp4",
    at: "00:00:05",
  },
  {
    slug: "ai-auto-reply-assistant",
    name: "cover",
    source: "typobot.mp4",
    at: "00:00:12",
  },
  {
    slug: "nova-bill",
    name: "cover",
    source: "nova-bill-lab.mp4",
    at: "00:00:20",
  },
  {
    slug: "qriib-app",
    name: "cover",
    source: "qriib-dashboard.mp4",
    at: "00:00:08",
  },
  // Framed: 426–960px sources.
  {
    slug: "vconnct-dashboard",
    name: "cover",
    source: "vconnctDashboard.mp4",
    at: "00:00:09",
  },
  {
    slug: "vcloud-control-panel",
    name: "cover",
    source: "vcloud.mp4",
    at: "00:00:06",
  },
  { slug: "tawteen", name: "cover", source: "tawteen.mp4", at: "00:00:02" },
  {
    slug: "vconnct-landing-pages",
    name: "cover",
    source: "investInTech.mp4",
    at: "00:00:10",
  },
  {
    slug: "vconnct-landing-pages",
    name: "gallery-1",
    source: "vcloudLandingPage.mp4",
    at: "00:00:04",
  },
  {
    slug: "vconnct-landing-pages",
    name: "gallery-2",
    source: "educationLandingPage.mp4",
    at: "00:00:04",
  },
  {
    slug: "vconnct-landing-pages",
    name: "gallery-3",
    source: "ahlAlQuranLandingPage.mp4",
    at: "00:00:04",
  },
  {
    slug: "vconnct-landing-pages",
    name: "gallery-4",
    source: "comparisonZoomLandingPage.mp4",
    at: "00:00:04",
  },
];

const WIDTH = 1600;
const HEIGHT = 1000;
/** Below this source width, frame it rather than stretch it. */
const FULL_BLEED_MIN = 1500;

const ROOT = process.cwd();
const SOURCES = path.join(ROOT, "media-sources/recordings");
const OUT_ROOT = path.join(ROOT, "public/projects");

const INK = "#0B1220";
const SIGNAL = "245, 184, 65";

/** The ink background with the site's measuring grid and a warm top glow. */
function backdrop(): Buffer {
  const lines: string[] = [];
  for (let x = 0; x <= WIDTH; x += 40) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" />`);
  }
  for (let y = 0; y <= HEIGHT; y += 40) {
    lines.push(`<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" />`);
  }
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="rgb(${SIGNAL})" stop-opacity="0.20" />
      <stop offset="100%" stop-color="rgb(${SIGNAL})" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}" />
  <g stroke="rgb(${SIGNAL})" stroke-opacity="0.07" stroke-width="1">${lines.join("")}</g>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
</svg>`);
}

/** Rounded corners plus a browser title bar, as one mask-and-chrome pass. */
function chrome(w: number, h: number, bar: number): Buffer {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h + bar}">
  <rect width="${w}" height="${h + bar}" rx="14" fill="#111B2E" />
  <g fill="rgb(${SIGNAL})" fill-opacity="0.5">
    <circle cx="26" cy="${bar / 2}" r="5" />
    <circle cx="46" cy="${bar / 2}" r="5" />
    <circle cx="66" cy="${bar / 2}" r="5" />
  </g>
  <rect x="96" y="${bar / 2 - 7}" width="${Math.max(0, w - 200)}" height="14" rx="7"
        fill="#ffffff" fill-opacity="0.06" />
</svg>`);
}

/** Round the screenshot's own corners so it sits inside the frame cleanly. */
function roundedMask(w: number, h: number, r: number): Buffer {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<rect width="${w}" height="${h}" rx="${r}" fill="#fff" /></svg>`,
  );
}

const only = new Set(process.argv.slice(2));
const queue = only.size > 0 ? COVERS.filter((c) => only.has(c.slug)) : COVERS;
const temp = mkdtempSync(path.join(tmpdir(), "covers-"));

try {
  for (const cover of queue) {
    const src = path.join(SOURCES, cover.source);
    const still = path.join(temp, `${cover.slug}-${cover.name}.png`);

    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-ss",
        cover.at,
        "-i",
        src,
        "-frames:v",
        "1",
        "-loglevel",
        "error",
        still,
      ],
      { stdio: "inherit" },
    );

    const meta = await sharp(still).metadata();
    const dir = path.join(OUT_ROOT, cover.slug);
    mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${cover.name}.webp`);

    if ((meta.width ?? 0) >= FULL_BLEED_MIN) {
      await sharp(still)
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
        .webp({ quality: 80 })
        .toFile(out);
      console.log(
        `  ✓ ${cover.slug}/${cover.name} — full bleed from ${meta.width}px`,
      );
      continue;
    }

    // Fit the shot inside the frame without ever enlarging it beyond 1.4×,
    // which is where the upscaling starts to show.
    const maxInner = { w: 1240, h: 720 };
    const scale = Math.min(
      maxInner.w / (meta.width ?? 1),
      maxInner.h / (meta.height ?? 1),
      1.4,
    );
    const innerW = Math.round((meta.width ?? 1) * scale);
    const innerH = Math.round((meta.height ?? 1) * scale);
    const bar = 34;

    const shot = await sharp(still)
      .resize(innerW, innerH, { kernel: "lanczos3" })
      .composite([{ input: roundedMask(innerW, innerH, 8), blend: "dest-in" }])
      .png()
      .toBuffer();

    const framed = await sharp(chrome(innerW, innerH, bar))
      .composite([{ input: shot, top: bar, left: 0 }])
      .png()
      .toBuffer();

    await sharp(backdrop())
      .composite([
        {
          input: framed,
          top: Math.round((HEIGHT - (innerH + bar)) / 2),
          left: Math.round((WIDTH - innerW) / 2),
        },
      ])
      .webp({ quality: 82 })
      .toFile(out);

    console.log(
      `  ✓ ${cover.slug}/${cover.name} — framed from ${meta.width}px`,
    );
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}

console.log(`\n${queue.length} covers written.`);
