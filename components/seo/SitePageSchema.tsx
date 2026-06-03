import { headers } from "next/headers";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { buildPageJsonLdGraph } from "@/lib/seo-page-graph";
import { schemaToJsonLd } from "@/lib/schema";

/** Site-wide + per-route JSON-LD (@graph) for SEO, FAQ/AEO, and GEO entity clarity. */
export default async function SitePageSchema() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const config = await getPageDomainConfig();
  const graph = buildPageJsonLdGraph(config, pathname);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaToJsonLd(graph) }}
    />
  );
}
