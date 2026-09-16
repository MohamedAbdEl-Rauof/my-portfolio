import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProfile } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

/** The name as text, linking home. The mark itself lives only in the favicon. */
export async function BrandMark() {
  const t = await getTranslations("a11y");
  const locale = (await getLocale()) as Locale;
  const profile = getProfile();

  return (
    <Link
      href="/"
      aria-label={t("homeLink")}
      className="flex min-h-11 items-center text-base font-semibold"
    >
      {profile.shortName[locale]}
    </Link>
  );
}
