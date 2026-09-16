"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/**
 * Floating WhatsApp shortcut.
 *
 * Hidden on /contact, where the page is already one large WhatsApp call to
 * action and the button would only cover it. Wrapped in a landmark so someone
 * navigating by region reaches it instead of skipping straight past.
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
        className="fixed end-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-signal text-signal-foreground shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
    </aside>
  );
}
