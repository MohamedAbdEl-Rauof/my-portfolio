import { cn } from "@/lib/utils";

/**
 * Ambient background: a faint measuring grid with a warm glow behind it.
 * Purely decorative, so it is hidden from assistive technology and never
 * intercepts a click.
 */
export function GridGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute start-1/2 -top-40 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--signal-rgb) / 0.13), transparent 70%)",
        }}
      />
    </div>
  );
}
