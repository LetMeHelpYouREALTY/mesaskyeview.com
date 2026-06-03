import { getPageDomainConfig } from "@/lib/get-domain-config";
import RealScoutListings from "@/components/realscout/RealScoutListings";

export default async function RealScoutListingsSection() {
  const config = await getPageDomainConfig();
  return (
    <RealScoutListings
      agentEncodedId={config.realscoutAgentId}
      neighborhood={config.neighborhood}
    />
  );
}
