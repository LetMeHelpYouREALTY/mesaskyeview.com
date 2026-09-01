import Image from "next/image";
import { headers } from "next/headers";
import { GLOBAL_HERO } from "@/lib/global-hero";
import { getPageBannerImage } from "@/lib/site-images";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { getMesaskyeviewPathLead } from "@/lib/mesaskyeview-path-lead";
import DrJanDuffyAvatar from "@/components/agent/DrJanDuffyAvatar";

/**
 * Single inner-page masthead (homepage uses MesaLuxuryHero instead).
 * Replaces the stacked GlobalHeroBanner + SitePageBanner bands.
 */
export default async function GlobalHeroBanner() {
  const pathname = (await headers()).get("x-pathname") || "/";
  if (pathname === "/") return null;

  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);
  const pageImage = getPageBannerImage(pathname);
  const { src, alt, tagline, phoneDisplay, phoneTel } = GLOBAL_HERO;
  const lead = isMesa ? getMesaskyeviewPathLead(pathname) : null;
  const imageSrc = pageImage?.src ?? src;
  const imageAlt = pageImage?.alt ?? alt;
  const headline = lead?.headline ?? tagline;
  const subhead = lead?.subhead ?? null;

  return (
    <aside className="relative w-full overflow-hidden bg-slate-950" aria-label={headline}>
      <div className="relative min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={72}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/55 to-slate-950/25"
          aria-hidden="true"
        />
        <div className="relative z-10 flex min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem] items-center">
          <div className="container mx-auto px-4 py-10 md:py-12 flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10">
            <DrJanDuffyAvatar
              size={96}
              className="shadow-xl ring-[3px] ring-amber-400/90"
              priority
            />
            <div className="max-w-3xl">
              {lead?.serviceFocus ? (
                <p className="text-[11px] tracking-[0.28em] uppercase text-amber-200/90 mb-3">
                  {lead.serviceFocus}
                </p>
              ) : null}
              <p className="font-display text-3xl sm:text-4xl md:text-[2.35rem] font-semibold text-white leading-tight text-balance">
                {headline}
              </p>
              <div className="h-px w-14 bg-amber-400/90 mt-4 mb-4" aria-hidden />
              {subhead ? (
                <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
                  {subhead}
                </p>
              ) : null}
              {phoneDisplay && phoneTel ? (
                <a
                  href={phoneTel}
                  className="mt-4 inline-block text-sm sm:text-base font-medium text-amber-100 no-underline hover:text-white hover:bg-transparent"
                  aria-label={`Call Dr. Jan Duffy at ${phoneDisplay}`}
                >
                  Call or text {phoneDisplay}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
