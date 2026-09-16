import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next 16 renamed middleware.ts to proxy.ts. This one only resolves the locale:
 * there is nothing to authenticate on a portfolio.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension
  // (sitemap.xml, robots.txt, manifest.webmanifest, /icons/*, images).
  // `.+` rather than `.*`: the bare `/` is excluded on purpose, because the
  // (root) group serves it as a real page for link-preview crawlers.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).+)"],
};
