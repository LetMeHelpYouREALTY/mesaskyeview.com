"use client";

import { Button } from "@/components/ui/button";
import { getRealscoutOfficeListingsHtml } from "@/lib/realscout-office-listings";

type RealScoutListingsProps = {
  agentEncodedId: string;
  neighborhood: string;
};

export default function RealScoutListings({
  agentEncodedId,
  neighborhood,
}: RealScoutListingsProps) {
  return (
    <section
      id="listings"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-200"
      aria-labelledby="listings-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2
              id="listings-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              MLS listings near {neighborhood} and across Las Vegas & Henderson
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href="http://drjanduffy.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Properties
            </a>
          </Button>
        </div>

        <div
          className="realscout-wrapper"
          dangerouslySetInnerHTML={{
            __html: getRealscoutOfficeListingsHtml(agentEncodedId),
          }}
        />
      </div>
    </section>
  );
}
