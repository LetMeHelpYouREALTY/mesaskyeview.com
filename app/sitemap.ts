import { headers } from "next/headers";
import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl, getDomainConfig } from "@/lib/domain-config";
import { GSC_SITEMAP_PATHS, type SitemapEntry } from "@/lib/gsc-sitemap-paths";

/** Stagger lastmod so crawlers do not see one frozen timestamp on every URL. */
function lastModifiedFor(page: SitemapEntry): Date {
  const now = new Date();
  const startOfUtcDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const freqOffset =
    page.changeFrequency === "daily"
      ? 0
      : page.changeFrequency === "weekly"
        ? 3
        : 14;
  const pathSalt = page.path.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 6;
  return new Date(startOfUtcDay - (freqOffset + pathSalt) * 86_400_000);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("x-domain") || headersList.get("host") || "";
  const config = getDomainConfig(host);
  const baseUrl = getCanonicalSiteUrl(config);

  return GSC_SITEMAP_PATHS.map((page) => ({
    url: page.path === "" ? baseUrl : `${baseUrl}${page.path}`,
    lastModified: lastModifiedFor(page),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
