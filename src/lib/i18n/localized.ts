import type { Locale } from "@/i18n/routing";

/** A string authored once per language. Content files store these everywhere. */
export type Bilingual = { en: string; ar: string };

/** Pick the active language out of a bilingual field. */
export function pick(value: Bilingual, locale: Locale): string {
  return value[locale];
}
