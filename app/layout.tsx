import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getCanonicalSiteUrl, getDomainConfig, getContactEmail } from "@/lib/domain-config";
import SitePageSchema from "@/components/seo/SitePageSchema";
import { getGoogleSiteVerification } from "@/lib/env";
import { getDefaultSocialImageMetadata } from "@/lib/google-search-console";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import SiteChrome from "@/components/layouts/SiteChrome";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import SiteHeader from "@/components/layouts/SiteHeader";
import SitePageBanner from "@/components/layouts/SitePageBanner";
import RealScoutBelowHero from "@/components/layouts/RealScoutBelowHero";
import { DomainConfigProvider } from "@/components/providers/DomainConfigProvider";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import { REALSCOUT_WEB_COMPONENTS_SCRIPT } from "@/lib/realscout-config";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || headers().get("host") || "";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const domain = headers().get("x-domain") || headers().get("host") || "";
  const config = getDomainConfig(domain);
  const mainOffsetClass = isMesaskyeviewDomain(config) ? "" : "pt-24";

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <SitePageSchema />
        <Script
          src={REALSCOUT_WEB_COMPONENTS_SCRIPT}
          type="module"
          strategy="afterInteractive"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        <GoogleAnalytics />
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
      </body>
    </html>
  );
}
