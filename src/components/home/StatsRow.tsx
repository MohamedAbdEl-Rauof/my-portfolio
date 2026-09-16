import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/content";

/** Three counters; the runtime animates them when the row scrolls into view. */
export async function StatsRow() {
  const t = await getTranslations("home");
  const projects = getProjects();

  const stats = [
    { value: projects.length, label: t("statProjects") },
    { value: 3, label: t("statYears") },
    {
      value: projects.filter((p) => p.status === "live").length,
      label: t("statLive"),
    },
  ];

  return (
    <section className="bento reveal" aria-label={t("statProjects")}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="tile span-stat flex flex-col gap-1 !p-4 sm:!p-5"
          style={{ "--n": i } as React.CSSProperties}
        >
          <span
            className="stat-num numeric text-3xl font-extrabold tracking-tight"
            data-count={stat.value}
          >
            {stat.value}
          </span>
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
