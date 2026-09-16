"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const current = params.locale === "en" ? "en" : "ar";
  const next = current === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className="ctrl text-sm font-semibold"
      onClick={() =>
        startTransition(() => {
          router.replace(
            // @ts-expect-error -- pathname is a validated route at runtime
            { pathname, params },
            { locale: next },
          );
        })
      }
    >
      <span lang={next}>{next === "ar" ? "ع" : "EN"}</span>
    </button>
  );
}
