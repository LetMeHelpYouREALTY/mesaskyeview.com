import { agentInfo } from "@/lib/site-config";
import { cloudflareImages } from "@/lib/site-images";

function resolveHeadshotSrc(): string {
  const override = process.env.NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT?.trim();
  if (override) return override;
  return cloudflareImages.agent.drJanHeadshot.src;
}

const headshotSrc = resolveHeadshotSrc();
const headshotMeta = cloudflareImages.agent.drJanHeadshot;

/** Dr. Jan Duffy — Cloudflare-cached /Image/agent1.png (or env override). */
export const drJanDuffyPhotos = {
  headshot: {
    src: headshotSrc,
    width: headshotMeta.width,
    height: headshotMeta.height,
    alt: `${agentInfo.name}, ${agentInfo.title} | ${agentInfo.brokerage} — Las Vegas & Mesa at Skyeview`,
  },
  portrait: {
    src: headshotSrc,
    width: headshotMeta.width,
    height: headshotMeta.height,
    alt: `${agentInfo.name} — your REALTOR® for Mesa at Skyeview, Skye Canyon, and Las Vegas`,
  },
} as const;

export type DrJanPhotoKey = keyof typeof drJanDuffyPhotos;

export function isExternalAgentPhoto(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
