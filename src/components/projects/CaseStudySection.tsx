import Image from "next/image";
import type { ReactNode } from "react";

/**
 * One block of a case study: a heading, paragraphs, optional bullets and one
 * optional image.
 */
export function CaseStudySection({
  heading,
  marker,
  body,
  bullets,
  image,
}: {
  heading: string;
  /** Position in the problem → approach → results sequence, when it is one. */
  marker?: string;
  body: string[];
  bullets?: string[];
  image?: { src: string; alt: string; caption?: string };
  children?: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-4">
        {marker ? (
          <span
            aria-hidden="true"
            className="numeric tabular font-mono text-sm text-signal"
          >
            {marker}
          </span>
        ) : null}
        <h2 className="font-display text-2xl font-semibold text-balance">
          {heading}
        </h2>
      </div>

      <div className={marker ? "space-y-4 ps-0 sm:ps-10" : "space-y-4"}>
        {body.map((paragraph) => (
          <p key={paragraph} className="max-w-[66ch] text-muted-foreground">
            {paragraph}
          </p>
        ))}

        {bullets && bullets.length > 0 ? (
          <ul className="space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal"
                />
                <span className="max-w-[64ch] text-muted-foreground">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {image ? (
          <figure className="space-y-2 pt-2">
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="w-full rounded-lg border object-cover"
            />
            {image.caption ? (
              <figcaption className="text-sm text-muted-foreground">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
