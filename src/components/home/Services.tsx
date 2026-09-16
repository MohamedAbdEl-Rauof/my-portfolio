import { getLocale, getTranslations } from "next-intl/server";
import { Code2, Languages, Shield, Workflow } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getServices } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: Code2,
  workflow: Workflow,
  languages: Languages,
  shield: Shield,
};

export async function Services() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const { items } = getServices();

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-(--container-content) px-4 py-20">
        <SectionHeading eyebrow={t("services")} title={t("servicesLead")} />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = ICONS[item.icon] ?? Code2;
            return (
              <StaggerItem key={item.id}>
                <div className="h-full space-y-3 rounded-xl border bg-card p-5">
                  <Icon className="size-6 text-signal" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold">
                    {item.title[locale]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.body[locale]}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
