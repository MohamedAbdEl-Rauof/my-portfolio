"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

/**
 * A walkthrough recording behind its poster. The <video> has no src until
 * the visitor presses play, so the file is never fetched by someone who only
 * scrolls past. It never autoplays.
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

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group relative block w-full overflow-hidden rounded-md border"
      >
        <Image
          src={poster}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 768px) 720px, 100vw"
          className="aspect-16/10 w-full object-cover object-top"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/30">
          <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            <Play className="size-4" aria-hidden="true" />
            {t("watchDemo")}
          </span>
        </span>
      </button>
    );
  }

  return (
    /* A silent screen recording: nothing to caption. */
    <video
      src={src}
      poster={poster}
      controls
      autoPlay
      playsInline
      muted
      loop
      preload="none"
      className="aspect-16/10 w-full rounded-md border object-cover"
    />
  );
}
