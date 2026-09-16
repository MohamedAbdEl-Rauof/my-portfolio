/**
 * The site's absolute origin — the one thing canonical URLs, the sitemap, OG
 * tags and JSON-LD all need and that no relative path can supply.
 *
 * Deliberately narrow: name, phone, address and social links live in
 * `content/profile.json` (Zod-validated, read via `getProfile()`). Duplicating them
 * here would give us two sources of truth that silently drift apart.
 */

/**
 * Resolves the origin, most specific source first. Exported because
 * `next.config.ts` validates the *result* of this function rather than
 * re-deriving it — the two disagreeing is how a deployable build gets
 * rejected (or, worse, a bad origin gets waved through).
 */
export function resolveSiteUrl(): string {
  /* An explicit value always wins — trimmed first, because a variable created
     in a hosting dashboard with the value left blank arrives as "" and has to
     count as absent. Untrimmed it is still a *set* key, so it shadows both
     fallbacks below and every env file, and the build resolves no origin at
     all. That cost a round of failed Vercel deploys on 2026-08-17. */
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }
  /* Vercel injects this on preview deployments, where the URL isn't known ahead
     of time — but note it cannot fire while `.env.production` commits an
     explicit origin, because every Vercel build (preview included) runs with
     NODE_ENV=production and loads that file. Previews therefore canonicalise to
     the real domain, which is the safe direction: a stray preview crawl points
     at developer-moraouf.vercel.app rather than competing with it. `robots.ts` closes
     non-production deployments to crawlers regardless. */
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
} as const;

/** Turn a route into a full URL. `absoluteUrl("/blog")` → `https://…/blog`. */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
