import type { Project } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="bento">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={i}
          priority={i === 0}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
