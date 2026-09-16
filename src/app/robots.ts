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
      // Nothing under here renders a page worth indexing.
      disallow: ["/api/", "/ar/dev/", "/en/dev/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
