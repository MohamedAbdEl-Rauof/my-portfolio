import { getTranslations } from "next-intl/server";
import type { Project } from "@/lib/schemas";
import type { Locale } from "@/i18n/routing";
import { CaseStudySection } from "./CaseStudySection";

/**
 * The long-form body. Problem, approach and results are numbered because they
 * genuinely are a sequence. The sections after them are not, so they carry
 * no numbers.
 */
export async function CaseStudy({
  caseStudy,
  locale,
}: {
  caseStudy: NonNullable<Project["caseStudy"]>;
  locale: Locale;
}) {
  const t = await getTranslations("project");

  const sequence = [
    { heading: t("problem"), body: caseStudy.problem },
    { heading: t("approach"), body: caseStudy.approach },
    { heading: t("results"), body: caseStudy.results },
  ];

  return (
    <div className="space-y-10">
      {sequence.map((step, index) => (
        <CaseStudySection
          key={step.heading}
          marker={String(index + 1).padStart(2, "0")}
          heading={step.heading}
          body={step.body.map((item) => item[locale])}
        />
      ))}

      {caseStudy.sections.map((section) => (
        <CaseStudySection
          key={section.heading.en}
          heading={section.heading[locale]}
          body={section.body.map((item) => item[locale])}
          bullets={section.bullets?.map((item) => item[locale])}
          image={
            section.image
              ? {
                  src: section.image.src,
                  alt: section.image.alt[locale],
                  caption: section.image.caption?.[locale],
                }
              : undefined
          }
        />
      ))}

      {caseStudy.lessons.length > 0 ? (
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold">{t("lessons")}</h2>
          <ul className="mt-3 list-disc space-y-1.5 ps-5 text-base">
            {caseStudy.lessons.map((lesson) => (
              <li key={lesson.en} className="max-w-[64ch]">
                {lesson[locale]}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
