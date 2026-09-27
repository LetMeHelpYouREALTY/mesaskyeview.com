import Link from "next/link";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity, MESA_HOME_BRAND } from "@/lib/mesaskyeview-brand";
import {
  MESA_NEARBY_AMENITIES_FAQS,
  MESA_NEARBY_COMMUTE_NOTES,
} from "@/lib/mesa-nearby-amenities-data";
import { generateNearbyAmenitiesPageSchemas } from "@/lib/mesa-nearby-amenities-schema";
import MesaNearbySection from "@/components/mesaskyeview/MesaNearbySection";
import MesaAmenityStaticList from "@/components/mesaskyeview/MesaAmenityStaticList";
import { agentInfo } from "@/lib/site-config";
import { getRealscoutPropertySearchUrl } from "@/lib/realscout-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `Nearby Amenities in ${c.name}, Las Vegas | Skye Canyon ${c.zip}`,
    description: `Interactive map of grocery, parks, healthcare, dining, and schools near ${c.name} in Skye Canyon (${c.zip}). Hyperlocal guide from Dr. Jan Duffy, REALTOR®.`,
    pathname: "/nearby-amenities",
    keywords: [
      `${c.name} nearby amenities`,
      "Skye Canyon grocery parks",
      "89166 hospitals schools",
      "things near Mesa at Skyeview",
    ],
  });
}

export default async function NearbyAmenitiesPage() {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  const schemas = generateNearbyAmenitiesPageSchemas(config);
  const searchUrl = getRealscoutPropertySearchUrl(config);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`nearby-amenities-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/neighborhoods/mesa-at-skyeview" className="hover:text-blue-600">
                {c.name}
              </Link>
              {" / "}
              <span className="text-slate-900">Nearby amenities</span>
            </nav>
            <header className="max-w-4xl">
              <p className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {MESA_HOME_BRAND}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Nearby Amenities in {c.name}, Las Vegas
              </h1>
              <p className="text-xl text-slate-600 aeo-lead-answer">
                Skye Canyon ({c.zip}) daily errands, recreation, healthcare, and schools—mapped from
                the community sales center at {c.street}.
              </p>
            </header>
          </div>
        </div>

        <MesaNearbySection variant="full" />

        <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-slate prose-lg">
          <h2>Dining &amp; cafes in Skye Canyon</h2>
          <p>
            Skye Canyon Marketplace at Smith&apos;s (9710 W Skye Canyon Park Dr) anchors northwest
            grocery runs and includes Starbucks plus sit-down options listed on{" "}
            <a
              href="https://skyecanyon.com/amenities/shopping/"
              target="_blank"
              rel="noopener noreferrer"
            >
              skyecanyon.com
            </a>{" "}
            such as Cafe Rio, Omelette Cafe, and Skye Tavern—typically a short drive from{" "}
            {c.name}.
          </p>

          <h2>Parks &amp; recreation</h2>
          <p>
            Skye Canyon Park (10111 W Skye Canyon Park Dr) spans 15 acres with trails, sports
            courts, splash pad, and resident access to Skye Fitness and the junior Olympic pool.
            {c.name} adds its own community pool, splash pad, and fitness center for village
            residents.
          </p>

          <h2>Golf</h2>
          <p>
            Skye Canyon is not a golf-course community; public courses such as Badlands Golf Course
            (9119 Alta Dr) are a longer drive toward the west side of the valley for weekend
            outings.
          </p>

          <h2>Healthcare</h2>
          <p>
            Centennial Hills Hospital Medical Center (6900 N Durango Dr) and Dignity Health St.
            Rose North Durango (6675 N Durango Dr) provide emergency and inpatient care in northwest
            Las Vegas—plan roughly 15–20 minutes from Skye Canyon in typical traffic
            (approximate).
          </p>

          <h2>Shopping &amp; errands</h2>
          <p>
            Smith&apos;s Marketplace covers weekly grocery, pharmacy, apparel, and home goods at
            Skye Canyon Marketplace. Additional retail spreads along North Durango Drive and US-95
            toward Centennial Hills.
          </p>

          <h2>Schools</h2>
          <p>{c.schoolsNote}</p>

          <h2>Commute &amp; drive times (approximate)</h2>
          <ul>
            {MESA_NEARBY_COMMUTE_NOTES.map((row) => (
              <li key={row.destination}>
                <strong>{row.destination}:</strong> {row.note}
              </li>
            ))}
          </ul>
        </div>

        <section className="bg-white py-16 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Verified places list</h2>
            <MesaAmenityStaticList showAllCategories />
          </div>
        </section>

        <section className="py-16 bg-slate-50" aria-labelledby="nearby-faq-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="nearby-faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
              Nearby amenities FAQ
            </h2>
            <dl className="space-y-8">
              {MESA_NEARBY_AMENITIES_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-slate-700 aeo-lead-answer">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Tour {c.name} with Dr. Jan Duffy</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Buyer and seller representation for {c.name} and Skye Canyon ({c.zip}). License{" "}
              {agentInfo.license} · {agentInfo.brokerage}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden />
                Call {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-md font-bold text-lg"
              >
                Schedule a tour
              </Link>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-white/80 hover:bg-blue-700 px-8 py-4 rounded-md font-bold text-lg"
              >
                Search Skye Canyon homes
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
