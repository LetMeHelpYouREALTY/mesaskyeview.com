import Link from "next/link";
import { Phone } from "lucide-react";
import type { DomainConfig } from "@/lib/domain-config";
import { agentInfo } from "@/lib/site-config";
import DrJanDuffyAvatar from "@/components/agent/DrJanDuffyAvatar";
import MesaskyeviewHeroBackground from "@/components/mesaskyeview/MesaskyeviewHeroBackground";
import MesaHeroSearch from "@/components/mesaskyeview/MesaHeroSearch";

type MesaLuxuryHeroProps = {
  config: DomainConfig;
};

/** Photography-forward homepage hero — portrait, serif headline, one primary search CTA. */
export default function MesaLuxuryHero({ config }: MesaLuxuryHeroProps) {
  return (
    <section className="relative min-h-[min(88vh,52rem)] text-white overflow-hidden">
      <MesaskyeviewHeroBackground overlayClassName="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/20" />
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 lg:py-24 pb-28 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <p className="text-[11px] tracking-[0.28em] uppercase text-amber-200/90 mb-5">
              {config.ctaBadge || "Berkshire Hathaway HomeServices"}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.12] mb-5">
              {config.heroHeadline}
            </h1>
            <div className="h-px w-16 bg-amber-400/90 mx-auto lg:mx-0 mb-6" aria-hidden />
            <p className="text-lg md:text-xl text-white/90 aeo-lead-answer mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {config.heroSubheadline}
            </p>
            <MesaHeroSearch agentEncodedId={config.realscoutAgentId} align="start" />
            <p className="mt-5 text-sm text-white/80">
              Or call{" "}
              <Link
                href={agentInfo.phoneTel}
                className="text-amber-200 no-underline hover:text-white hover:bg-transparent font-medium"
              >
                {agentInfo.phoneFormatted}
              </Link>
              {" · "}
              Dr. Jan Duffy, REALTOR®
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-sm text-white/75">
              <span>
                <span className="text-white font-medium">89166</span> Skye Canyon
              </span>
              <span>
                <span className="text-white font-medium">New + resale</span> Mesa at Skyeview
              </span>
              <span>
                <span className="text-white font-medium">BHHS</span> Nevada Properties
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <figure className="text-center">
              <DrJanDuffyAvatar
                size={220}
                className="mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-[3px] ring-amber-400/90"
                priority
              />
              <figcaption className="mt-4">
                <p className="font-display text-xl text-white">{agentInfo.name}</p>
                <p className="text-sm text-amber-100/90 mt-1">
                  {agentInfo.title} · License {agentInfo.license}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/85">
                  <Phone className="h-4 w-4 text-amber-300" aria-hidden />
                  {agentInfo.phoneFormatted}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
