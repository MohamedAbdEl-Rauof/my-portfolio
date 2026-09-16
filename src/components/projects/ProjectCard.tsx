import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/schemas";
import type { Locale } from "@/i18n/routing";
import { StackList } from "./StackList";
import { StatusDot } from "./StatusDot";
import { cn } from "@/lib/utils";

/**
 * A project in the grid.
 *
 * The whole card is one link. The cover is a still image rather than the
 * autoplaying video the previous site used on this screen: twenty videos
 * competing for bandwidth made the grid the slowest page on the site, and the
 * video now lives on the project's own page where someone has asked for it.
 */
export async function ProjectCard({
  project,
  priority = false,
  featured = false,
}: {
  project: Project;
  /** Set on the first card so the grid's largest image is not lazy-loaded. */
  priority?: boolean;
  featured?: boolean;
}) {
  const locale = (await getLocale()) as Locale;
  const common = await getTranslations("common");

  return (
    <article className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="glass block h-full overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:-translate-y-0.5 focus-visible:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          <Image
            src={project.cover}
            alt={project.coverAlt[locale]}
            fill
            priority={priority}
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3
                className={cn(
                  "font-display font-semibold text-balance",
                  featured ? "text-2xl" : "text-xl",
                )}
              >
                {project.title[locale]}
              </h3>
              <StatusDot status={project.status} />
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-signal rtl:-scale-x-100"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {project.tagline[locale]}
          </p>

          <StackList ids={project.stack} limit={featured ? 5 : 3} />

          {project.caseStudy ? (
            <p className="eyebrow flex items-center gap-2 text-signal">
              <span aria-hidden="true" className="h-px w-5 bg-signal" />
              {common("readCaseStudy")}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
