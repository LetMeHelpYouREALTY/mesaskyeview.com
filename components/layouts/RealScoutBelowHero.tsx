import { headers } from "next/headers";
import RealScoutListingsSection from "@/components/realscout/RealScoutListingsSection";

/**
 * Primary lead-gen MLS block — placed below the hero on every page.
 * Homepage renders its own instance after the full hero (pathname "/").
 */
export default async function RealScoutBelowHero() {
  const pathname = headers().get("x-pathname") || "/";
  if (pathname === "/") return null;

  return <RealScoutListingsSection />;
}
