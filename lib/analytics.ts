import { sendGTMEvent } from "@next/third-parties/google";

export type LeadEvent =
  | "contact_form_submit"
  | "valuation_request_submit"
  | "phone_click"
  | "email_click"
  | "realscout_search_click";

/** Push a lead conversion event to GTM dataLayer (requires NEXT_PUBLIC_GTM_ID + published container). */
export function trackLead(event: LeadEvent, params: Record<string, string | number> = {}) {
  sendGTMEvent({ event, ...params });
}

/*
 * GTM-UI-TODO: Create these in the GTM container, then publish.
 *
 * Built-in variables to enable: Click URL, Click Text, Page Path.
 *
 * Triggers (Click — Just Links):
 *   - phone_click             → Click URL starts with "tel:"
 *   - email_click             → Click URL starts with "mailto:"
 *   - realscout_search_click  → Click URL contains "drjanduffy.realscout.com"
 *
 * Tags (GA4 Event), each fired by its matching trigger, event_name = trigger name,
 * plus parameter page_path = {{Page Path}}.
 *
 * Tags (GA4 Event) for dataLayer custom events from code:
 *   - contact_form_submit     → Custom Event trigger, event name contact_form_submit
 *   - valuation_request_submit → Custom Event trigger, event name valuation_request_submit
 *
 * Tag (GA4 Configuration):
 *   - Measurement ID from NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel (MesaSkyeView stream)
 *   - TODO(jan): use G-DN9PK64ZYX in the GA4 Configuration tag — not in repo code
 *   - Fires on All Pages (inside GTM only)
 *
 * GA4 Admin → Events → mark as key events (priority order):
 *   1. phone_click
 *   2. realscout_search_click
 *   3. contact_form_submit
 *   4. valuation_request_submit
 *
 * GTM-UI-TODO (cross-domain): RealScout search lives on drjanduffy.realscout.com.
 * If Jan controls that property's GA4 stream, add cross-domain linking in
 * GA4 Admin → Data Streams → Configure tag settings → Configure your domains.
 * Do not assume full-funnel stitching; realscout_search_click on this site is the
 * reliable outbound conversion signal.
 *
 * GTM-UI-TODO (Consent Mode): Wire Basic Consent Mode v2 only when Google Ads runs
 * broadly. Do not use Advanced mode at this traffic volume.
 * TODO(jan): confirm CMP choice before enabling Consent Mode in GTM.
 */
