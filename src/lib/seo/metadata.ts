import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/config/site";

const OG_LOCALE: Record<Locale, string> = {
  ar: "ar_SA",
  en: "en_US",
};

/**
 * Builds the metadata for one page in one language.
 *
 * The important part is `alternates`. Every page exists twice, and without an
 * explicit canonical plus a full hreflang set, a search engine has to guess
 * which of the two is the original and whether they are duplicates or
 * translations. `x-default` points at Arabic, which is what `/` resolves to.
 *
 * @param path Route without the locale prefix, e.g. "/projects".
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Absolute-from-root path to a 1200×630 card. Defaults to the generated one. */
  image?: { url: string; alt: string };
}): Metadata {
  const clean = path === "/" ? "" : path;
  const canonical = `/${locale}${clean}`;

  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, `/${code}${clean}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${clean}`,
      },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonical),
      title,
      description,
      ...(image
        ? {
            images: [
              { url: image.url, width: 1200, height: 630, alt: image.alt },
            ],
          }
        : {}),
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((code) => code !== locale)
        .map((code) => OG_LOCALE[code]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
