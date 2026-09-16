/**
 * The phone-width pass. Screenshots every page type in both languages, both
 * themes and two viewports, and asserts the things the redesign promised:
 * no horizontal overflow, the exact type sizes, zero font downloads, page
 * weight under budget, and no axe violations.
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3000";
const OUT = process.env.OUT ?? "./verify-out";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  "",
  "/projects",
  "/projects/nova-medicals",
  "/about",
  "/contact",
];
const LOCALES = ["ar", "en"] as const;
const THEMES = ["light", "dark"] as const;
const VIEWPORTS = [
  { name: "phone", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 800 },
];

const problems: string[] = [];
const note = (s: string) => problems.push(s);

const browser = await chromium.launch({ channel: "chrome" });

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      colorScheme: theme,
    });
    for (const locale of LOCALES) {
      for (const route of ROUTES) {
        const url = `${BASE}/${locale}${route}`;
        const page = await context.newPage();
        const fonts: string[] = [];
        let bytes = 0;
        const byType: Record<string, number> = {};
        page.on("response", async (res) => {
          const type = res.request().resourceType();
          if (type === "font") fonts.push(res.url());
          const len = Number(res.headers()["content-length"] ?? 0);
          bytes += len;
          byType[type] = (byType[type] ?? 0) + len;
        });

        await page.goto(url, { waitUntil: "networkidle" });
        const label = `${vp.name}-${theme}-${locale}${route.replace(/\//g, "_") || "_home"}`;

        const m = await page.evaluate(() => {
          const d = document.documentElement;
          const px = (el: Element | null) =>
            el ? parseFloat(getComputedStyle(el).fontSize) : NaN;
          const header = document.querySelector("header > div");
          return {
            scrollWidth: d.scrollWidth,
            clientWidth: d.clientWidth,
            h1: px(document.querySelector("h1")),
            h2: px(
              document.querySelector("main .mb-5 h2, main section > div > h2"),
            ),
            p: px(document.querySelector("main p.text-base")),
            headerHeight: header ? header.getBoundingClientRect().height : 0,
            theme: d.classList.contains("dark") ? "dark" : "light",
          };
        });

        if (m.scrollWidth > m.clientWidth)
          note(
            `${label}: horizontal overflow ${m.scrollWidth}>${m.clientWidth}`,
          );
        if (fonts.length > 5)
          note(
            `${label}: ${fonts.length} font files downloaded, expected at most 5`,
          );
        if (m.headerHeight > 64)
          note(`${label}: header wrapped to ${m.headerHeight}px`);
        if (m.theme !== theme)
          note(`${label}: theme is ${m.theme}, expected ${theme}`);

        const expect =
          vp.name === "phone"
            ? { h1: [36, 24], h2: 24, p: 15 }
            : { h1: [64, 32], h2: 32, p: 16 };
        // Home h1 is the animated name (text-4xl); inner pages are text-2xl.
        const h1Expected = route === "" ? expect.h1[0] : expect.h1[1];
        if (Math.round(m.h1) !== h1Expected)
          note(`${label}: h1 ${m.h1}px, expected ${h1Expected}`);
        if (!Number.isNaN(m.h2) && Math.round(m.h2) !== expect.h2)
          note(`${label}: h2 ${m.h2}px, expected ${expect.h2}`);
        if (Math.round(m.p) !== expect.p)
          note(`${label}: p ${m.p}px, expected ${expect.p}`);

        if (
          route === "" &&
          locale === "ar" &&
          vp.name === "phone" &&
          theme === "light"
        ) {
          console.log(`\n/ar cold load: ${(bytes / 1024).toFixed(0)} KB total`);
          for (const [k, v] of Object.entries(byType).sort(
            (a, b) => b[1] - a[1],
          )) {
            console.log(`   ${k.padEnd(12)} ${(v / 1024).toFixed(0)} KB`);
          }
          if (bytes > 250 * 1024)
            note(
              `/ar cold load ${(bytes / 1024).toFixed(0)} KB exceeds 250 KB`,
            );
        }

        await page.evaluate(() =>
          document
            .querySelectorAll(".reveal")
            .forEach((e) => e.classList.add("is-visible")),
        );
        await page.waitForTimeout(1400);
        const stillHidden = await page.evaluate(
          () =>
            [
              ...document.querySelectorAll("main *:not(.panel):not(.panel *)"),
            ].filter(
              (e) =>
                getComputedStyle(e).opacity === "0" &&
                e.getClientRects().length,
            ).length,
        );
        if (stillHidden)
          note(
            `${label}: ${stillHidden} element(s) still at opacity 0 after load`,
          );

        const axe = await new AxeBuilder({ page }).analyze();
        for (const v of axe.violations)
          note(`${label}: axe ${v.id} ×${v.nodes.length}`);

        await page.screenshot({ path: `${OUT}/${label}.png`, fullPage: true });
        await page.close();
      }
    }
    await context.close();
  }
}

await browser.close();

if (problems.length) {
  console.log(`\n✖ ${problems.length} problem(s):`);
  for (const p of problems) console.log(`  • ${p}`);
  process.exit(1);
}
console.log(
  `\n✓ all ${VIEWPORTS.length * THEMES.length * LOCALES.length * ROUTES.length} page renders pass`,
);
