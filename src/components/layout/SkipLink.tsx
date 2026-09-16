import { useTranslations } from "next-intl";

/**
 * First thing in the tab order. Invisible until focused, then anchored to the
 * top of the viewport so a keyboard visitor can jump the header.
 */
export function SkipLink() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4"
    >
      {t("skipToContent")}
    </a>
  );
}
