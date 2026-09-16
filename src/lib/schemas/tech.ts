import { z } from "zod";

/**
 * The technology registry: one entry per tool the site can name.
 *
 * Projects and skill groups both reference these by id rather than repeating a
 * display string, so "Next.js" can never appear as "NextJS" on one card and
 * "Next" on another, and a logo only has to be wired up once.
 */
export const TechItem = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a lowercase hyphenated id"),
  name: z.string().min(1),
  /** Path under /logos. Absent means the chip renders as text only. */
  logo: z.string().startsWith("/logos/").optional(),
});
export type TechItem = z.infer<typeof TechItem>;

export const TechRegistry = z.object({
  items: z.array(TechItem).min(1),
});
