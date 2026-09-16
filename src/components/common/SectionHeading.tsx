import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  lead,
  action,
  className,
  as: Heading = "h2",
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-5", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="text-2xl font-bold text-balance">{title}</Heading>
        {action ? (
          <div className="shrink-0 text-sm font-semibold">{action}</div>
        ) : null}
      </div>
      {lead ? (
        <p className="mt-2 max-w-[62ch] text-base text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
