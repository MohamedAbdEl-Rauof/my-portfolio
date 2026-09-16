import Image from "next/image";

/**
 * One block of a case study. The sequence marker sits inside the heading at
 * every width, so it always relates to the text beside it; the old version
 * indented the body on desktop only, leaving the numeral floating on phones.
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
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-balance">
        {marker ? (
          <span
            aria-hidden="true"
            className="numeric me-3 text-sm text-muted-foreground"
          >
            {marker}
          </span>
        ) : null}
        {heading}
      </h2>

      <div className="mt-3 space-y-3">
        {body.map((paragraph) => (
          <p key={paragraph} className="max-w-[66ch] text-base">
            {paragraph}
          </p>
        ))}

        {bullets && bullets.length > 0 ? (
          <ul className="list-disc space-y-1.5 ps-5 text-base">
            {bullets.map((bullet) => (
              <li key={bullet} className="max-w-[64ch]">
                {bullet}
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
              sizes="(min-width: 768px) 720px, 100vw"
              className="w-full rounded-md border object-cover"
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
