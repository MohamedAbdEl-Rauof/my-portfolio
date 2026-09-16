"use client";

import type { CSSProperties } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

export function NavLinks({
  items,
  label,
  className,
  style,
}: {
  items: NavItem[];
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className} style={style}>
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "nav-link inline-flex min-h-11 items-center text-sm transition-colors hover:text-foreground",
              active
                ? "font-semibold text-foreground"
                : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
