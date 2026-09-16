import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type Row = { label: string; value: string; note?: string; live?: boolean };

/**
 * The signature element: a strip modelled on the clinic queue-display boards
 * this portfolio's flagship project puts on the wall. Amber tabular figures on
 * ink, four true facts, no animation.
 *
 * It is a list, not a marquee. An earlier version ticked between rows, which
 * meant three of the four facts were hidden at any moment and the one thing a
 * visitor came to read depended on when they looked.
 */
export async function SignalBoard({ className }: { className?: string }) {
  const t = await getTranslations("home");

  const rows: Row[] = [
    { label: t("boardLive"), value: "nova-medicals.com", live: true },
    {
      label: t("boardLighthouse"),
      value: "98 / 100 / 100",
      note: t("boardLighthouseNote"),
    },
    {
      label: t("boardRedirects"),
      value: "74 / 74",
      note: t("boardRedirectsNote"),
    },
    { label: t("boardTests"), value: "198", note: t("boardTestsNote") },
  ];

  return (
    <section
      aria-label={t("signalBoard")}
      className={cn(
        "overflow-hidden rounded-xl border border-signal/20 bg-card/60 backdrop-blur",
        className,
      )}
    >
      <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {rows.map((row, index) => (
          <li
            key={row.label}
            className={cn(
              "flex flex-col gap-1.5 p-4",
              index > 0 && "sm:border-s sm:border-border",
            )}
          >
            <span className="eyebrow text-muted-foreground">{row.label}</span>
            <span className="flex items-center gap-2">
              {row.live ? (
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-live"
                />
              ) : null}
              <span
                dir="ltr"
                className="numeric tabular font-mono text-lg text-signal"
              >
                {row.value}
              </span>
            </span>
            {row.note ? (
              <span className="text-xs text-muted-foreground">{row.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
