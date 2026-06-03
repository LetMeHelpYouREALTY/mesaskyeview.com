import Link from "next/link";
import { headers } from "next/headers";
import { Phone, MapPin } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import {
  isMesaskyeviewDomain,
  MESA_SITE_BRAND,
  mesaAtSkyeviewCommunity,
  mesaRealtorServices,
} from "@/lib/mesaskyeview-brand";
import { getMesaskyeviewPathLead } from "@/lib/mesaskyeview-path-lead";
import { getMesaCommunityDirectionsUrl } from "@/lib/mesa-at-skyeview-schema";
import { agentInfo } from "@/lib/site-config";

type MesaskyeviewContextBarProps = {
  /** compact = single row inside sticky header; full = legacy block (deprecated) */
  variant?: "compact" | "full";
};

export default async function MesaskyeviewContextBar({
  variant = "full",
}: MesaskyeviewContextBarProps) {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) return null;

  const pathname = headers().get("x-pathname") || "/";
  const lead = getMesaskyeviewPathLead(pathname);

  if (variant === "compact") {
    return (
      <div className="bg-slate-900 text-white border-b border-slate-700">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" aria-hidden />
            <span className="font-semibold truncate">{MESA_SITE_BRAND}</span>
            <span className="text-slate-400 hidden md:inline truncate max-w-[14rem] lg:max-w-none">
              · {mesaAtSkyeviewCommunity.salesOfficeAddress}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-blue-300">
            <span className="text-slate-400 hidden sm:inline">{lead.serviceFocus}</span>
            <Link
              href="/new-construction"
              className="hover:text-white underline-offset-2 hover:underline"
            >
              New homes
            </Link>
            <Link href="/contact" className="hover:text-white underline-offset-2 hover:underline">
              Contact
            </Link>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center gap-1 hover:text-white font-medium"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {agentInfo.phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" aria-hidden />
          <span className="font-semibold truncate">{MESA_SITE_BRAND}</span>
          <span className="text-slate-400 hidden lg:inline">
            · {mesaAtSkyeviewCommunity.salesOfficeAddress}
          </span>
        </div>
        <a
          href={agentInfo.phoneTel}
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white font-medium"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {agentInfo.phoneFormatted}
        </a>
      </div>
      <div className="container mx-auto px-4 pb-4">
        <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-1">
          {lead.serviceFocus}
        </p>
        <h2 className="text-lg font-bold leading-snug">{lead.headline}</h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">{lead.subhead}</p>
        <p className="text-slate-400 text-xs mt-2">
          <a
            href={getMesaCommunityDirectionsUrl()}
            className="text-blue-300 hover:text-white underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {mesaAtSkyeviewCommunity.salesOfficeAddress}
          </a>
          {" "}
          — Mesa at Skyeview in Skye Canyon (tours by appointment with Dr. Jan Duffy)
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <Link href="/buyers" className="text-sm text-blue-300 hover:text-white underline-offset-2 hover:underline">
            Buyer services
          </Link>
          <Link href="/sellers" className="text-sm text-blue-300 hover:text-white underline-offset-2 hover:underline">
            Seller services
          </Link>
          <Link href="/new-construction" className="text-sm text-blue-300 hover:text-white underline-offset-2 hover:underline">
            New construction
          </Link>
          <Link href="/neighborhoods/skye-canyon" className="text-sm text-blue-300 hover:text-white underline-offset-2 hover:underline">
            Skye Canyon guide
          </Link>
          <Link href="/contact" className="text-sm text-blue-300 hover:text-white underline-offset-2 hover:underline">
            Contact Dr. Jan
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function MesaskyeviewRealtorServicesSection() {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) return null;

  return (
    <section
      className="py-14 md:py-16 bg-slate-50 border-t border-slate-200"
      aria-labelledby="mesa-realtor-services"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="mesa-realtor-services" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Realtor services at Mesa at Skyeview
          </h2>
          <p className="text-slate-600">
            Dr. Jan Duffy represents buyers and sellers in Skye Canyon—not the builder sales office.{" "}
            {MESA_SITE_BRAND.split("|")[1]?.trim()} is your local advocacy brand for this community.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mesaRealtorServices.map((service) => (
            <article
              key={service.title}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
