import { MapPin, Navigation, Phone } from "lucide-react";
import {
  BHHS_BROKERAGE_NAP,
  MESA_COMMUNITY_NAP,
  getBhhsBrokerageDirectionsUrl,
  getBhhsBrokerageMapsEmbedUrl,
  getMesaCommunityDirectionsUrl,
  getMesaCommunityMapsEmbedUrl,
} from "@/lib/nap-addresses";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

type LocationBlockProps = {
  id: string;
  heading: string;
  subheading: string;
  napLabel: string;
  street: string;
  cityStateZip: string;
  contextLine?: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  mapTitle: string;
};

function LocationBlock({
  id,
  heading,
  subheading,
  napLabel,
  street,
  cityStateZip,
  contextLine,
  directionsUrl,
  mapEmbedUrl,
  mapTitle,
}: LocationBlockProps) {
  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-heading`}>
      <div className="text-center mb-8">
        <h2 id={`${id}-heading`} className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          {heading}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">{subheading}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-start bg-slate-50 rounded-lg p-5">
            <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" aria-hidden />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">{napLabel}</h3>
              <address className="not-italic text-slate-700">
                {street}
                <br />
                {cityStateZip}
              </address>
              {contextLine ? <p className="text-slate-500 text-sm mt-2">{contextLine}</p> : null}
            </div>
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Navigation className="h-5 w-5 mr-2" aria-hidden />
            Directions to this address
          </a>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm min-h-[280px]">
          <iframe
            title={mapTitle}
            src={mapEmbedUrl}
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/** Two locations, two maps — no cross-wired NAP. */
export default function DualNapMapSections() {
  return (
    <div className="max-w-5xl mx-auto mt-16 space-y-16">
      <LocationBlock
        id="mesa-community"
        heading={`${MESA_COMMUNITY_NAP.name} — model & tours`}
        subheading={`New-home tours and buyer meetings at the community sales center in ${mesaAtSkyeviewCommunity.masterPlan} (ZIP ${MESA_COMMUNITY_NAP.zip}).`}
        napLabel="Primary office address (NAP — GBP)"
        street={MESA_COMMUNITY_NAP.street}
        cityStateZip={`${MESA_COMMUNITY_NAP.city}, ${MESA_COMMUNITY_NAP.state} ${MESA_COMMUNITY_NAP.zip}`}
        contextLine={`${mesaAtSkyeviewCommunity.masterPlan} · Northwest Las Vegas`}
        directionsUrl={getMesaCommunityDirectionsUrl()}
        mapEmbedUrl={getMesaCommunityMapsEmbedUrl()}
        mapTitle={`Map: ${MESA_COMMUNITY_NAP.full}`}
      />
      <LocationBlock
        id="office"
        heading="BHHS Nevada Properties — brokerage office"
        subheading="Contract signings, consultations, and general meetings at the Berkshire Hathaway HomeServices Nevada Properties office."
        napLabel="BHHS brokerage office (contracts & closings)"
        street={BHHS_BROKERAGE_NAP.street}
        cityStateZip={`${BHHS_BROKERAGE_NAP.city}, ${BHHS_BROKERAGE_NAP.state} ${BHHS_BROKERAGE_NAP.zip}`}
        directionsUrl={getBhhsBrokerageDirectionsUrl()}
        mapEmbedUrl={getBhhsBrokerageMapsEmbedUrl()}
        mapTitle={`Map: ${BHHS_BROKERAGE_NAP.full}`}
      />
      <div className="text-center">
        <a
          href="tel:+17025001942"
          className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          <Phone className="h-5 w-5 mr-2" aria-hidden />
          Call (702) 500-1942 before you visit
        </a>
      </div>
    </div>
  );
}
