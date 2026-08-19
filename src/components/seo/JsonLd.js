/**
 * Renders one structured-data block.
 *
 * `<` is escaped so a stray "</script>" inside any string field can't break out
 * of the tag. The site CSP allows inline scripts, so no nonce is needed here.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={entry["@id"] || `${entry["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
