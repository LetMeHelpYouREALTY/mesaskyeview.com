import { headers } from "next/headers";
import type { MetadataRoute } from "next";
import { AI_ANSWER_CRAWLERS } from "@/lib/ai-crawlers";
import { getCanonicalSiteUrl, getDomainConfig } from "@/lib/domain-config";

/**
 * Dynamic robots.txt. Do not add public/robots.txt — it would fight this file
 * and previously blocked GPTBot / Claude (wrong host: heyberkshire.com).
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHost = (await headers()).get("host") || "";
  const config = getDomainConfig(requestHost);
  const siteUrl = getCanonicalSiteUrl(config);
  const canonicalHost = new URL(siteUrl).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/monitoring"],
      },
      {
        userAgent: [...AI_ANSWER_CRAWLERS],
        allow: "/",
      },
    ],
    host: canonicalHost,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
