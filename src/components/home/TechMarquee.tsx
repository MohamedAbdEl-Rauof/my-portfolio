"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Item = { id: string; name: string; logo?: string };

/**
 * The scrolling logo row.
 *
 * It carries a real pause button. WCAG 2.2.2 requires a way to stop any motion
 * that starts on its own and runs longer than five seconds, and this is the
 * exact control whose absence I had to write up as a failure on the Nova audit.
 * The animation is also disabled outright under a reduced-motion preference,
 * via the global rule in globals.css, so the button is the second line of
 * defence rather than the only one.
 */
export function TechMarquee({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const t = useTranslations("a11y");
  const [paused, setPaused] = useState(false);

  // The track is rendered twice so the loop has no visible seam.
  const track = [...items, ...items];

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul
          dir="ltr"
          className="animate-marquee flex w-max items-center gap-12"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              // The second copy is decoration; announcing every logo twice
              // would just make the list confusing to listen to.
              aria-hidden={index >= items.length ? "true" : undefined}
              className="shrink-0"
            >
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="size-10 object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="font-mono text-sm text-muted-foreground">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-11 gap-2 text-xs text-muted-foreground"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? (
          <Play className="size-4" aria-hidden="true" />
        ) : (
          <Pause className="size-4" aria-hidden="true" />
        )}
        {paused ? t("playMarquee") : t("pauseMarquee")}
      </Button>
    </div>
  );
}
