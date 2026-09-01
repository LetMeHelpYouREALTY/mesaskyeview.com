import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { mesaHomeHeroRotation } from "@/lib/mesa-hero-images";
import { headers } from "next/headers";

/** LCP preload for mesaskyeview homepage hero (local WebP). */
export default async function MesaHeroPreload() {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) return null;

  const pathname = (await headers()).get("x-pathname") || "/";
  if (pathname !== "/") return null;

  const primary = mesaHomeHeroRotation[0];

  return (
    <>
      {primary.mobileSrc ? (
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={primary.mobileSrc}
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      ) : null}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={primary.src}
        media={primary.mobileSrc ? "(min-width: 768px)" : undefined}
        fetchPriority="high"
      />
    </>
  );
}
