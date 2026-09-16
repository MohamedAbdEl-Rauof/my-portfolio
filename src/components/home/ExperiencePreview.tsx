import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";

export async function ExperiencePreview() {
  const t = await getTranslations("home");

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-(--container-content) px-4 py-20">
        <SectionHeading
          eyebrow={t("experience")}
          title={t("experienceLead")}
          action={
            <Button asChild variant="outline" className="h-11">
              <Link href="/about">
                {t("readMore")}
                <ArrowRight
                  className="size-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          }
        />
        <div className="mt-10">
          <ExperienceTimeline compact />
        </div>
      </div>
    </section>
  );
}
