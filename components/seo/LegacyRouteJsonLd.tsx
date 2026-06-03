import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";

type LegacyRouteJsonLdProps = {
  schema?: Record<string, unknown>;
  schemas?: Record<string, unknown>[];
};

/**
 * Page-level JSON-LD for heyberkshire / metro routes.
 * Skipped on mesaskyeview.com — layout injects the canonical @graph once.
 */
export default async function LegacyRouteJsonLd({
  schema,
  schemas,
}: LegacyRouteJsonLdProps) {
  const config = await getPageDomainConfig();
  if (isMesaskyeviewDomain(config)) return null;

  const items = schemas ?? (schema ? [schema] : []);
  if (items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
