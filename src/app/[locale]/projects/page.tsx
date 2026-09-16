import { setRequestLocale, getTranslations } from "next-intl/server";

/** Placeholder. Phase 3 replaces this with the filterable project grid. */
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <main className="mx-auto max-w-(--container-content) px-4 py-16">
      <h1 className="font-display text-4xl font-semibold">{t("title")}</h1>
      <p className="mt-4 max-w-[60ch] text-muted-foreground">{t("subtitle")}</p>
    </main>
  );
}
