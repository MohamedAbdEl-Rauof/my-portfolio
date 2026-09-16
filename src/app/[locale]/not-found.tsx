import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-dvh max-w-(--container-content) flex-col justify-center gap-6 px-4 py-24">
      <p className="tabular font-mono text-6xl font-medium text-signal">404</p>
      <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-[60ch] text-muted-foreground">{t("subtitle")}</p>
      <div className="flex flex-wrap gap-4">
        <Link className="text-signal underline underline-offset-4" href="/">
          {t("backHome")}
        </Link>
        <Link
          className="text-signal underline underline-offset-4"
          href="/projects"
        >
          {t("seeWork")}
        </Link>
      </div>
    </div>
  );
}
