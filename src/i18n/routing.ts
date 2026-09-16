import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  /**
   * Every URL carries its locale. `as-needed` would leave the Arabic pages on
   * bare paths, which gives `/about` and `/ar/about` the same content and makes
   * the canonical/hreflang pair ambiguous. Explicit prefixes keep one URL per
   * (page, language).
   */
  localePrefix: "always",
  /**
   * `/` resolves to Arabic rather than sniffing Accept-Language: the audience
   * is Saudi-first, and a recruiter who switches to English is remembered by
   * the NEXT_LOCALE cookie next-intl sets on the switch.
   */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export function dirFor(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
