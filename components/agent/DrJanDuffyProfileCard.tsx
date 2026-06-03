import Link from "next/link";
import { Phone, Award } from "lucide-react";
import DrJanDuffyPhoto from "@/components/agent/DrJanDuffyPhoto";
import { agentInfo } from "@/lib/site-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import type { DomainConfig } from "@/lib/domain-config";
import { getContactEmail } from "@/lib/domain-config";

type DrJanDuffyProfileCardProps = {
  config?: DomainConfig;
  compact?: boolean;
  showPortrait?: boolean;
};

export default function DrJanDuffyProfileCard({
  config,
  compact = false,
  showPortrait = false,
}: DrJanDuffyProfileCardProps) {
  const isMesa = config ? isMesaskyeviewDomain(config) : false;
  const email = config ? getContactEmail(config) : agentInfo.email;

  return (
    <section
      className="py-12 md:py-16 bg-white border-y border-slate-200"
      aria-labelledby="dr-jan-profile-heading"
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-5xl mx-auto grid gap-8 items-center ${
            compact ? "md:grid-cols-[minmax(0,11rem)_1fr]" : "md:grid-cols-[minmax(0,16rem)_1fr]"
          }`}
        >
          <DrJanDuffyPhoto
            variant={showPortrait ? "portrait" : "headshot"}
            priority
            className={compact ? "aspect-square max-w-[11rem] mx-auto shadow-md" : "aspect-square max-w-xs mx-auto md:mx-0 shadow-lg"}
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
              {isMesa ? "Your Mesa at Skyeview REALTOR®" : "Berkshire Hathaway HomeServices Nevada Properties"}
            </p>
            <h2
              id="dr-jan-profile-heading"
              className={`font-bold text-slate-900 mb-3 ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
            >
              {agentInfo.name}
            </h2>
            <p className="text-blue-600 font-medium mb-4">
              {agentInfo.title} · License {agentInfo.license}
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {isMesa
                ? "Dr. Jan Duffy represents buyers and sellers at Mesa at Skyeview in Skye Canyon (89166)—new construction tours, contract advocacy, and MLS search with Berkshire Hathaway HomeServices Nevada Properties."
                : "Dr. Jan Duffy has served Las Vegas and Henderson since 2008 with personalized buyer and seller representation, luxury expertise, and new construction advocacy."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-600 text-slate-800 px-5 py-2.5 rounded-md font-semibold transition-colors"
              >
                <Award className="h-4 w-4" aria-hidden />
                About Dr. Jan
              </Link>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                {email}
              </a>
              {" · "}
              {agentInfo.brokerage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
