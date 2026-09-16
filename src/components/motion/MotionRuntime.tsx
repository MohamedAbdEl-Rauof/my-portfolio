"use client";

import { useEffect } from "react";

/**
 * The whole animation runtime, mounted once in the layout.
 *
 * Adds `js` to the root so reveals only hide themselves when something is
 * present to show them again (the server HTML stays fully visible). Then one
 * IntersectionObserver marks `.reveal` sections visible on first sight and runs
 * any `[data-count]` counters inside them. Nothing else on the site needs
 * JavaScript to move; the hover and load animations are CSS.
 */
export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const count = (section: Element) => {
      section.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        if (node.dataset.done) return;
        node.dataset.done = "1";
        const to = Number(node.dataset.count);
        const duration = reduced ? 0 : 1200;
        const start = performance.now();
        const step = (now: number) => {
          const p = duration ? Math.min(1, (now - start) / duration) : 1;
          node.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          count(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-40px" },
    );

    const observe = () =>
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    observe();

    // Client-side navigations swap the page without remounting this component.
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
