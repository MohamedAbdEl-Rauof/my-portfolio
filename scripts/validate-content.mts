/**
 * Validates everything under content/ before a build.
 *
 * Two jobs. First, every file has to satisfy its Zod schema. Second — the part
 * a schema cannot do — references between files have to resolve: a project that
 * names a tech id nothing defines, or a cover image that is not on disk, is a
 * broken page that would otherwise only be discovered by looking at it.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { Profile } from "../src/lib/schemas/profile.ts";
import { TechRegistry } from "../src/lib/schemas/tech.ts";
import { Project, ProjectIndex } from "../src/lib/schemas/project.ts";
import {
  Skills,
  Experience,
  Education,
  Certificates,
  Services,
} from "../src/lib/schemas/resume.ts";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");

const errors: string[] = [];
const fail = (where: string, message: string) =>
  errors.push(`${where}: ${message}`);

function parse<S extends z.ZodType>(rel: string, schema: S): z.infer<S> | null {
  const file = path.join(CONTENT, rel);
  if (!existsSync(file)) {
    fail(rel, "file is missing");
    return null;
  }
  let data: unknown;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(rel, `invalid JSON — ${String(error)}`);
    return null;
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    for (const issue of result.error.issues) {
      fail(rel, `${issue.path.join(".") || "<root>"} — ${issue.message}`);
    }
    return null;
  }
  return result.data;
}

/** A referenced asset must exist, or the page renders a broken image. */
function assetExists(where: string, field: string, src: string) {
  if (!existsSync(path.join(PUBLIC, src.replace(/^\//, "")))) {
    fail(where, `${field} points at a file that does not exist: ${src}`);
  }
}

const tech = parse("tech.json", TechRegistry);
const techIds = new Set(tech?.items.map((t) => t.id) ?? []);
const techWithLogo = new Set(
  tech?.items.filter((t) => t.logo).map((t) => t.id) ?? [],
);

for (const item of tech?.items ?? []) {
  if (item.logo) assetExists("tech.json", `${item.id}.logo`, item.logo);
}

const profile = parse("profile.json", Profile);
if (profile) {
  assetExists("profile.json", "photo", profile.photo);
  assetExists("profile.json", "cv.en", profile.cv.en);
  assetExists("profile.json", "cv.ar", profile.cv.ar);
}

const skills = parse("skills.json", Skills);
for (const group of skills?.groups ?? []) {
  for (const id of group.items) {
    if (!techIds.has(id)) {
      fail("skills.json", `group "${group.id}" names unknown tech id "${id}"`);
    }
  }
}
for (const id of skills?.marquee ?? []) {
  if (!techWithLogo.has(id)) {
    fail("skills.json", `marquee id "${id}" has no logo asset to display`);
  }
}

const certificates = parse("certificates.json", Certificates);
for (const cert of certificates?.items ?? []) {
  assetExists("certificates.json", `${cert.id}.image`, cert.image);
  for (const id of cert.skills) {
    if (!techIds.has(id)) {
      fail("certificates.json", `${cert.id} names unknown tech id "${id}"`);
    }
  }
}

parse("education.json", Education);
parse("services.json", Services);

// ---- Projects -------------------------------------------------------------

const projectsDir = path.join(CONTENT, "projects");
const projectFiles = existsSync(projectsDir)
  ? readdirSync(projectsDir).filter(
      (f) => f.endsWith(".json") && f !== "_index.json",
    )
  : [];

if (projectFiles.length === 0)
  fail("content/projects", "no project files found");

const projects = new Map<string, z.infer<typeof Project>>();

for (const file of projectFiles.sort()) {
  const rel = path.join("projects", file);
  const project = parse(rel, Project);
  if (!project) continue;

  const expected = `${project.slug}.json`;
  if (file !== expected) {
    fail(rel, `slug "${project.slug}" does not match the filename`);
  }
  if (projects.has(project.slug)) {
    fail(rel, `duplicate slug "${project.slug}"`);
  }
  projects.set(project.slug, project);

  assetExists(rel, "cover", project.cover);
  project.gallery.forEach((image, i) =>
    assetExists(rel, `gallery[${i}]`, image.src),
  );
  if (project.video) {
    assetExists(rel, "video.src", project.video.src);
    assetExists(rel, "video.poster", project.video.poster);
  }
  for (const id of project.stack) {
    if (!techIds.has(id)) {
      fail(rel, `stack names unknown tech id "${id}"`);
    }
  }
  if (project.private && !project.privateNote) {
    fail(rel, "private projects must explain the absence with privateNote");
  }
  if (!project.private && project.status === "live" && !project.links.live) {
    fail(rel, 'status is "live" but no links.live is given');
  }
  if (project.caseStudy && project.metrics.length === 0) {
    fail(rel, "a case study should carry at least one metric");
  }
}

const index = parse("projects/_index.json", ProjectIndex);
if (index) {
  for (const slug of index.order) {
    if (!projects.has(slug)) {
      fail("projects/_index.json", `order names unknown project "${slug}"`);
    }
  }
  const listed = new Set(index.order);
  for (const slug of projects.keys()) {
    if (!listed.has(slug)) {
      fail("projects/_index.json", `project "${slug}" is missing from order`);
    }
  }
  if (new Set(index.order).size !== index.order.length) {
    fail("projects/_index.json", "order contains a duplicate slug");
  }
}

const featured = [...projects.values()].filter((p) => p.featured);
if (featured.length > 6) {
  fail(
    "content/projects",
    `${featured.length} projects are featured; the home page shows at most 6`,
  );
}

const experience = parse("experience.json", Experience);
for (const role of experience?.roles ?? []) {
  for (const slug of role.projectSlugs) {
    if (!projects.has(slug)) {
      fail(
        "experience.json",
        `role "${role.company.en}" links unknown project "${slug}"`,
      );
    }
  }
}

// ---- Report ---------------------------------------------------------------

if (errors.length > 0) {
  console.error(
    `\n✖ Content validation failed with ${errors.length} problem(s):\n`,
  );
  for (const error of errors) console.error(`  • ${error}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✓ Content valid — ${projects.size} projects, ${techIds.size} tech entries, ${featured.length} featured.`,
);
