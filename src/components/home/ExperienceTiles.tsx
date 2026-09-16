import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getExperience } from "@/lib/content";
import { formatRange } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export async function ExperienceTiles() {
  const t = await getTranslations("home");
  const p = await getTranslations("project");
  const locale = (await getLocale()) as Locale;
  const roles = getExperience().roles.slice(0, 2);

  return (
    <section className="reveal">
      <SectionHeading
        title={t("experience")}
        action={
          <Link
            href="/about"
            className="more inline-flex min-h-11 items-center underline-offset-4 hover:underline sm:min-h-0"
          >
            {t("readMore")}
          </Link>
        }
      />
      <div className="bento">
        {roles.map((role, i) => (
          <div
            key={role.start}
            className="tile span-6 flex flex-col gap-1.5"
            style={{ "--n": i } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-bold">{role.role[locale]}</h3>
              <span className="numeric text-sm text-muted-foreground">
                {formatRange(role.start, role.end, locale, p("present"))}
              </span>
            </div>
            <p className="text-sm font-semibold">{role.company[locale]}</p>
            <p className="text-sm text-muted-foreground">
              {role.summary[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
