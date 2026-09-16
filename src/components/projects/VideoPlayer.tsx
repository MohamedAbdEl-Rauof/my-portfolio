"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

/**
 * A walkthrough recording behind its poster.
 *
 * The `<video>` element has no `src` until the visitor presses play, so the
 * file is never fetched for someone who only scrolls past. It also never
 * autoplays: these are silent screen recordings that explain something, and
 * starting one unasked is noise, not information.
 */
export function VideoPlayer({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const t = useTranslations("project");
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group relative block w-full overflow-hidden rounded-xl border"
      >
        <Image
          src={poster}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="aspect-16/10 w-full object-cover object-top"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-background/45 transition-colors group-hover:bg-background/30">
          <span className="flex items-center gap-3 rounded-full bg-signal px-5 py-3 text-signal-foreground">
            <Play className="size-5 rtl:-scale-x-100" aria-hidden="true" />
            <span className="text-sm font-medium">{t("watchDemo")}</span>
          </span>
        </span>
      </button>
    );
  }

  return (
    /* A silent screen recording: there is no speech to caption, and the
       surrounding text carries what it shows. */
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls
      autoPlay
      playsInline
      muted
      loop
      preload="none"
      className="aspect-16/10 w-full rounded-xl border object-cover"
    />
  );
}
