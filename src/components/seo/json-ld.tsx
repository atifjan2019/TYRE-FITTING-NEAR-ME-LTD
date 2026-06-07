/**
 * Renders a JSON-LD <script> tag. Pass any schema.org object (or array).
 * Arrays are filtered so a missing/undefined entry never serialises to `null`
 * (which would make the structured data invalid).
 */
export function JsonLd({ data }: { data: object | (object | null | undefined)[] }) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
