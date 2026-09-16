import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/site";

/**
 * Preview deployments are closed to crawlers. A preview serves the same
 * content as production at a different hostname, which is a duplicate of the
 * whole site competing with the real one.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No API routes today, but a stray one should not be indexed.
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
