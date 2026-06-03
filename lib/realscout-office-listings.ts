/** RealScout office listings web component — agent QWdlbnQtMjI1MDUw (Dr. Jan Duffy). */
export const REALSCOUT_WEB_COMPONENTS_SCRIPT =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

export const REALSCOUT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

/** Markup for <realscout-office-listings> (requires REALSCOUT_WEB_COMPONENTS_SCRIPT in layout). */
export function getRealscoutOfficeListingsHtml(
  agentEncodedId: string = REALSCOUT_AGENT_ENCODED_ID
): string {
  return `<realscout-office-listings agent-encoded-id="${agentEncodedId}" sort-order="STATUS_AND_SIGNIFICANT_CHANGE" listing-status="For Sale" property-types="SFR,MF,TC" price-min="500000" price-max="1200000"></realscout-office-listings>`;
}
