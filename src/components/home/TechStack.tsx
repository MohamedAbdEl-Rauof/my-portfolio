import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StackList } from "@/components/projects/StackList";
import { getSkills, resolveTech } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { TechMarquee } from "./TechMarquee";

export async function TechStack() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const { groups, marquee } = getSkills();

  return (
    <section className="mx-auto max-w-(--container-content) px-4 py-20">
      <SectionHeading eyebrow={t("stack")} title={t("stackLead")} />

      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id} className="space-y-3">
            <dt className="eyebrow text-muted-foreground">
              {group.label[locale]}
            </dt>
            <dd>
              <StackList ids={group.items} />
            </dd>
          </div>
        ))}
      </dl>

      {/* Resolved on the server so the client component ships names and
          logo paths, not the whole registry. */}
      <TechMarquee items={resolveTech(marquee)} className="mt-14" />
    </section>
  );
}
