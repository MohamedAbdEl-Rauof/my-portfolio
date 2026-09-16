import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { getProfile, whatsappUrl } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { NavLinks, type NavItem } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const t = await getTranslations("nav");
  const home = await getTranslations("home");
  const profile = getProfile();

  const items: NavItem[] = [
    { href: "/projects", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="glass sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-16 max-w-(--container-content) items-center gap-4 px-4">
        <BrandMark />

        <NavLinks
          items={items}
          label={t("menu")}
          className="ms-6 hidden items-center gap-6 md:flex"
        />

        <div className="ms-auto flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="signal"
            className="hidden h-11 sm:inline-flex"
          >
            <a
              href={whatsappUrl(profile.whatsapp, home("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {home("primaryCta")}
            </a>
          </Button>
          <MobileNav
            items={items}
            title={t("menu")}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
          />
        </div>
      </div>
    </header>
  );
}
