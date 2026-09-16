import type { Locale } from "@/i18n/routing";

/**
 * The name, split into staggered spans. Latin splits by letter; Arabic by word,
 * because splitting inside a word breaks the joins between its letters.
 */
export function AnimatedName({
  text,
  locale,
  as: Tag = "h1",
}: {
  text: string;
  locale: Locale;
  as?: "h1" | "span";
}) {
  const parts = locale === "ar" ? text.split(" ") : [...text];

  return (
    <Tag className="name" aria-label={text}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="ch"
          style={{ "--i": i } as React.CSSProperties}
          aria-hidden="true"
        >
          {part === " " ? " " : part}
          {locale === "ar" && i < parts.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
