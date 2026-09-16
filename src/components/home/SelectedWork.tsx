import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getFeaturedProjects } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

export async function SelectedWork() {
  const t = await getTranslations("home");
  const projects = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-(--container-content) px-4 py-20">
      <SectionHeading
        eyebrow={t("selectedWork")}
        title={t("selectedWorkLead")}
        action={
          <Button asChild variant="outline" className="h-11">
            <Link href="/projects">
              {t("viewAllWork")}
              <ArrowRight
                className="size-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
          </Button>
        }
      />
      <Reveal className="mt-10">
        <ProjectGrid projects={projects} />
      </Reveal>
    </section>
  );
}
