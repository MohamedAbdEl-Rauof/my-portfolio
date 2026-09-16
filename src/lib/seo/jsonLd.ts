import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/config/site";
import type { Profile, Project } from "@/lib/schemas";

/** The person the whole site is about. */
export function personSchema({
  profile,
  locale,
  knowsAbout,
  alumniOf,
}: {
  profile: Profile;
  locale: Locale;
  knowsAbout: string[];
  alumniOf: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/${locale}#person`),
    name: profile.name[locale],
    alternateName: profile.name[locale === "ar" ? "en" : "ar"],
    jobTitle: profile.headline[locale],
    email: `mailto:${profile.email}`,
    telephone: `+${profile.whatsapp}`,
    image: absoluteUrl(profile.photo),
    url: absoluteUrl(`/${locale}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? "جدة" : "Jeddah",
      addressCountry: "SA",
    },
    knowsAbout,
    alumniOf: { "@type": "CollegeOrUniversity", name: alumniOf },
    knowsLanguage: ["ar", "en"],
    sameAs: profile.socials
      .filter((social) => social.id !== "email")
      .map((social) => social.url),
  };
}

export function websiteSchema({
  profile,
  locale,
}: {
  profile: Profile;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl(`/${locale}#website`),
    url: absoluteUrl(`/${locale}`),
    name: profile.name[locale],
    inLanguage: locale,
    author: { "@id": absoluteUrl(`/${locale}#person`) },
  };
}

/** A project page. */
export function projectSchema({
  project,
  locale,
  techNames,
}: {
  project: Project;
  locale: Locale;
  techNames: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[locale],
    headline: project.tagline[locale],
    description: project.summary[locale],
    url: absoluteUrl(`/${locale}/projects/${project.slug}`),
    image: absoluteUrl(project.cover),
    inLanguage: locale,
    dateCreated: project.timeline.start,
    ...(project.timeline.end ? { datePublished: project.timeline.end } : {}),
    author: { "@id": absoluteUrl(`/${locale}#person`) },
    keywords: techNames.join(", "),
    ...(project.client
      ? {
          sourceOrganization: {
            "@type": "Organization",
            name: project.client[locale],
          },
        }
      : {}),
  };
}

export function breadcrumbSchema({
  locale,
  trail,
}: {
  locale: Locale;
  trail: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(`/${locale}${item.path}`),
    })),
  };
}
