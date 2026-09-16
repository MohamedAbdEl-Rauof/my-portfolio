import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getFeaturedProjects } from "@/lib/content";

export async function SelectedWork() {
  const t = await getTranslations("home");
  return (
    <section className="reveal">
      <SectionHeading
        title={t("selectedWork")}
        action={
          <Link
            href="/projects"
            className="more inline-flex min-h-11 items-center underline-offset-4 hover:underline sm:min-h-0"
          >
            {t("viewAllWork")}
          </Link>
        }
      />
      <ProjectGrid projects={getFeaturedProjects()} />
    </section>
  );
}
