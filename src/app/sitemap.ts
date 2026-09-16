import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/config/site";
import { getProjects } from "@/lib/content";

/**
 * One entry per page per language, each carrying the full set of alternates.
 *
 * Static pages carry no `lastModified`. Stamping them with the build time
 * would tell a crawler that every page changed on every deploy, including
 * deploys that touched none of them, and a signal that is always true stops
 * being read. Project pages carry the real end of their timeline instead.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Array<[path: string, priority: number]> = [
    ["", 1],
    ["/projects", 0.9],
    ["/about", 0.8],
    ["/contact", 0.7],
  ];

  const alternates = (path: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        absoluteUrl(`/${locale}${path}`),
      ]),
    ),
  });

  const pages = staticPaths.flatMap(([path, priority]) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      priority,
      changeFrequency: "monthly" as const,
      alternates: alternates(path),
    })),
  );

  const projects = getProjects().flatMap((project) => {
    const path = `/projects/${project.slug}`;
    // The end of the work is the last time the page's content was true; an
    // ongoing project falls back to when it started.
    const stamp = project.timeline.end ?? project.timeline.start;
    return routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      lastModified: new Date(`${stamp}-01T00:00:00Z`),
      priority: project.featured ? 0.8 : 0.6,
      changeFrequency: "yearly" as const,
      alternates: alternates(path),
    }));
  });

  return [...pages, ...projects];
}
