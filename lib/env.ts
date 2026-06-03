/**
 * Central env accessors — supports Vercel dashboard names and legacy aliases.
 * Server-only secrets must never be prefixed with NEXT_PUBLIC_.
 */

/** Follow Up Boss — Vercel may use FOLLOW_UP_BOSS_API_KEY; code historically used FUB_API_KEY */
export function getFubApiKey(): string {
  return process.env.FUB_API_KEY || process.env.FOLLOW_UP_BOSS_API_KEY || "";
}

export function getFubSystemKey(): string | undefined {
  return process.env.FUB_SYSTEM_KEY || undefined;
}

export function getOpenRouterApiKey(): string {
  return process.env.OPENROUTER_API_KEY || "";
}

export function getNotionToken(): string {
  return process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || "";
}

export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;
}

/** Google Search Console HTML tag verification (content value only, not full meta tag). */
export function getGoogleSiteVerification(): string | undefined {
  return (
    process.env.GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    undefined
  );
}

export function getCloudinaryConfig() {
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "",
  };
}

export function getGoogleMapsApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || undefined;
}

export function getV0ApiKey(): string {
  return process.env.V0_API_KEY || "";
}

export function getCloudflareApiToken(): string {
  return process.env.CLOUDFLARE_API_TOKEN || "";
}

export function isFubConfigured(): boolean {
  return Boolean(getFubApiKey());
}

/** Supabase — publishable keys only in NEXT_PUBLIC_* (never service_role in the browser). */
export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || undefined;
}

export function getSupabaseAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || undefined;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
