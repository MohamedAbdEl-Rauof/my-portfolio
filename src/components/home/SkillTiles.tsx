import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getSkills, resolveTech } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function SkillTiles() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const { groups } = getSkills();

  return (
    <section className="reveal">
      <SectionHeading title={t("stack")} />
      <div className="bento">
        {groups.map((group, i) => (
          <div
            key={group.id}
            className="tile span-4"
            style={{ "--n": i } as React.CSSProperties}
          >
            <h3 className="mb-2.5 text-sm font-semibold">
              {group.label[locale]}
            </h3>
            <div className="flex flex-wrap gap-1.5" dir="ltr">
              {resolveTech(group.items).map((item) => (
                <span key={item.id} className="chip">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
