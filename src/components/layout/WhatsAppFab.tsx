"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/**
 * Floating WhatsApp shortcut, kept quiet.
 *
 * The header no longer carries a call to action, and a project page can run
 * to several thousand pixels, so this is the one always-present path to the
 * single contact channel. Hidden on /contact, which is already that path.
 */
export function WhatsAppFab({ href }: { href: string }) {
  const t = useTranslations("home");
  const pathname = usePathname();

  if (pathname.startsWith("/contact")) return null;

  return (
    <aside aria-label={t("primaryCta")}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("primaryCta")}
        className="fixed end-4 bottom-4 z-30 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
      </a>
    </aside>
  );
}
