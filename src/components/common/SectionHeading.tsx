import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The heading pattern every section on the site shares: a short eyebrow, the
 * heading itself, and optionally one line explaining what follows.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? <p className="eyebrow text-signal">{eyebrow}</p> : null}
        <Heading className="font-display text-3xl font-semibold text-balance sm:text-4xl">
          {title}
        </Heading>
        {lead ? (
          <p className="max-w-[60ch] text-muted-foreground">{lead}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
