import { agentInfo } from "@/lib/site-config";

/**
 * Primary headshot: `public/Image/agent1.jpg` (served/cached via Cloudflare `/Image/*` rules).
 * Override with Cloudflare Images delivery URL if set in Vercel env.
 */
const CLOUDFLARE_CACHED_HEADSHOT = "/Image/agent1.jpg";

function resolveHeadshotSrc(): string {
  const override = process.env.NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT?.trim();
  if (override) return override;
  return CLOUDFLARE_CACHED_HEADSHOT;
}

const headshotSrc = resolveHeadshotSrc();

/** Dr. Jan Duffy — use Cloudflare-hosted/cached agent photo, not third-party MLS CDN. */
export const drJanDuffyPhotos = {
  headshot: {
    src: headshotSrc,
    width: 600,
    height: 750,
    alt: `${agentInfo.name}, ${agentInfo.title} | ${agentInfo.brokerage} — Las Vegas & Mesa at Skyeview`,
  },
  portrait: {
    src: headshotSrc,
    width: 600,
    height: 750,
    alt: `${agentInfo.name} — your REALTOR® for Mesa at Skyeview, Skye Canyon, and Las Vegas`,
  },
} as const;

export type DrJanPhotoKey = keyof typeof drJanDuffyPhotos;

export function isExternalAgentPhoto(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
