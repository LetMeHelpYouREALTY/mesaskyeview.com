import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Link from "next/link";
import { Phone, Home as HomeIcon, TrendingUp, Shield, Users } from "lucide-react";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { agentInfo } from "@/lib/site-config";
import { isMesaskyeviewDomain, mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaHomepageFaqsUi, mesaHomepageReviews } from "@/lib/mesa-homepage-content";
import MesaskyeviewHeroBackground from "@/components/mesaskyeview/MesaskyeviewHeroBackground";
import MesaskyeviewPhotoGallery from "@/components/mesaskyeview/MesaskyeviewPhotoGallery";
import MesaHeroSearch from "@/components/mesaskyeview/MesaHeroSearch";
import DrJanDuffyProfileCard from "@/components/agent/DrJanDuffyProfileCard";
import CloudflareHeroBackground from "@/components/shared/CloudflareHeroBackground";
import { siteHeroRotations } from "@/lib/site-images";
import { getRealscoutSimpleSearchHtml } from "@/lib/realscout-config";
import RealScoutListingsSection from "@/components/realscout/RealScoutListingsSection";
import MesaDeferredListingsBlock from "@/components/performance/MesaDeferredListingsBlock";
import MesaExploreLinks from "@/components/mesaskyeview/MesaExploreLinks";
import MesaExtractableFacts from "@/components/mesaskyeview/MesaExtractableFacts";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  return createPageMetadata(config, {
    title: config.heroHeadline,
    description: config.description,
    pathname: "/",
    keywords: config.keywords,
  });
}

export default async function Home() {
  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);

  return (
    <>
      <main>
        {/* Domain-Aware Hero */}
        <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
          {isMesa ? (
            <MesaskyeviewHeroBackground />
          ) : (
            <CloudflareHeroBackground
              images={siteHeroRotations}
              overlayClassName="absolute inset-0 bg-slate-900/70"
            />
          )}
          <div className="relative z-10 container mx-auto px-4 text-center">
            {config.ctaBadge && (
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
                {config.ctaBadge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              {config.heroSubheadline}
            </p>

            {/* RealScout Search Widget */}
            {isMesa ? (
              <MesaHeroSearch agentEncodedId={config.realscoutAgentId} />
            ) : (
              <div className="mb-8 flex justify-center realscout-wrapper">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getRealscoutSimpleSearchHtml(config.realscoutAgentId),
                  }}
                />
              </div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              {isMesa ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">89166</span>
                    <span>Skye Canyon focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">New + resale</span>
                    <span>Mesa at Skyeview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">BHHS</span>
                    <span>Nevada Properties</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">500+</span>
                    <span>Families Helped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">30+ Years</span>
                    <span>Las Vegas Experience</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {isMesa ? (
          <MesaDeferredListingsBlock>
            <RealScoutListingsSection />
          </MesaDeferredListingsBlock>
        ) : (
          <RealScoutListingsSection />
        )}

        {isMesa && <MesaExtractableFacts />}
        {isMesa && <MesaskyeviewPhotoGallery />}
        {isMesa && <MesaExploreLinks />}
        {isMesa && <DrJanDuffyProfileCard config={config} showPortrait />}

        {/* Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Work With Dr. Jan Duffy?
              </h2>
              <p className="text-lg text-slate-600">
                {isMesa
                  ? "Realtor representation for Mesa at Skyeview and Skye Canyon—buying, selling, and new construction advocacy with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties."
                  : "Berkshire Hathaway HomeServices Nevada Properties — the most trusted name in Las Vegas real estate."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Shield, title: "Trusted Brand", desc: "Backed by Warren Buffett's Berkshire Hathaway — unmatched integrity" },
                { icon: Users, title: "50K+ Network", desc: "Global referral network for seamless moves to or from any market" },
                { icon: TrendingUp, title: "$127M+ Sold", desc: "Proven results across every Las Vegas neighborhood since 2008" },
                { icon: HomeIcon, title: "Full Service", desc: "Buying, selling, 55+, luxury, investment — one expert handles it all" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                {config.neighborhood} Real Estate Market
              </h2>
              <p className="text-slate-400">
                {isMesa
                  ? "Community highlights — ask Dr. Jan for current MLS pricing in 89166"
                  : "Current data — updated regularly"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {(isMesa
                ? [
                    { value: mesaAtSkyeviewCommunity.priceFromPublicListings, label: "New homes from", sub: "per public listings" },
                    { value: mesaAtSkyeviewCommunity.sqftRange, label: "Sq ft range", sub: "one-story plans" },
                    { value: mesaAtSkyeviewCommunity.zip, label: "Skye Canyon ZIP", sub: "Northwest Las Vegas" },
                    { value: "3", label: "Floor plans", sub: "Mesa at Skyeview" },
                  ]
                : [
                    { value: "$450K", label: "Median Price", sub: "+4.2% YoY" },
                    { value: "28", label: "Avg Days on Market", sub: "" },
                    { value: "4,850", label: "Active Listings", sub: "" },
                    { value: "2.1", label: "Months Inventory", sub: "" },
                  ]
              ).map(({ value, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-1">{value}</div>
                  <div className="text-slate-300 text-sm">{label}</div>
                  {sub && <div className="text-green-400 text-xs mt-1">{sub}</div>}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/market-report" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                Full Market Report
              </Link>
            </div>
          </div>
        </section>
<WhyChooseUs />
        <ReviewsSection
          reviews={isMesa ? mesaHomepageReviews : undefined}
          showAggregateLine={!isMesa}
          subtitle={
            isMesa
              ? "Client experiences at Mesa at Skyeview and in Skye Canyon (89166)"
              : undefined
          }
        />
        <FAQSection
          faqs={isMesa ? mesaHomepageFaqsUi : undefined}
          subtitle={
            isMesa
              ? "Questions about Mesa at Skyeview, Skye Canyon, and ZIP 89166"
              : undefined
          }
        />

        {/* Domain-Specific CTA */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {config.ctaHeadline}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </div>
        </section>
      </main>
</>
  );
}
