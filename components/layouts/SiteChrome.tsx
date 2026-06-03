import Footer from "@/components/layouts/Footer";
import OfficeSection from "@/components/sections/OfficeSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import RealScoutListingsSection from "@/components/realscout/RealScoutListingsSection";

/** Office, Calendly, RealScout office listings, and footer — rendered on every page via root layout. */
export default function SiteChrome() {
  return (
    <>
      <OfficeSection />
      <ScheduleSection />
      <RealScoutListingsSection />
      <Footer />
    </>
  );
}
