import { z } from "zod";
import { Bilingual } from "./shared.ts";

export const SocialLink = z.object({
  id: z.enum(["github", "linkedin", "email", "instagram", "facebook", "x"]),
  label: z.string().min(1),
  url: z.string().min(1),
});
export type SocialLink = z.infer<typeof SocialLink>;

export const Profile = z.object({
  name: Bilingual,
  shortName: Bilingual,
  /** Used by the brand mark and the OG cards. */
  initials: z.string().min(1).max(3),
  headline: Bilingual,
  location: Bilingual,
  email: z.email(),
  /** E.164 without the plus, the form wa.me expects. */
  whatsapp: z.string().regex(/^\d{8,15}$/),
  whatsappDisplay: z.string().min(1),
  photo: z.string().startsWith("/"),
  availability: z.boolean(),
  cv: z.object({
    en: z.string().startsWith("/"),
    ar: z.string().startsWith("/"),
  }),
  socials: z.array(SocialLink).min(1),
});
export type Profile = z.infer<typeof Profile>;
