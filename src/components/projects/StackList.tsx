import { resolveTech } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Technology names as a comma-separated run. Always left-to-right, including
 * on Arabic pages: these are product names, and "Next.js" reversed by the
 * bidirectional algorithm is not a name anyone recognises.
 */
export function StackList({
  ids,
  className,
}: {
  ids: readonly string[];
  className?: string;
}) {
  const names = resolveTech(ids).map((item) => item.name);
  return (
    <span dir="ltr" className={cn("text-sm", className)}>
      {names.join(", ")}
    </span>
  );
}
