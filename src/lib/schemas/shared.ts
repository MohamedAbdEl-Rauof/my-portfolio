import { z } from "zod";

/**
 * A string authored once per language. Every translatable field in `content/`
 * is one of these, so a slug, a date or a link can never drift between the two
 * language versions of the same record.
 */
export const Bilingual = z.object({
  en: z.string().min(1),
  ar: z.string().min(1),
});
export type Bilingual = z.infer<typeof Bilingual>;

/** Lowercase, hyphenated, URL-safe. */
export const Slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a lowercase hyphenated slug");
