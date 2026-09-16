import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  Project,
  ProjectIndex,
  TechRegistry,
} from "../src/lib/schemas/index.ts";

/**
 * A fast guard over the content files.
 *
 * `scripts/validate-content.mts` covers the same ground before a build; these
 * tests exist so the rules are also checked in a watch loop, and so a failure
 * names the specific project rather than printing a list.
 */
const ROOT = process.cwd();
const PROJECTS = path.join(ROOT, "content/projects");
const PUBLIC = path.join(ROOT, "public");

const read = (file: string) =>
  JSON.parse(readFileSync(path.join(PROJECTS, file), "utf8"));

const files = readdirSync(PROJECTS).filter(
  (file) => file.endsWith(".json") && file !== "_index.json",
);
const projects = files.map((file) => ({ file, data: read(file) }));
const techIds = new Set(
  TechRegistry.parse(
    JSON.parse(readFileSync(path.join(ROOT, "content/tech.json"), "utf8")),
  ).items.map((item) => item.id),
);

describe("projects", () => {
  it("finds project files", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(projects)("$file matches the schema", ({ data }) => {
    expect(() => Project.parse(data)).not.toThrow();
  });

  it.each(projects)("$file is named after its slug", ({ file, data }) => {
    expect(file).toBe(`${data.slug}.json`);
  });

  it("has no duplicate slugs", () => {
    const slugs = projects.map((p) => p.data.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(projects)("$file references assets that exist", ({ data }) => {
    const project = Project.parse(data);
    const assets = [
      project.cover,
      ...project.gallery.map((image) => image.src),
      ...(project.video ? [project.video.src, project.video.poster] : []),
    ];
    for (const asset of assets) {
      expect(
        existsSync(path.join(PUBLIC, asset.replace(/^\//, ""))),
        `${project.slug} → ${asset}`,
      ).toBe(true);
    }
  });

  it.each(projects)("$file only names known tech", ({ data }) => {
    const project = Project.parse(data);
    for (const id of project.stack) {
      expect(techIds.has(id), `${project.slug} → ${id}`).toBe(true);
    }
  });

  it.each(projects)("$file explains itself if it is private", ({ data }) => {
    const project = Project.parse(data);
    if (project.private) expect(project.privateNote).toBeDefined();
  });

  it.each(projects)("$file links out if it claims to be live", ({ data }) => {
    const project = Project.parse(data);
    if (project.status === "live" && !project.private) {
      expect(project.links.live, project.slug).toBeDefined();
    }
  });

  it("features at most six projects", () => {
    const featured = projects.filter((p) => p.data.featured);
    expect(featured.length).toBeLessThanOrEqual(6);
    expect(featured.length).toBeGreaterThan(0);
  });

  it("lists every project in the index exactly once", () => {
    const { order } = ProjectIndex.parse(read("_index.json"));
    const slugs = projects.map((p) => p.data.slug).sort();
    expect([...order].sort()).toEqual(slugs);
    expect(new Set(order).size).toBe(order.length);
  });
});
