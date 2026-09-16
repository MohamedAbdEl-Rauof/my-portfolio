import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getExperience, getProjects } from "@/lib/content";
import { formatRange } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Roles as a vertical timeline.
 *
 * `compact` drops the highlight bullets and the linked projects, which is what
 * the home page shows; the About page renders the full entry.
 */
export async function ExperienceTimeline({
  compact = false,
}: {
  compact?: boolean;
}) {
  const t = await getTranslations("project");
  const locale = (await getLocale()) as Locale;
  const { roles } = getExperience();
  const projects = getProjects();

  return (
    <ol className="relative space-y-10 border-s ps-6">
      {roles.map((role) => {
        const linked = role.projectSlugs
          .map((slug) => projects.find((project) => project.slug === slug))
          .filter((project) => project !== undefined);

        return (
          <li key={`${role.company.en}-${role.start}`} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -start-[1.6875rem] top-1.5 size-3 rounded-full border-2 border-background",
                role.end === null ? "bg-live" : "bg-signal",
              )}
            />

            <div className="space-y-1">
              <p className="numeric eyebrow text-muted-foreground">
                {formatRange(role.start, role.end, locale, t("present"))}
              </p>
              <h3 className="font-display text-xl font-semibold">
                {role.role[locale]}
              </h3>
              <p className="text-sm text-signal">{role.company[locale]}</p>
              <p className="text-sm text-muted-foreground">
                {role.location[locale]}
              </p>
            </div>

            <p className="mt-3 max-w-[64ch] text-muted-foreground">
              {role.summary[locale]}
            </p>

            {!compact ? (
              <>
                <ul className="mt-4 space-y-2">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight.en}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-signal"
                      />
                      <span className="max-w-[60ch]">{highlight[locale]}</span>
                    </li>
                  ))}
                </ul>

                {linked.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {linked.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-block rounded-md border px-2.5 py-1 text-xs transition-colors hover:border-signal/40 hover:text-signal"
                        >
                          {project.title[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
