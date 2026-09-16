import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// Same resolver the app uses, so the build-time guard and the runtime origin
// can never drift apart.
import { resolveSiteUrl } from "./src/lib/config/site.ts";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * A production build with the wrong origin silently poisons every canonical
 * URL, sitemap entry and OG tag, and Search Console only tells you weeks
 * later. Fail the build instead.
 */
function assertSiteUrl() {
  if (process.env.NODE_ENV !== "production") return;
  const url = resolveSiteUrl();
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Site origin is not a valid URL: "${url}"`);
  }
  if (parsed.protocol !== "https:") {
    throw new Error(
      `A production build resolved the site origin "${url}", which is not https.\n` +
        `Set NEXT_PUBLIC_SITE_URL to the public origin. A key that exists but is\n` +
        `EMPTY counts as unset and hides the value in .env.production — delete it\n` +
        `rather than leaving it blank.`,
    );
  }
}
assertSiteUrl();

const nextConfig: NextConfig = {
  // Stray lockfiles elsewhere in $HOME confuse workspace-root inference.
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 ignores any quality not listed here.
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  /**
   * v1 served these paths unprefixed. They are the URLs already indexed and
   * shared, so they keep working and hand their equity to the Arabic route.
   * `/` is handled by the locale proxy, not here.
   */
  async redirects() {
    return [
      { source: "/home", destination: "/ar", permanent: true },
      { source: "/about", destination: "/ar/about", permanent: true },
      { source: "/projects", destination: "/ar/projects", permanent: true },
      // v2 folds the certificates page into About.
      { source: "/certificates", destination: "/ar/about", permanent: true },
      { source: "/contact", destination: "/ar/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
