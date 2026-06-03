/** Stable JSON-LD @id anchors for mesaskyeview.com (one entity graph). */

export function agentId(siteUrl: string): string {
  return `${siteUrl}/#agent`;
}

export function brokerageId(siteUrl: string): string {
  return `${siteUrl}/#brokerage`;
}

export function communityPlaceId(siteUrl: string): string {
  return `${siteUrl}/#community`;
}

export function mesaCommunityComplexId(siteUrl: string): string {
  return `${siteUrl}/#mesa-community`;
}

export function websiteId(siteUrl: string): string {
  return `${siteUrl}/#website`;
}
