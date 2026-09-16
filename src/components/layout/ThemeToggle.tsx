"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The server cannot know the stored theme, so nothing here reads it during
 * render. Both icons and both labels are in the markup and CSS shows the pair
 * that matches the active theme, which removes the usual mount flash without
 * any client state. `display: none` keeps the inactive label out of the
 * button's accessible name.
 */
export function ThemeToggle() {
  const t = useTranslations("a11y");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <span className="sr-only dark:hidden">
        {t("toggleTheme", { mode: t("themeDark") })}
      </span>
      <span className="sr-only hidden dark:block">
        {t("toggleTheme", { mode: t("themeLight") })}
      </span>
    </Button>
  );
}
