import { z } from "zod";
import { Bilingual, Slug } from "./shared.ts";

/** YYYY-MM. Day precision would imply a certainty these dates do not have. */
const YearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "must be YYYY-MM");

export const ProjectStatus = z.enum([
  "live",
  "internal",
  "archived",
  "in-progress",
]);
export const ProjectCategory = z.enum([
  "professional",
  "freelance",
  "personal",
]);
export const ProjectTag = z.enum([
  "healthcare",
  "automation",
  "ai",
  "saas",
  "ecommerce",
  "landing",
  "dashboard",
  "realtime",
  "compliance",
  "rtl",
]);

const Image = z.object({
  src: z.string().startsWith("/"),
  alt: Bilingual,
  caption: Bilingual.optional(),
});

/**
 * The long-form body. Only projects worth a full read carry one; everything
 * else renders the light template from the fields above.
 */
const CaseStudy = z.object({
  problem: z.array(Bilingual).min(1),
  approach: z.array(Bilingual).min(1),
  results: z.array(Bilingual).min(1),
  sections: z
    .array(
      z.object({
        heading: Bilingual,
        body: z.array(Bilingual).min(1),
        bullets: z.array(Bilingual).optional(),
        image: Image.optional(),
      }),
    )
    .default([]),
  lessons: z.array(Bilingual).default([]),
});

export const Project = z.object({
  slug: Slug,
  title: Bilingual,
  tagline: Bilingual,
  summary: Bilingual,
  /** What I actually did, stated plainly: solo, or which part of a team. */
  role: Bilingual,
  client: Bilingual.optional(),
  timeline: z.object({
    start: YearMonth,
    /** null means the work is ongoing. */
    end: YearMonth.nullable(),
  }),
  status: ProjectStatus,
  category: ProjectCategory,
  tags: z.array(ProjectTag).default([]),
  featured: z.boolean().default(false),
  order: z.number().int(),
  cover: z.string().startsWith("/"),
  coverAlt: Bilingual,
  gallery: z.array(Image).default([]),
  video: z
    .object({
      src: z.string().startsWith("/"),
      poster: z.string().startsWith("/"),
    })
    .optional(),
  links: z
    .object({
      live: z.url().optional(),
      source: z.url().optional(),
      docs: z.url().optional(),
    })
    .default({}),
  /** Tech ids, resolved against content/tech.json at validation time. */
  stack: z.array(z.string()).min(1),
  highlights: z.array(Bilingual).min(2).max(6),
  metrics: z
    .array(
      z.object({
        label: Bilingual,
        value: z.string().min(1),
        note: Bilingual.optional(),
      }),
    )
    .default([]),
  caseStudy: CaseStudy.optional(),
  /** Client-internal work: no public URL, and screens are shown with seeded data. */
  private: z.boolean().default(false),
  privateNote: Bilingual.optional(),
  seo: z
    .object({ title: Bilingual.optional(), description: Bilingual.optional() })
    .optional(),
});
export type Project = z.infer<typeof Project>;

/** Explicit display order for the work grid. */
export const ProjectIndex = z.object({ order: z.array(Slug).min(1) });
