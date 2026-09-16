/**
 * Emits a JSON-LD block.
 *
 * `<` is escaped so a value containing "</script>" cannot close the tag early
 * and inject markup. The content here is all local and trusted, but the
 * escape costs nothing and the failure it prevents is script injection.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
