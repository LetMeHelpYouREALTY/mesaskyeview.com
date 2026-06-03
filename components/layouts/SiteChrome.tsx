import Footer from "@/components/layouts/Footer";
import OfficeSection from "@/components/sections/OfficeSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import RealScoutListingsSection from "@/components/realscout/RealScoutListingsSection";
import { MesaskyeviewRealtorServicesSection } from "@/components/mesaskyeview/MesaskyeviewContextBar";

/** Office, Calendly, RealScout office listings, and footer — rendered on every page via root layout. */
export default function SiteChrome() {
  return (
    <>
      <MesaskyeviewRealtorServicesSection />
      <OfficeSection />
      <ScheduleSection />
      <RealScoutListingsSection />
      <Footer />
    </>
  );
}
