import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getMetroHeroBadgeLabel } from "@/lib/mesaskyeview-display";

type MetroHeroBadgeProps = {
  className?: string;
};

const DEFAULT_CLASS =
  "inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6";

/** Domain-aware hero pill: MESA_HOME_BRAND on mesaskyeview, BHHS label elsewhere. */
export default async function MetroHeroBadge({
  className = DEFAULT_CLASS,
}: MetroHeroBadgeProps) {
  const config = await getPageDomainConfig();
  return <div className={className}>{getMetroHeroBadgeLabel(config)}</div>;
}
