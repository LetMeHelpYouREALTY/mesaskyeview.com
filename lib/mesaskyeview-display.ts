import type { DomainConfig } from "@/lib/domain-config";
import { isMesaskyeviewDomain, MESA_HOME_BRAND } from "@/lib/mesaskyeview-brand";

/** Visible label on legacy metro hero badges (non-mesa domains). */
export const BHHS_NEVADA_PROPERTIES_LABEL =
  "Berkshire Hathaway HomeServices Nevada Properties";

/** Hero pill / badge above H1 on shared metro landing pages. */
export function getMetroHeroBadgeLabel(config: DomainConfig): string {
  return isMesaskyeviewDomain(config) ? MESA_HOME_BRAND : BHHS_NEVADA_PROPERTIES_LABEL;
}
