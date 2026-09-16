/**
 * Social cards for the four non-project pages, in both languages.
 *
 * Rendered with sharp rather than the JSX card renderer. That renderer threw
 * on a subset of Arabic headings during prerender and the cause was not worth
 * chasing; librsvg shapes Arabic correctly, joins the letterforms and orders
 * the line right to left, which is the whole requirement here.
 *
 * Project pages do not use this: they use a crop of their own cover, which is
 * more persuasive in a shared link than a title card.
 *
 *   node scripts/make-page-cards.mts
 */
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const INK = "#0b1220";
const SIGNAL = "245, 184, 65";
const TEXT = "#e8ecf5";
const MUTED = "#8c97af";
const AR_FONT = "Noto Sans Arabic";
const LATIN_FONT = "DejaVu Sans";
const MONO_FONT = "DejaVu Sans Mono";

type Locale = "ar" | "en";

const messages: Record<Locale, Record<string, Record<string, string>>> = {
  ar: JSON.parse(readFileSync("messages/ar.json", "utf8")),
  en: JSON.parse(readFileSync("messages/en.json", "utf8")),
};
const profile = JSON.parse(readFileSync("content/profile.json", "utf8"));

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** SVG cannot wrap text, so lines are measured and broken here. */
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

function card({
  locale,
  eyebrow,
  title,
  subtitle,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const rtl = locale === "ar";
  // Anchor at the edge the language starts from. No `direction` attribute:
  // Pango infers it from the characters, and setting it flips the anchor.
  const anchor = rtl ? "end" : "start";
  const x = rtl ? WIDTH - 80 : 80;
  const font = rtl ? AR_FONT : LATIN_FONT;

  const grid: string[] = [];
  for (let gx = 0; gx <= WIDTH; gx += 40) {
    grid.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${HEIGHT}" />`);
  }
  for (let gy = 0; gy <= HEIGHT; gy += 40) {
    grid.push(`<line x1="0" y1="${gy}" x2="${WIDTH}" y2="${gy}" />`);
  }

  // Arabic sets narrower than Latin at the same size, so it fits more per line.
  const titleLines = wrap(title, rtl ? 30 : 26);
  const subtitleLines = wrap(subtitle, rtl ? 58 : 54);

  const titleSize = titleLines.length > 2 ? 54 : 66;
  const titleTop = 250;
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="${x}" y="${titleTop + i * (titleSize + 14)}" font-family="${font}" font-size="${titleSize}" font-weight="bold" fill="${TEXT}" text-anchor="${anchor}">${escape(line)}</text>`,
    )
    .join("");

  const subTop = titleTop + titleLines.length * (titleSize + 14) + 18;
  const subtitleSvg = subtitleLines
    .map(
      (line, i) =>
        `<text x="${x}" y="${subTop + i * 40}" font-family="${font}" font-size="27" fill="${MUTED}" text-anchor="${anchor}">${escape(line)}</text>`,
    )
    .join("");

  const markX = rtl ? WIDTH - 80 - 44 : 80;
  const domainX = rtl ? 80 : WIDTH - 80;
  const domainAnchor = rtl ? "start" : "end";

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="${rtl ? "82%" : "18%"}" cy="0%" r="85%">
      <stop offset="0%" stop-color="rgb(${SIGNAL})" stop-opacity="0.20" />
      <stop offset="100%" stop-color="rgb(${SIGNAL})" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}" />
  <g stroke="rgb(${SIGNAL})" stroke-opacity="0.07" stroke-width="1">${grid.join("")}</g>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <rect x="${rtl ? WIDTH - 80 - 78 : 80}" y="140" width="78" height="6" rx="3" fill="rgb(${SIGNAL})" />
  <text x="${x}" y="200" font-family="${rtl ? AR_FONT : MONO_FONT}" font-size="25"
        ${rtl ? "" : 'letter-spacing="3"'} fill="rgb(${SIGNAL})" text-anchor="${anchor}">${escape(rtl ? eyebrow : eyebrow.toUpperCase())}</text>
  ${titleSvg}
  ${subtitleSvg}

  <rect x="${markX}" y="${HEIGHT - 116}" width="44" height="44" rx="12" fill="rgb(${SIGNAL})" />
  <text x="${rtl ? markX - 16 : markX + 60}" y="${HEIGHT - 86}" font-family="${font}" font-size="25"
        fill="${TEXT}" text-anchor="${rtl ? "end" : "start"}">${escape(profile.name[locale])}</text>
  <text x="${domainX}" y="${HEIGHT - 86}" font-family="${MONO_FONT}" font-size="21"
        fill="${MUTED}" text-anchor="${domainAnchor}">developer-moraouf.vercel.app</text>
</svg>`);
}

const OUT = path.join(process.cwd(), "public/og");
mkdirSync(OUT, { recursive: true });

for (const locale of ["ar", "en"] as const) {
  const m = messages[locale];
  const pages = [
    {
      name: "home",
      eyebrow: m.home.badge,
      title: profile.name[locale],
      subtitle: m.home.headline,
    },
    {
      name: "projects",
      eyebrow: m.projects.title,
      title: m.projects.title,
      subtitle: m.projects.subtitle,
    },
    {
      name: "about",
      eyebrow: m.about.title,
      title: profile.name[locale],
      subtitle: m.about.lead,
    },
    {
      name: "contact",
      eyebrow: m.contact.title,
      title: m.contact.title,
      subtitle: m.contact.lead,
    },
  ];

  for (const page of pages) {
    const file = path.join(OUT, `${page.name}-${locale}.jpg`);
    await sharp(card({ locale, ...page }))
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(file);
    console.log(`  ✓ /og/${page.name}-${locale}.jpg`);
  }
}

console.log("\n8 page cards written.");
