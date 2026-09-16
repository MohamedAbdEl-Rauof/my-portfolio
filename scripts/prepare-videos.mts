/**
 * Moves the screen recordings into each project's folder, re-encoding the
 * heavy ones.
 *
 * Video only ever plays on a project's own page, behind a poster and an
 * explicit tap, so the budget is about the visitor who chose to watch rather
 * than page weight. Anything over 1.5 MB or wider than 1280 is re-encoded;
 * everything else is copied untouched, because a second pass through x264 only
 * loses quality. Recordings narrower than 800px are skipped: at that size a
 * video shows less than the framed still already does.
 *
 *   node scripts/prepare-videos.mts
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const MAP: Array<[slug: string, source: string]> = [
  ["whatsapp-patient-platform", "chatwoot.mp4"],
  ["lab-results-automation", "n8n.mp4"],
  ["ai-auto-reply-assistant", "typobot.mp4"],
  ["nova-bill", "nova-bill-lab.mp4"],
  ["qriib-app", "qriib-dashboard.mp4"],
  ["qriib-website", "qrrib-website.mp4"],
  ["vconnct-dashboard", "vconnctDashboard.mp4"],
  ["tawteen", "tawteen.mp4"],
  ["cozy-loops", "cozyLoops.mp4"],
  ["chat-app", "chat-app.mp4"],
  ["vconnct-landing-pages", "investInTech.mp4"],
];

const MAX_BYTES = 1.5 * 1024 * 1024;
const MAX_WIDTH = 1280;
const MIN_USEFUL_WIDTH = 800;

const ROOT = process.cwd();
const SOURCES = path.join(ROOT, "media-sources/recordings");
const OUT_ROOT = path.join(ROOT, "public/projects");

function probe(file: string) {
  const out = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width",
      "-of",
      "csv=p=0",
      file,
    ],
    { encoding: "utf8" },
  );
  return Number.parseInt(out.trim(), 10);
}

const mb = (n: number) => `${(n / 1048576).toFixed(2)} MB`;

for (const [slug, source] of MAP) {
  const src = path.join(SOURCES, source);
  const width = probe(src);
  const bytes = statSync(src).size;

  if (width < MIN_USEFUL_WIDTH) {
    console.log(`  – ${slug} — skipped, source is only ${width}px wide`);
    continue;
  }

  const dir = path.join(OUT_ROOT, slug);
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "demo.mp4");

  if (bytes <= MAX_BYTES && width <= MAX_WIDTH) {
    copyFileSync(src, out);
    console.log(`  ✓ ${slug} — copied as-is (${width}px, ${mb(bytes)})`);
    continue;
  }

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      src,
      "-vf",
      `scale='min(${MAX_WIDTH},iw)':-2`,
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "slow",
      // These are silent screen captures; the audio track is dead weight.
      "-an",
      // Put the index at the front so playback can start before the full file
      // has arrived.
      "-movflags",
      "+faststart",
      "-loglevel",
      "error",
      out,
    ],
    { stdio: "inherit" },
  );

  const after = statSync(out).size;
  console.log(
    `  ✓ ${slug} — re-encoded ${width}px ${mb(bytes)} → ${MAX_WIDTH}px ${mb(after)}`,
  );
}

console.log("\n✓ videos prepared");
