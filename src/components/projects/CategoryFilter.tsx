import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Pills carrying a query parameter: shareable, server-rendered, no JS needed. */
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
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-[transform,background,color] duration-200 hover:-translate-y-0.5",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:text-foreground",
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
