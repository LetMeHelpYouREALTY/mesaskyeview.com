import { getPageDomainConfig } from "@/lib/get-domain-config";
import {
  DR_JAN_REALSCOUT_SEARCH_URL,
  getRealscoutOfficeListingsHtml,
} from "@/lib/realscout-config";
import MlsListingAttribution from "@/components/realscout/MlsListingAttribution";

/** Office MLS listings — rendered on every page via SiteChrome (server component, no widget state). */
export default async function RealScoutListings() {
  const config = await getPageDomainConfig();

  return (
    <section
      id="listings"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-200"
      aria-labelledby="listings-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2
              id="listings-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              MLS listings near {config.neighborhood} and across Las Vegas &amp; Henderson
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
