import { agentInfo } from "@/lib/site-config";

const AGENT_BASE = "/images/agent";

/** Licensed marketing photos for Dr. Jan Duffy (BHHS Nevada Properties). */
export const drJanDuffyPhotos = {
  headshot: {
    src: `${AGENT_BASE}/dr-jan-duffy.jpg`,
    width: 800,
    height: 1036,
    alt: `${agentInfo.name}, ${agentInfo.title} | ${agentInfo.brokerage} — Las Vegas & Mesa at Skyeview`,
  },
  portrait: {
    src: `${AGENT_BASE}/dr-jan-duffy-alt.jpg`,
    width: 600,
    height: 800,
    alt: `${agentInfo.name} — your REALTOR® for Mesa at Skyeview, Skye Canyon, and Las Vegas`,
  },
} as const;

export type DrJanPhotoKey = keyof typeof drJanDuffyPhotos;
