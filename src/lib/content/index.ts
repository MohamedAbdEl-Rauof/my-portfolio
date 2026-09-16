import "server-only";
import { cache } from "react";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import {
  Profile,
  TechRegistry,
  Project,
  ProjectIndex,
  Skills,
  Experience,
  Education,
  Certificates,
  Services,
  type TechItem,
} from "@/lib/schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Read one JSON file and parse it through its schema.
 *
 * Throwing is the point. `scripts/validate-content.mts` runs the same schemas
 * before every build, so reaching this code with invalid content means
 * something bypassed that gate, and a page with holes in it is worse than a
 * build that stops.
 */
function readJson<S extends z.ZodType>(
  relativePath: string,
  schema: S,
): z.infer<S> {
  const file = path.join(CONTENT_DIR, relativePath);
  let raw: string;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    throw new Error(`Content file missing: content/${relativePath}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Content file is not valid JSON: content/${relativePath}\n${String(error)}`,
    );
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Content file failed validation: content/${relativePath}\n` +
        JSON.stringify(result.error.issues, null, 2),
    );
  }
  return result.data;
}

export const getProfile = cache(() => readJson("profile.json", Profile));
export const getSkills = cache(() => readJson("skills.json", Skills));
export const getExperience = cache(() =>
  readJson("experience.json", Experience),
);
export const getEducation = cache(() => readJson("education.json", Education));
export const getServices = cache(() => readJson("services.json", Services));
export const getCertificates = cache(() =>
  readJson("certificates.json", Certificates),
);

const getTechRegistry = cache(() => readJson("tech.json", TechRegistry));

/** Tech ids resolved to display names and logos, in the order given. */
export const resolveTech = cache((ids: readonly string[]): TechItem[] => {
  const byId = new Map(getTechRegistry().items.map((item) => [item.id, item]));
  // An unknown id cannot reach here — validate-content rejects it — so the
  // fallback exists only so a typo degrades to plain text rather than a crash.
  return ids.map((id) => byId.get(id) ?? { id, name: id });
});

/**
 * Every project, in the order `_index.json` sets.
 *
 * The order is explicit and hand-maintained rather than derived from a date:
 * the strongest work is not always the newest, and the grid leads with what is
 * worth reading first.
 */
export const getProjects = cache((): Project[] => {
  const dir = path.join(CONTENT_DIR, "projects");
  const files = readdirSync(dir).filter(
    (file) => file.endsWith(".json") && file !== "_index.json",
  );

  const bySlug = new Map<string, Project>();
  for (const file of files) {
    const project = readJson(path.join("projects", file), Project);
    bySlug.set(project.slug, project);
  }

  const { order } = readJson("projects/_index.json", ProjectIndex);
  return order.map((slug) => {
    const project = bySlug.get(slug);
    if (!project) {
      throw new Error(
        `content/projects/_index.json lists unknown slug "${slug}"`,
      );
    }
    return project;
  });
});

export const getProject = cache((slug: string): Project | undefined =>
  getProjects().find((project) => project.slug === slug),
);

/** The home page selection. */
export const getFeaturedProjects = cache((): Project[] =>
  getProjects().filter((project) => project.featured),
);

export const getProjectsByCategory = cache((category?: string): Project[] => {
  const all = getProjects();
  if (!category || category === "all") return all;
  return all.filter((project) => project.category === category);
});

/** Previous and next in grid order, for the footer of a project page. */
export function getProjectNeighbours(slug: string) {
  const all = getProjects();
  const index = all.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}

/** The wa.me deep link, with an optional prefilled message. */
export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
