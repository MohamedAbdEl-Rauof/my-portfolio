"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/**
 * The nav is a client component only because the active item depends on the
 * current path. The labels are resolved on the server and passed in.
 */
export function NavLinks({
  items,
  className,
  label,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  /** Distinguishes this navigation from others on the page. */
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative py-1 text-sm transition-colors hover:text-foreground",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-signal transition-transform duration-200",
                active && "scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
