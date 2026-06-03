import Image from "next/image";
import { headers } from "next/headers";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { getPageBannerImage } from "@/lib/site-images";

/** Contextual Cloudflare image band on inner pages (every route except home). */
export default async function SitePageBanner() {
  const pathname = headers().get("x-pathname") || "/";
  const image = getPageBannerImage(pathname);
  if (!image) return null;

  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden bg-slate-900">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover opacity-90"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
      {isMesa && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-white/90 text-sm px-4">
          Mesa at Skyeview · Skye Canyon · Dr. Jan Duffy, REALTOR®
        </p>
      )}
    </div>
  );
}
