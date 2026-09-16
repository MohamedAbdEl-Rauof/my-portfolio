import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryFilter } from "@/components/projects/CategoryFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProjectsByCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

const CATEGORIES = new Set(["all", "professional", "freelance", "personal"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/projects",
    title: t("title"),
    description: t("subtitle"),
    image: { url: `/og/projects-${locale}.jpg`, alt: t("title") },
  });
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
  // empty list, which is what a hand-edited or stale link usually deserves.
  const active = category && CATEGORIES.has(category) ? category : "all";

  const t = await getTranslations("projects");
  const projects = getProjectsByCategory(active);

  return (
    <div className="wrap py-10 sm:py-16">
      <SectionHeading as="h1" title={t("title")} lead={t("subtitle")} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryFilter active={active} />
        <p className="numeric text-sm text-muted-foreground">
          {t("count", { count: projects.length })}
        </p>
      </div>

      <div className="reveal mt-6">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} headingLevel="h2" />
        ) : (
          <div className="border-t pt-6">
            <p className="text-base">{t("empty")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("emptyHint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
