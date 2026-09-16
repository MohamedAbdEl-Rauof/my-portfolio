import { getTranslations, getLocale } from "next-intl/server";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "@/i18n/navigation";
import { getProfile } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const profile = getProfile();
  const year = new Date().getFullYear();

  const items = [
    { href: "/projects", label: nav("work") },
    { href: "/about", label: nav("about") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-(--container-content) gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <p className="font-display text-lg font-semibold">
            {profile.name[locale]}
          </p>
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div className="space-y-3">
          <h2 className="eyebrow text-muted-foreground">{t("sections")}</h2>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="eyebrow text-muted-foreground">{t("elsewhere")}</h2>
          <ul className="flex gap-2">
            {profile.socials.map((social) => {
              const Icon = ICONS[social.id] ?? Mail;
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-signal"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-(--container-content) flex-col gap-2 border-t px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="numeric tabular">{year}</span> {profile.name[locale]}
          . {t("rights")}
        </p>
        <p className="ltr">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
