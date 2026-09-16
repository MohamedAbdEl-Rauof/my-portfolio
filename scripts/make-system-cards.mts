/**
 * Typographic covers for the systems that cannot be screenshotted.
 *
 * Six projects here run behind a client login, need a seeded database to boot,
 * or have no interface at all. Rather than mock up a screen that was never
 * taken — which would read as a real screenshot of software that does not look
 * like that — each one gets an honest card: the name, the client, the stack,
 * and a line saying a walkthrough is available. It is obviously a title card,
 * not a product shot.
 *
 *   node scripts/make-system-cards.mts [slug ...]
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

type Card = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  stack: string[];
};

const CARDS: Card[] = [
  {
    slug: "queue-system",
    eyebrow: "Nova International Medical Complex",
    title: "Patient queue system",
    subtitle:
      "Reception, doctor consoles and floor displays that call numbers aloud in Arabic",
    stack: [
      "Next.js",
      "Supabase realtime",
      "next-intl",
      "Arabic TTS",
      "Playwright",
    ],
  },
  {
    slug: "nova-dash",
    eyebrow: "Nova International Medical Complex",
    title: "Nova Dash",
    subtitle:
      "Doctors, departments and schedules, plus the API the WhatsApp bot reads",
    stack: ["Next.js", "Supabase", "shadcn/ui", "Bot API", "Arabic RTL"],
  },
  {
    slug: "noor-dashboard",
    eyebrow: "Al-Nakheel Al-Sabaa Trading",
    title: "Delegate performance dashboard",
    subtitle:
      "The per-assignee report ClickUp could not produce, embedded back into ClickUp",
    stack: ["Next.js", "ClickUp API", "shadcn/ui", "Arabic RTL"],
  },
  {
    slug: "property-management",
    eyebrow: "Internal tool",
    title: "Rental property manager",
    subtitle:
      "Shared-meter bill splitting, payments and WhatsApp reminders to tenants",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "Arabic RTL"],
  },
  {
    slug: "hr-finger",
    eyebrow: "Command line tool",
    title: "Attendance log auditor",
    subtitle:
      "Turns raw fingerprint punches into hours worked, and flags what it cannot explain",
    stack: ["Python", "CSV", "Triple cross-check"],
  },
  {
    slug: "3legant",
    eyebrow: "Personal project",
    title: "3legant store and admin",
    subtitle:
      "A full storefront with checkout, plus the dashboard that runs it",
    stack: ["Next.js", "MongoDB", "NextAuth.js", "Cloudinary", "Material UI"],
  },
];

const WIDTH = 1600;
const HEIGHT = 1000;
const INK = "#0B1220";
const SIGNAL = "245, 184, 65";
const SANS = "DejaVu Sans";
const MONO = "DejaVu Sans Mono";

const OUT_ROOT = path.join(process.cwd(), "public/projects");

/** SVG has no text wrapping, so lines are measured and broken by hand. */
function wrap(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function card(data: Card): Buffer {
  const grid: string[] = [];
  for (let x = 0; x <= WIDTH; x += 40) {
    grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" />`);
  }
  for (let y = 0; y <= HEIGHT; y += 40) {
    grid.push(`<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" />`);
  }

  const titleLines = wrap(data.title, 26);
  const subtitleLines = wrap(data.subtitle, 52);

  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="110" y="${430 + i * 96}" font-family="${SANS}" font-size="82" font-weight="bold" fill="#E8ECF5">${escape(line)}</text>`,
    )
    .join("");

  const subtitleTop = 430 + titleLines.length * 96 + 16;
  const subtitleSvg = subtitleLines
    .map(
      (line, i) =>
        `<text x="112" y="${subtitleTop + i * 44}" font-family="${SANS}" font-size="30" fill="#8C97AF">${escape(line)}</text>`,
    )
    .join("");

  // Chips are laid out left to right using an approximate advance width;
  // DejaVu Sans Mono is 0.602em per glyph, which is exact enough here.
  let x = 112;
  const chipTop = HEIGHT - 150;
  const chips = data.stack
    .map((item) => {
      const w = Math.round(item.length * 0.602 * 24) + 44;
      const chip = `
        <rect x="${x}" y="${chipTop}" width="${w}" height="52" rx="10"
              fill="rgb(${SIGNAL})" fill-opacity="0.10"
              stroke="rgb(${SIGNAL})" stroke-opacity="0.32" />
        <text x="${x + 22}" y="${chipTop + 34}" font-family="${MONO}" font-size="24"
              fill="rgb(${SIGNAL})">${escape(item)}</text>`;
      x += w + 16;
      return chip;
    })
    .join("");

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="18%" cy="0%" r="85%">
      <stop offset="0%" stop-color="rgb(${SIGNAL})" stop-opacity="0.22" />
      <stop offset="100%" stop-color="rgb(${SIGNAL})" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}" />
  <g stroke="rgb(${SIGNAL})" stroke-opacity="0.07" stroke-width="1">${grid.join("")}</g>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <rect x="110" y="250" width="86" height="6" rx="3" fill="rgb(${SIGNAL})" />
  <text x="112" y="330" font-family="${MONO}" font-size="26" letter-spacing="3"
        fill="rgb(${SIGNAL})">${escape(data.eyebrow.toUpperCase())}</text>
  ${titleSvg}
  ${subtitleSvg}
  ${chips}
</svg>`);
}

const only = new Set(process.argv.slice(2));
const queue = only.size > 0 ? CARDS.filter((c) => only.has(c.slug)) : CARDS;

for (const data of queue) {
  const dir = path.join(OUT_ROOT, data.slug);
  mkdirSync(dir, { recursive: true });
  await sharp(card(data))
    .webp({ quality: 88 })
    .toFile(path.join(dir, "cover.webp"));
  console.log(`  ✓ ${data.slug}/cover`);
}

console.log(`\n${queue.length} cards written.`);
