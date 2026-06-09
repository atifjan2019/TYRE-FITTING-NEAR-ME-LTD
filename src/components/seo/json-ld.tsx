/**
 * Renders a JSON-LD <script> tag. Pass any schema.org object (or array).
 * Arrays are filtered so a missing/undefined entry never serialises to `null`
 * (which would make the structured data invalid).
 *
 * Pass an optional `id` to render one discrete, named script tag per schema
 * type (so each block is individually identifiable in the Rich Results Test).
 * The tag is server-rendered into the initial HTML, which crawlers read more
 * reliably than a client-injected next/script.
 */
export function JsonLd({
  data,
  id,
}: {
  data: object | (object | null | undefined)[];
  id?: string;
}) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
