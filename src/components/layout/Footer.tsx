import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProfile } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
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
    <footer className="mt-12 border-t sm:mt-16">
      <div className="wrap flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <span className="numeric">{year}</span> {profile.name[locale]}
        </p>
        <nav aria-label={nav("footer")} className="flex flex-wrap gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ul className="flex flex-wrap gap-4">
          {profile.socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
