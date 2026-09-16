import { getLocale, getTranslations } from "next-intl/server";
import { Code2, Languages, Shield, Workflow } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getServices } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: Code2,
  workflow: Workflow,
  languages: Languages,
  shield: Shield,
};

export async function ServiceTiles() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const { items } = getServices();

  return (
    <section className="reveal">
      <SectionHeading title={t("services")} />
      <div className="bento">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Code2;
          return (
            <div
              key={item.id}
              className="tile span-3 flex flex-col gap-2.5"
              style={{ "--n": i } as React.CSSProperties}
            >
              <span className="ico">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold">{item.title[locale]}</h3>
              <p className="text-sm text-muted-foreground">
                {item.body[locale]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
