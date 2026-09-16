"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

/** Both icons are in the markup; CSS shows the one for the active theme. */
export function ThemeToggle() {
  const t = useTranslations("a11y");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="ctrl"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Moon className="size-4.5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-4.5 dark:block" aria-hidden="true" />
      <span className="sr-only dark:hidden">
        {t("toggleTheme", { mode: t("themeDark") })}
      </span>
      <span className="sr-only hidden dark:block">
        {t("toggleTheme", { mode: t("themeLight") })}
      </span>
    </button>
  );
}
