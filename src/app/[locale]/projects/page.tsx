import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryFilter } from "@/components/projects/CategoryFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { GridGlow } from "@/components/background/GridGlow";
import { getProjectsByCategory } from "@/lib/content";

const CATEGORIES = new Set(["all", "professional", "freelance", "personal"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { category } = await searchParams;
  // An unknown category in the URL falls back to everything rather than to an
  // empty grid, which is what a hand-edited or stale link usually deserves.
  const active = category && CATEGORIES.has(category) ? category : "all";

  const t = await getTranslations("projects");
  const projects = getProjectsByCategory(active);

  return (
    <main className="relative">
      <GridGlow />
      <div className="mx-auto max-w-(--container-content) px-4 py-16">
        <SectionHeading as="h1" title={t("title")} lead={t("subtitle")} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <CategoryFilter active={active} />
          <p className="numeric text-sm text-muted-foreground">
            {t("count", { count: projects.length })}
          </p>
        </div>

        <div className="mt-10">
          {projects.length > 0 ? (
            <ProjectGrid
              projects={projects}
              leadCount={active === "all" ? 2 : 0}
            />
          ) : (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <p className="font-display text-lg">{t("empty")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("emptyHint")}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
