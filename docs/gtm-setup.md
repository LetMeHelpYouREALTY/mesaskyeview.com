# Google Tag Manager — mesaskyeview.com

Code loads the container via `@next/third-parties/google` when `NEXT_PUBLIC_GTM_ID` is set. GA4, click triggers, and key events are configured in the **GTM web UI** by Jan — not in this repo.

## Environment variables (Vercel / `.env.local`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GTM_ID` | GTM container ID (`GTM-XXXXXXX`). **TODO(jan): add real ID in Vercel — do not commit.** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Reference for GA4 Configuration tag in GTM only. **TODO(jan): MesaSkyeView.com stream `G-DN9PK64ZYX`.** Not read by Next.js. |

Previews without `NEXT_PUBLIC_GTM_ID` render no container (silent no-op).

## Repo-side events (`lib/analytics.ts`)

| Event | Source |
|-------|--------|
| `contact_form_submit` | `LeadCaptureForm` after successful `/api/leads/capture` (`formType: contact`) |
| `valuation_request_submit` | `LeadCaptureForm` after success (`formType: home-valuation`) |

Parameters include `form_location` (pathname) and `form_type`.

## GTM-UI-TODO — create in container, then publish

### 1. Built-in variables (enable)

- Click URL  
- Click Text  
- Page Path  

### 2. Triggers (Click — Just Links)

| Trigger name | Condition |
|--------------|-----------|
| `phone_click` | Click URL starts with `tel:` |
| `email_click` | Click URL starts with `mailto:` |
| `realscout_search_click` | Click URL contains `drjanduffy.realscout.com` |

### 3. Triggers (Custom Event — dataLayer)

| Trigger name | Event name |
|--------------|------------|
| `ce_contact_form_submit` | `contact_form_submit` |
| `ce_valuation_request_submit` | `valuation_request_submit` |

### 4. Tags

| Tag type | Name | Trigger | Notes |
|----------|------|---------|-------|
| GA4 Configuration | `GA4 - Config` | All Pages | Measurement ID = `G-DN9PK64ZYX` (from env reference) |
| GA4 Event | `GA4 - phone_click` | `phone_click` | `event_name` = `phone_click`, param `page_path` |
| GA4 Event | `GA4 - email_click` | `email_click` | `event_name` = `email_click`, param `page_path` |
| GA4 Event | `GA4 - realscout_search_click` | `realscout_search_click` | `event_name` = `realscout_search_click`, param `page_path` |
| GA4 Event | `GA4 - contact_form_submit` | `ce_contact_form_submit` | Pass through `form_location`, `form_type` |
| GA4 Event | `GA4 - valuation_request_submit` | `ce_valuation_request_submit` | Pass through `form_location`, `form_type` |

### 5. GA4 Admin — key events

Mark as **key events** (priority):

1. `phone_click`  
2. `realscout_search_click`  
3. `contact_form_submit`  
4. `valuation_request_submit`  

### 6. Cross-domain (optional)

Home search handoff: `https://drjanduffy.realscout.com/`. If Jan controls that GA4 property, configure linked domains in GA4 Admin → Data Streams → tag settings. **Outbound `realscout_search_click` on mesaskyeview.com remains the primary measurable conversion.**

### 7. Consent

US-focused site; full EEA Consent Mode v2 not required today. **TODO(jan): confirm CMP** before Consent Mode in GTM. Enable **Basic** Consent Mode only when Google Ads runs broadly — not Advanced mode.

## Verification

1. Set `NEXT_PUBLIC_GTM_ID` locally.  
2. GTM → **Preview** → load site.  
3. Submit test lead form (or use Tag Assistant).  
4. Confirm `contact_form_submit` / click events in Preview and GA4 Realtime.

## Primary conversion surfaces on site

- **Phone:** `tel:+17025001942` — header, footer, CTAs site-wide  
- **RealScout outbound:** `drjanduffy.realscout.com` — navbar, footer, CTAs  
- **Email:** domain contact email via `mailto:` — footer, contact page  
- **Forms:** `LeadCaptureForm` → `/api/leads/capture` (component exists; mount where needed)  
- **Scheduling:** Calendly embed (`ScheduleSection`) — track in GTM only if Jan adds Calendly integration tags  
