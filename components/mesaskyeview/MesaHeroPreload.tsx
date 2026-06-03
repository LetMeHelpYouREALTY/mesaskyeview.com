import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { mesaGeneratedHeroes } from "@/lib/mesa-hero-images";

/** LCP preload for mesaskyeview homepage hero (local WebP). */
export default async function MesaHeroPreload() {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) return null;

  return (
    <link
      rel="preload"
      as="image"
      href={mesaGeneratedHeroes.flagship.src}
      fetchPriority="high"
    />
  );
}
