import { setRequestLocale, getTranslations } from "next-intl/server";

/** Placeholder home. Phase 1 replaces this with the real shell and sections. */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex min-h-dvh max-w-(--container-content) flex-col justify-center gap-6 px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        {t("badge")}
      </p>
      <h1 className="font-display text-5xl font-semibold text-balance">
        {t("name")}
      </h1>
      <p className="max-w-[60ch] text-lg text-muted-foreground">
        {t("headline")}
      </p>
    </main>
  );
}
