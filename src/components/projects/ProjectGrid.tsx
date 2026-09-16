import type { Project } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";

/**
 * The work grid. The first two entries run at half width so the lead projects
 * get a cover big enough to read, and the rest settle into thirds.
 */
export function ProjectGrid({
  projects,
  leadCount = 2,
  headingLevel = "h3",
}: {
  projects: Project[];
  leadCount?: number;
  /** Passed through to each card; see ProjectCard. */
  headingLevel?: "h2" | "h3";
}) {
  const lead = projects.slice(0, leadCount);
  const rest = projects.slice(leadCount);

  return (
    <div className="space-y-6">
      {lead.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {lead.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              priority={index === 0}
              headingLevel={headingLevel}
            />
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel={headingLevel}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
