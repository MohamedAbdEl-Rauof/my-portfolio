import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Category filter.
 *
 * Plain links carrying a query parameter, not client state. That keeps the
 * grid a server component, makes every filtered view a shareable URL, and
 * means the filter works before any JavaScript has run.
 */
export async function CategoryFilter({ active }: { active: string }) {
  const t = await getTranslations("projects");

  const categories = [
    { id: "all", label: t("all") },
    { id: "professional", label: t("professional") },
    { id: "freelance", label: t("freelance") },
    { id: "personal", label: t("personal") },
  ];

  return (
    <nav aria-label={t("filterLabel")}>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = category.id === active;
          return (
            <li key={category.id}>
              <Link
                href={
                  category.id === "all"
                    ? "/projects"
                    : {
                        pathname: "/projects",
                        query: { category: category.id },
                      }
                }
                scroll={false}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md border px-4 text-sm transition-colors",
                  selected
                    ? "border-signal/40 bg-signal-soft text-signal"
                    : "text-muted-foreground hover:border-signal/30 hover:text-foreground",
                )}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
