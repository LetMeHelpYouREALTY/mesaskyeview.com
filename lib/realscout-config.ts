/**
 * RealScout web components — load REALSCOUT_WEB_COMPONENTS_SCRIPT once in app/layout.tsx.
 * @see https://em.realscout.com — office listings + simple search share one UMD bundle.
 */

export const REALSCOUT_WEB_COMPONENTS_SCRIPT =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

export const REALSCOUT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

export const DR_JAN_REALSCOUT_SEARCH_URL = "https://drjanduffy.realscout.com/";

export function getRealscoutOfficeListingsHtml(
  agentEncodedId: string = REALSCOUT_AGENT_ENCODED_ID
): string {
  return `<realscout-office-listings agent-encoded-id="${agentEncodedId}" sort-order="STATUS_AND_SIGNIFICANT_CHANGE" listing-status="For Sale" property-types="SFR,MF,TC" price-min="500000" price-max="1200000"></realscout-office-listings>`;
}

export function getRealscoutSimpleSearchHtml(
  agentEncodedId: string = REALSCOUT_AGENT_ENCODED_ID
): string {
  return `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`;
}
