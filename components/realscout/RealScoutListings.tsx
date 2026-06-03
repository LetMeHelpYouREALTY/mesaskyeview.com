import { getPageDomainConfig } from "@/lib/get-domain-config";
import {
  DR_JAN_REALSCOUT_SEARCH_URL,
  getRealscoutOfficeListingsHtml,
} from "@/lib/realscout-config";
import MlsListingAttribution from "@/components/realscout/MlsListingAttribution";

/** Office MLS listings — primary lead widget; placed below hero on every page (server component). */
export default async function RealScoutListings() {
  const config = await getPageDomainConfig();

  return (
    <section
      id="listings"
      className="scroll-mt-28 py-12 md:py-16 bg-slate-50 border-y border-slate-200 shadow-sm"
      aria-labelledby="listings-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
              Search homes for sale
            </p>
            <h2
              id="listings-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3"
            >
              Las Vegas MLS Listings
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Live inventory near {config.neighborhood} and across Las Vegas &amp; Henderson—updated
              from RealScout. Save favorites and request showings with Dr. Jan Duffy.
            </p>
          </div>
          <a
            href={DR_JAN_REALSCOUT_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors shrink-0"
          >
            View All Properties
          </a>
        </div>

        <div
          className="realscout-wrapper"
          dangerouslySetInnerHTML={{
            __html: getRealscoutOfficeListingsHtml(config.realscoutAgentId),
          }}
        />
        <MlsListingAttribution />
      </div>
    </section>
  );
}
