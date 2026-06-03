import Footer from "@/components/layouts/Footer";
import OfficeSection from "@/components/sections/OfficeSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import { MesaskyeviewRealtorServicesSection } from "@/components/mesaskyeview/MesaskyeviewContextBar";

/** Office, Calendly, and footer — RealScout office listings render below hero via RealScoutBelowHero. */
export default function SiteChrome() {
  return (
    <>
      <MesaskyeviewRealtorServicesSection />
      <OfficeSection />
      <ScheduleSection />
      <Footer />
    </>
  );
}
