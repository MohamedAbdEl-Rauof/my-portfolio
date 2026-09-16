import { getTranslations } from "next-intl/server";
import type { Project } from "@/lib/schemas";
import type { Locale } from "@/i18n/routing";
import { CaseStudySection } from "./CaseStudySection";

/**
 * The long-form body, for projects that carry one.
 *
 * Problem, approach and results are numbered because they genuinely are a
 * sequence: the approach only makes sense after the problem, and the results
 * only mean anything after both. The sections that follow are not a sequence,
 * so they carry no numbers.
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
    <div className="space-y-14">
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
        <section className="space-y-4 rounded-xl border border-signal/20 bg-signal-soft p-6">
          <h2 className="font-display text-xl font-semibold">{t("lessons")}</h2>
          <ul className="space-y-3">
            {caseStudy.lessons.map((lesson) => (
              <li key={lesson.en} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal"
                />
                <span className="max-w-[64ch] text-muted-foreground">
                  {lesson[locale]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
