import { getTranslations } from "next-intl/server";
import { BrandMark } from "./BrandMark";
import { NavLinks, type NavItem } from "./NavLinks";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const t = await getTranslations("nav");
  const items: NavItem[] = [
    { href: "/projects", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/92">
      <div className="wrap flex h-15 items-center gap-4">
        {/* On phones the three links and two controls take the whole bar; the
            name is the first thing in the hero anyway. */}
        <div
          className="rise hidden sm:block"
          style={{ "--d": "0ms" } as React.CSSProperties}
        >
          <BrandMark />
        </div>
        <NavLinks
          items={items}
          label={t("menu")}
          className="rise flex items-center gap-4 sm:gap-5"
          style={{ "--d": "60ms" } as React.CSSProperties}
        />
        <div
          className="rise ms-auto flex items-center gap-1"
          style={{ "--d": "120ms" } as React.CSSProperties}
        >
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
