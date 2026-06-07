/**
 * Renders a JSON-LD <script> tag. Pass any schema.org object (or array).
 * Server component — the structured data is in the static HTML for crawlers.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe inside a JSON-LD script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
