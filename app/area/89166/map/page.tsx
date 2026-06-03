import Link from "next/link";
import { MapPin, Phone, Search } from "lucide-react";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { agentInfo } from "@/lib/site-config";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { getMesaCommunityMapsEmbedUrl, getMesaCommunityDirectionsUrl } from "@/lib/mesa-at-skyeview-schema";
import { mesaZipFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import {
  ZIP_89166,
  generateZip89166MapSchema,
  getZip89166DirectionsUrl,
  getZip89166GoogleMapsSearchUrl,
  getZip89166MapsEmbedUrl,
} from "@/lib/zip-89166-map";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `ZIP ${c.zip} Map | Skye Canyon & ${c.name} | Las Vegas`,
    description: `Google map of ZIP ${c.zip}—Skye Canyon, ${c.name}, and northwest Las Vegas homes. Search listings or contact Dr. Jan Duffy.`,
    pathname: "/area/89166/map",
    keywords: [
      `${c.zip} map`,
      "Skye Canyon map",
      `${c.name} map Las Vegas`,
      "Google map 89166",
    ],
  });
}

export default async function Zip89166MapPage() {
  const config = await getPageDomainConfig();
  const siteUrl = getCanonicalSiteUrl(config);
  const c = mesaAtSkyeviewCommunity;
  const faqSchema = mesaFaqsToSchema(mesaZipFaqs);
  const mapSchema = generateZip89166MapSchema(siteUrl);
  const contactWithZip = `/contact?zip=${ZIP_89166}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mapSchema) }}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <nav className="max-w-6xl mx-auto mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/area/89166-homes" className="hover:text-blue-600">
              ZIP {ZIP_89166} homes
            </Link>
            {" / "}
            <span className="text-slate-900">Map</span>
          </nav>

          <header className="max-w-4xl mx-auto text-center mb-10">
            <p className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Skye Canyon · Northwest Las Vegas
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              ZIP {ZIP_89166} map
            </h1>
            <p className="text-xl text-slate-600">
              Explore Skye Canyon and {c.name} on Google Maps—then search MLS homes or schedule a
              tour with Dr. Jan Duffy.
            </p>
          </header>

          <section
            className="max-w-5xl mx-auto mb-10 rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            aria-labelledby="zip-map-heading"
          >
            <h2 id="zip-map-heading" className="text-lg font-bold text-slate-900 px-4 pt-4">
              Google Map — ZIP {ZIP_89166} (Las Vegas, NV)
            </h2>
            <p className="text-sm text-slate-600 px-4 pb-3">
              Map shows the {ZIP_89166} postal area in northwest Las Vegas, including the Skye
              Canyon master plan and {c.name}.
            </p>
            <div className="aspect-[16/10] md:aspect-video w-full bg-slate-100">
              <iframe
                title={`Google Map of ZIP ${ZIP_89166}, Las Vegas NV`}
                src={getZip89166MapsEmbedUrl()}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap gap-4 p-4 bg-slate-50 text-sm">
              <a
                href={getZip89166GoogleMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:underline"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Open in Google Maps
              </a>
              <a
                href={getZip89166DirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:underline"
              >
                Directions to Skye Canyon
              </a>
            </div>
          </section>

          <section
            className="max-w-5xl mx-auto mb-10 rounded-xl border border-slate-200 overflow-hidden"
            aria-labelledby="mesa-pin-heading"
          >
            <h2 id="mesa-pin-heading" className="text-lg font-bold text-slate-900 px-4 pt-4">
              {c.name} sales office pin
            </h2>
            <address className="not-italic text-slate-700 px-4 pb-2 text-sm">
              {c.salesOfficeAddress}
            </address>
            <div className="aspect-video w-full">
              <iframe
                title={`Map pin for ${c.name}`}
                src={getMesaCommunityMapsEmbedUrl()}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 bg-slate-50">
              <a
                href={getMesaCommunityDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Directions to {c.name}
              </a>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Search homes in {ZIP_89166}</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/listings?zip=${ZIP_89166}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
              >
                <Search className="h-5 w-5" />
                MLS search — ZIP {ZIP_89166}
              </Link>
              <Link
                href={contactWithZip}
                className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50"
              >
                Contact Dr. Jan about {ZIP_89166}
              </Link>
            </div>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>
                <Link href="/neighborhoods/mesa-at-skyeview" className="text-blue-600 font-semibold">
                  {c.name} community guide
                </Link>
              </li>
              <li>
                <Link href="/area/89166-homes" className="text-blue-600 font-semibold">
                  ZIP {ZIP_89166} homes overview
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/skye-canyon" className="text-blue-600 font-semibold">
                  Skye Canyon neighborhood guide
                </Link>
              </li>
            </ul>
          </section>

          <section className="max-w-4xl mx-auto bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Questions about the {ZIP_89166} area?</h2>
            <p className="text-blue-100 mb-6">
              Dr. Jan Duffy · License S.0197614.LLC · Berkshire Hathaway HomeServices Nevada
              Properties
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-50"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call {agentInfo.phoneFormatted}
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
