import { z } from "zod";
import { Bilingual, Slug } from "./shared.ts";

const YearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "must be YYYY-MM");

export const SkillGroup = z.object({
  id: z.string().min(1),
  label: Bilingual,
  /** Tech ids from content/tech.json. */
  items: z.array(z.string()).min(1),
});

export const Skills = z.object({
  groups: z.array(SkillGroup).min(1),
  /** The subset shown in the logo row, in display order. */
  marquee: z.array(z.string()).min(4),
});
export type Skills = z.infer<typeof Skills>;

export const Role = z.object({
  company: Bilingual,
  role: Bilingual,
  start: YearMonth,
  end: YearMonth.nullable(),
  location: Bilingual,
  summary: Bilingual,
  highlights: z.array(Bilingual).min(1),
  /** Work from this role that has its own page. */
  projectSlugs: z.array(Slug).default([]),
});

export const Experience = z.object({ roles: z.array(Role).min(1) });
export type Experience = z.infer<typeof Experience>;

export const Education = z.object({
  entries: z
    .array(
      z.object({
        institution: Bilingual,
        degree: Bilingual,
        start: z.string().regex(/^\d{4}$/),
        end: z.string().regex(/^\d{4}$/),
        location: Bilingual,
        note: Bilingual.optional(),
      }),
    )
    .min(1),
});
export type Education = z.infer<typeof Education>;

export const Certificate = z.object({
  id: Slug,
  title: Bilingual,
  issuer: Bilingual,
  /** YYYY-MM: the issuers publish a month, not a verified day. */
  date: YearMonth,
  image: z.string().startsWith("/"),
  skills: z.array(z.string()).default([]),
});

export const Certificates = z.object({
  items: z.array(Certificate).min(1),
});
export type Certificates = z.infer<typeof Certificates>;

export const Services = z.object({
  items: z
    .array(
      z.object({
        id: Slug,
        icon: z.enum(["code", "workflow", "languages", "shield"]),
        title: Bilingual,
        body: Bilingual,
      }),
    )
    .min(1),
});
export type Services = z.infer<typeof Services>;
