import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { mesaGeneratedHeroes } from "@/lib/mesa-hero-images";

/** LCP preload for mesaskyeview homepage hero (local WebP). */
export default async function MesaHeroPreload() {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) return null;

  const { flagship } = mesaGeneratedHeroes;

  return (
    <>
      {flagship.mobileSrc ? (
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={flagship.mobileSrc}
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      ) : null}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={flagship.src}
        media={flagship.mobileSrc ? "(min-width: 768px)" : undefined}
        fetchPriority="high"
      />
    </>
  );
}
