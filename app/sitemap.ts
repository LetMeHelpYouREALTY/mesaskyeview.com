import { headers } from "next/headers";
import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl, getDomainConfig } from "@/lib/domain-config";
import { GSC_SITEMAP_PATHS } from "@/lib/gsc-sitemap-paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = headers().get("x-domain") || headers().get("host") || "";
  const config = getDomainConfig(host);
  const baseUrl = getCanonicalSiteUrl(config);
  const lastModified = new Date();

  return GSC_SITEMAP_PATHS.map((page) => ({
    url: page.path === "" ? baseUrl : `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
