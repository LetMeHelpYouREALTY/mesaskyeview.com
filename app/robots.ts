import { headers } from "next/headers";
import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl, getDomainConfig } from "@/lib/domain-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHost = (await headers()).get("host") || "";
  const config = getDomainConfig(requestHost);
  const siteUrl = getCanonicalSiteUrl(config);
  const canonicalHost = new URL(siteUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/monitoring"],
    },
    host: canonicalHost,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
