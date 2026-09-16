import { getTranslations } from "next-intl/server";
import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const STYLES: Record<Project["status"], string> = {
  live: "bg-live",
  internal: "bg-signal",
  "in-progress": "bg-signal",
  archived: "bg-muted-foreground",
};

/**
 * The project's status, as a dot and a word.
 *
 * The dot alone would carry the meaning in colour only, which fails for anyone
 * who cannot separate the two hues, so the label is always present.
 */
export async function StatusDot({
  status,
  className,
}: {
  status: Project["status"];
  className?: string;
}) {
  const t = await getTranslations("project");
  const labels: Record<Project["status"], string> = {
    live: t("statusLive"),
    internal: t("statusInternal"),
    archived: t("statusArchived"),
    "in-progress": t("statusInProgress"),
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", STYLES[status])}
      />
      {labels[status]}
    </span>
  );
}
