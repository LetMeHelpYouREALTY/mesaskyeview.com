import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import MesaskyeviewContextBar from "@/components/mesaskyeview/MesaskyeviewContextBar";
import Navbar from "@/components/layouts/Navbar";

/** Sticky site header: Mesa context strip + nav (avoids fixed nav overlapping hero). */
export default async function SiteHeader() {
  const config = await getPageDomainConfig();
  if (!isMesaskyeviewDomain(config)) {
    return <Navbar />;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F6F1E8] shadow-[0_1px_0_rgba(196,163,90,0.45),0_8px_24px_rgba(15,23,42,0.08)]">
      <MesaskyeviewContextBar variant="compact" />
      <Navbar position="embedded" />
    </header>
  );
}
