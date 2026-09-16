/**
 * Captures cover and gallery images from the live sites.
 *
 * A real screenshot of a running site beats a frame pulled from an old screen
 * recording every time: the recordings in this repo range from 426px to 1920px
 * wide, and the small ones cannot be shown full-bleed without looking broken.
 *
 * Runs against the system Chrome (the cached Playwright build does not match
 * the installed package, and downloading another browser is not worth it).
 * Targets that are down are reported and skipped rather than failing the run,
 * because several of these are client sites this repo does not control.
 *
 *   node scripts/capture-screenshots.mts [slug ...]
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium, type Page } from "playwright";
import sharp from "sharp";

type Shot = {
  slug: string;
  /** Output name without extension: "cover" or "gallery-1". */
  name: string;
  url: string;
  /** Wait for this selector before shooting, when the hero loads late. */
  waitFor?: string;
  /** Extra settle time in ms for animation-heavy pages. */
  settle?: number;
  /** Extra selectors to hide, beyond the standard consent banners. */
  hide?: string[];
};

const SHOTS: Shot[] = [
  {
    slug: "nova-medicals",
    name: "cover",
    url: "https://nova-medicals.com/",
    settle: 2500,
  },
  {
    slug: "nova-medicals",
    name: "gallery-1",
    url: "https://nova-medicals.com/booking",
  },
  {
    slug: "nova-medicals",
    name: "gallery-2",
    url: "https://nova-medicals.com/departments",
  },
  {
    slug: "nova-medicals",
    name: "gallery-3",
    url: "https://nova-medicals.com/doctors",
  },
  {
    slug: "nova-medicals",
    name: "gallery-4",
    url: "https://nova-medicals.com/blog",
  },
  { slug: "qriib-website", name: "cover", url: "https://qriib.com/" },
  { slug: "vconnct-website", name: "cover", url: "https://vconnct.me/" },
  {
    slug: "cozy-loops",
    name: "cover",
    url: "https://cozyloopstore.vercel.app/",
  },
  {
    slug: "ecommerce-platform",
    name: "cover",
    url: "https://e-commerce-platform-website.netlify.app/",
  },
  // Render free tier sleeps; the navigation timeout below allows for a cold start.
  {
    slug: "chat-app",
    name: "cover",
    url: "https://chat-app-pz4n.onrender.com/",
    settle: 3000,
  },
];

const WIDTH = 1600;
const HEIGHT = 1000;
/*
 * Shoot a viewport taller than the crop, then keep the top 1600×1000.
 *
 * Consent banners and support widgets are pinned to the bottom of the viewport,
 * so giving the page 500px of extra height pushes them below the crop line and
 * out of the final image — without clicking "accept" on the visitor's behalf or
 * maintaining a list of every banner selector on the web.
 */
const SHOOT_HEIGHT = HEIGHT + 500;
const PUBLIC = path.join(process.cwd(), "public");

const only = new Set(process.argv.slice(2));
const queue = only.size > 0 ? SHOTS.filter((s) => only.has(s.slug)) : SHOTS;

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({
  viewport: { width: WIDTH, height: SHOOT_HEIGHT },
  deviceScaleFactor: 2,
  // Some of these sites gate on a real UA; the default Playwright string is
  // occasionally served a degraded page.
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
});

/**
 * Stops looping carousels and scroll-triggered motion, and hides consent
 * banners.
 *
 * The banners are hidden, never clicked: accepting cookies on someone's behalf
 * to tidy up a screenshot is a consent decision that is not mine to make, and
 * `display: none` produces the same clean frame without one.
 */
async function freeze(page: Page, hide: string[] = []) {
  const BANNERS = [
    "#onetrust-consent-sdk",
    "#CybotCookiebotDialog",
    "#cookie-banner",
    "#cookieConsent",
    ".cookie-banner",
    ".cookie-consent",
    ".cc-window",
    "[id*='cookie-banner' i]",
    "[class*='cookie-banner' i]",
    "[aria-label*='cookie' i]",
    "[data-testid*='cookie' i]",
  ];
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      ${[...BANNERS, ...hide].join(",\n")} { display: none !important; }
    `,
  });
}

const ok: string[] = [];
const failed: Array<[string, string]> = [];

for (const shot of queue) {
  const label = `${shot.slug}/${shot.name}`;
  const page = await context.newPage();
  try {
    await page.goto(shot.url, { waitUntil: "load", timeout: 90_000 });
    if (shot.waitFor) {
      await page.waitForSelector(shot.waitFor, { timeout: 20_000 });
    }
    await page
      .waitForLoadState("networkidle", { timeout: 30_000 })
      .catch(() => {});
    await freeze(page, shot.hide ?? []);
    await page.waitForTimeout(shot.settle ?? 1200);

    const buffer = await page.screenshot({ type: "png" });
    const dir = path.join(PUBLIC, "projects", shot.slug);
    mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${shot.name}.webp`);

    await sharp(buffer)
      // deviceScaleFactor 2 means the buffer is twice the CSS size.
      .extract({ left: 0, top: 0, width: WIDTH * 2, height: HEIGHT * 2 })
      .resize(WIDTH, HEIGHT)
      .webp({ quality: 80 })
      .toFile(out);

    ok.push(label);
    console.log(`  ✓ ${label}`);
  } catch (error) {
    const message = String(error).split("\n")[0].slice(0, 120);
    failed.push([label, message]);
    console.log(`  ✖ ${label} — ${message}`);
  } finally {
    await page.close();
  }
}

await browser.close();

console.log(`\n${ok.length} captured, ${failed.length} failed.`);
if (failed.length > 0) {
  console.log("Failed targets (cover these with a generated card instead):");
  for (const [label, message] of failed)
    console.log(`  • ${label}: ${message}`);
}
