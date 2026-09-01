import { brokerageId, personId } from "@/lib/schema-ids";

const CANONICAL_SITE = "https://www.mesaskyeview.com";

/**
 * Google Review snippets require `author` to be Person or Organization only.
 * RealEstateAgent (a LocalBusiness subtype) triggers GSC: Invalid object type for field "author".
 * @see https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */
export function jsonLdPersonAuthor(siteUrl: string = CANONICAL_SITE) {
  return {
    "@type": "Person" as const,
    "@id": personId(siteUrl),
    name: "Dr. Jan Duffy",
    jobTitle: "REALTOR®",
    url: `${siteUrl}/about`,
    worksFor: {
      "@type": "Organization" as const,
      "@id": brokerageId(siteUrl),
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
  };
}

export function jsonLdBrokeragePublisher(siteUrl: string = CANONICAL_SITE) {
  return {
    "@type": "Organization" as const,
    "@id": brokerageId(siteUrl),
    name: "Berkshire Hathaway HomeServices Nevada Properties",
    url: siteUrl,
  };
}
