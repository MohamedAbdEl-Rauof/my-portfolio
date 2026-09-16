"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/**
 * Swaps the locale while staying on the same page. `usePathname` from the i18n
 * navigation helpers returns the path without its locale prefix, so the switch
 * is a straight replace rather than string surgery on the URL.
 */
export function LocaleSwitcher() {
  const t = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const current = params.locale === "en" ? "en" : "ar";
  const next = current === "ar" ? "en" : "ar";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className="h-11 min-w-11 text-xs"
      onClick={() => {
        startTransition(() => {
          // `params` carries the dynamic segments of the current route, which a
          // catch-all or [slug] page needs for the replacement to resolve.
          router.replace(
            // @ts-expect-error -- pathname is a validated route at runtime
            { pathname, params },
            { locale: next },
          );
        });
      }}
    >
      {/* The label is the language being switched TO, written in that
          language. Arabic is never tracked or uppercased. */}
      <span
        lang={next}
        className={next === "ar" ? "font-arabic" : "eyebrow ltr"}
      >
        {next === "ar" ? "العربية" : "EN"}
      </span>
    </Button>
  );
}
