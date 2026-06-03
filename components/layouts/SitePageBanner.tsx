import Image from "next/image";
import { headers } from "next/headers";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { getPageBannerImage } from "@/lib/site-images";

/** Contextual Cloudflare image band on inner pages (every route except home). */
export default async function SitePageBanner() {
  const pathname = (await headers()).get("x-pathname") || "/";
  const image = getPageBannerImage(pathname);
  if (!image) return null;

  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);

  const heightClass = isMesa
    ? "h-48 sm:h-56 md:h-72 lg:h-80"
    : "h-40 sm:h-48 md:h-56";

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden bg-slate-900`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={pathname.split("/").filter(Boolean).length <= 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-slate-900/10" />
      {isMesa && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-white/90 text-sm px-4">
          Mesa at Skyeview · Skye Canyon · Dr. Jan Duffy, REALTOR®
        </p>
      )}
    </div>
  );
}
