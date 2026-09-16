import { resolveTech } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Technology chips.
 *
 * Always rendered left to right, including on Arabic pages: these are product
 * names, and "Next.js" reversed by the bidirectional algorithm is not a name
 * anyone recognises.
 */
export function StackList({
  ids,
  limit,
  className,
}: {
  ids: readonly string[];
  limit?: number;
  className?: string;
}) {
  const items = resolveTech(ids);
  const shown = limit ? items.slice(0, limit) : items;
  const remaining = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {shown.map((item) => (
        <li
          key={item.id}
          dir="ltr"
          className="rounded-md border border-signal/25 bg-signal-soft px-2.5 py-1 font-mono text-xs text-signal"
        >
          {item.name}
        </li>
      ))}
      {remaining > 0 ? (
        <li
          dir="ltr"
          className="rounded-md border px-2.5 py-1 font-mono text-xs text-muted-foreground"
        >
          +{remaining}
        </li>
      ) : null}
    </ul>
  );
}
