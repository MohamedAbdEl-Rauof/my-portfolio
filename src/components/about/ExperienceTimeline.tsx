import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getExperience, getProjects } from "@/lib/content";
import { formatRange } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

/**
 * Roles as a divided list. `compact` drops the highlight bullets and the
 * linked projects, which is what the home page shows; `limit` caps the count.
 */
export async function ExperienceTimeline({
  compact = false,
  limit,
}: {
  compact?: boolean;
  limit?: number;
}) {
  const t = await getTranslations("project");
  const locale = (await getLocale()) as Locale;
  const roles = getExperience().roles.slice(0, limit);
  const projects = getProjects();

  return (
    <ol className="divide-y">
      {roles.map((role) => {
        const linked = role.projectSlugs
          .map((slug) => projects.find((project) => project.slug === slug))
          .filter((project) => project !== undefined);

        return (
          <li key={`${role.company.en}-${role.start}`} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-medium">{role.role[locale]}</h3>
              <span className="numeric text-xs text-muted-foreground">
                {formatRange(role.start, role.end, locale, t("present"))}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {role.company[locale]} · {role.location[locale]}
            </p>
            <p className="mt-2 max-w-[64ch] text-sm">{role.summary[locale]}</p>

            {!compact ? (
              <>
                <ul className="mt-3 list-disc space-y-1 ps-5 text-sm">
                  {role.highlights.map((highlight) => (
                    <li key={highlight.en} className="max-w-[62ch]">
                      {highlight[locale]}
                    </li>
                  ))}
                </ul>
                {linked.length > 0 ? (
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {linked.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        prefetch={false}
                        className="underline underline-offset-4 hover:text-muted-foreground"
                      >
                        {project.title[locale]}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
