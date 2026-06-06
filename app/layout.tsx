import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getCanonicalSiteUrl, getDomainConfig, getContactEmail } from "@/lib/domain-config";
import SitePageSchema from "@/components/seo/SitePageSchema";
import { getGoogleSiteVerification } from "@/lib/env";
import { getDefaultSocialImageMetadata } from "@/lib/google-search-console";
import { Analytics } from "@vercel/analytics/react";
import SiteChrome from "@/components/layouts/SiteChrome";
import { GoogleTagManager } from "@next/third-parties/google";
import MesaDeferredGoogleTagManager from "@/components/analytics/MesaDeferredGoogleTagManager";
import UsPrivacyOptOutBanner from "@/components/analytics/UsPrivacyOptOutBanner";
import { getGtmId } from "@/lib/env";
import SiteHeader from "@/components/layouts/SiteHeader";
import SitePageBanner from "@/components/layouts/SitePageBanner";
import RealScoutBelowHero from "@/components/layouts/RealScoutBelowHero";
import { DomainConfigProvider } from "@/components/providers/DomainConfigProvider";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import DomainThirdPartyScripts from "@/components/performance/DomainThirdPartyScripts";
import MesaHeroPreload from "@/components/mesaskyeview/MesaHeroPreload";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const domain = headersList.get("x-domain") || headersList.get("host") || "";
  const config = getDomainConfig(domain);
  const siteUrl = getCanonicalSiteUrl(config);
  const googleVerification = getGoogleSiteVerification();

  const defaultTitle = isMesaskyeviewDomain(config)
    ? MESA_SITE_BRAND
    : `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`;

  const social = getDefaultSocialImageMetadata(config);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: isMesaskyeviewDomain(config) ? `%s | ${MESA_SITE_BRAND}` : `%s | Dr. Jan Duffy`,
    },
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      type: "website",
      url: siteUrl,
      siteName: isMesaskyeviewDomain(config) ? MESA_SITE_BRAND : `Dr. Jan Duffy — ${config.neighborhood}`,
      locale: "en_US",
      ...social.openGraph,
    },
    twitter: {
      ...social.twitter,
      title: config.heroHeadline,
      description: config.description,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const domain = headersList.get("x-domain") || headersList.get("host") || "";
  const config = getDomainConfig(domain);
  const mainOffsetClass = isMesaskyeviewDomain(config) ? "" : "pt-24";
  const gtmId = getGtmId();

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <SitePageSchema />
        <MesaHeroPreload />
        <DomainThirdPartyScripts />
      </head>
      <body>
        <DomainConfigProvider config={config}>
          <SiteHeader />
          <div className={mainOffsetClass}>
            <SitePageBanner />
            <RealScoutBelowHero />
            {children}
          </div>
          <SiteChrome />
        </DomainConfigProvider>
        <Analytics />
        <UsPrivacyOptOutBanner />
        {gtmId ? (
          isMesaskyeviewDomain(config) ? (
            <MesaDeferredGoogleTagManager gtmId={gtmId} />
          ) : (
            <GoogleTagManager gtmId={gtmId} />
          )
        ) : null}
      </body>
    </html>
  );
}
