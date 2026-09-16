import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center gap-3 py-16">
      <p className="numeric text-sm text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-[60ch] text-base text-muted-foreground">
        {t("subtitle")}
      </p>
      <div className="mt-2 flex flex-wrap gap-4 text-sm">
        <Link className="underline underline-offset-4" href="/">
          {t("backHome")}
        </Link>
        <Link className="underline underline-offset-4" href="/projects">
          {t("seeWork")}
        </Link>
      </div>
    </div>
  );
}
