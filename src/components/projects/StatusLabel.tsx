import { getTranslations } from "next-intl/server";
import type { Project } from "@/lib/schemas";

/** The project's status as a word. No dot, no colour. */
export async function StatusLabel({ status }: { status: Project["status"] }) {
  const t = await getTranslations("project");
  const labels: Record<Project["status"], string> = {
    live: t("statusLive"),
    internal: t("statusInternal"),
    archived: t("statusArchived"),
    "in-progress": t("statusInProgress"),
  };
  return <span>{labels[status]}</span>;
}
