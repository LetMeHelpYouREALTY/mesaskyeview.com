import { headers } from "next/headers";
import MesaDeferredListingsBlock from "@/components/performance/MesaDeferredListingsBlock";
import RealScoutListingsSection from "@/components/realscout/RealScoutListingsSection";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";

/**
 * Primary lead-gen MLS block — placed below the hero on every page.
 * Homepage renders its own instance after the full hero (pathname "/").
 */
export default async function RealScoutBelowHero() {
  const pathname = (await headers()).get("x-pathname") || "/";
  if (pathname === "/") return null;

  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);

  if (isMesa) {
    return (
      <MesaDeferredListingsBlock>
        <RealScoutListingsSection />
      </MesaDeferredListingsBlock>
    );
  }

  return <RealScoutListingsSection />;
}
