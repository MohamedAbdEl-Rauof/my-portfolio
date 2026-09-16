import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/schemas";
import type { Locale } from "@/i18n/routing";
import { resolveTech } from "@/lib/content";
import { StatusLabel } from "./StatusLabel";

/**
 * A project tile: the cover zooms on hover while a panel of stack tags slides
 * up over it. The owner built this exact interaction for his first portfolio.
 */
export async function ProjectCard({
  project,
  index = 0,
  priority = false,
  headingLevel = "h3",
}: {
  project: Project;
  index?: number;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const locale = (await getLocale()) as Locale;
  const common = await getTranslations("common");
  const Heading = headingLevel;
  const tags = resolveTech(project.stack.slice(0, 4)).map((t) => t.name);

  return (
    <Link
      href={`/projects/${project.slug}`}
      prefetch={false}
      className="tile card span-6"
      style={{ "--n": index } as React.CSSProperties}
    >
      <span className="media">
        <Image
          src={project.cover}
          alt={project.coverAlt[locale]}
          width={1600}
          height={1000}
          priority={priority}
          sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw"
        />
      </span>
      <span className="panel" aria-hidden="true">
        <span className="flex flex-wrap gap-1.5" dir="ltr">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </span>
      </span>
      <span className="flex flex-col gap-1 px-4 pt-4 pb-4.5 sm:px-5">
        <Heading className="title text-lg font-bold">
          {project.title[locale]}
        </Heading>
        <span className="text-sm text-muted-foreground">
          {project.tagline[locale]}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          <b className="font-semibold text-foreground">
            <StatusLabel status={project.status} />
          </b>
          {" · "}
          <span className="numeric">{project.timeline.start.slice(0, 4)}</span>
          {project.caseStudy ? ` · ${common("readCaseStudy")}` : null}
        </span>
      </span>
    </Link>
  );
}
