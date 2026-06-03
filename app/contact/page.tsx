import Navbar from "@/components/layouts/Navbar";
import { Phone, Mail, CheckCircle, Star, Users, Shield, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getContactEmail } from "@/lib/domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  isMesaskyeviewDomain,
  mesaAtSkyeviewCommunity,
  MESA_HOME_BRAND,
  MESA_SITE_BRAND,
} from "@/lib/mesaskyeview-brand";
import {
  generateMesaContactPageSchema,
  getMesaCommunityDirectionsUrl,
  getMesaCommunityMapsEmbedUrl,
} from "@/lib/mesa-at-skyeview-schema";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  return createPageMetadata(config, {
    title: `Contact Dr. Jan Duffy | ${config.neighborhood} | BHHS Nevada`,
    description:
      "Contact Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties. Schedule an appointment, get directions, or call (702) 500-1942.",
    pathname: "/contact",
    keywords: [
      "contact real estate agent Las Vegas",
      "Berkshire Hathaway contact",
      "Dr. Jan Duffy phone",
      `${config.neighborhood} realtor contact`,
      "schedule real estate appointment",
    ],
  });
}

export default async function ContactPage() {
  const config = await getPageDomainConfig();
  const contactEmail = getContactEmail(config);
  const isMesa = isMesaskyeviewDomain(config);

  const contactSchema = isMesa
    ? generateMesaContactPageSchema(config)
    : {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        mainEntity: {
          "@type": "RealEstateAgent",
          name: `Dr. Jan Duffy - ${config.neighborhood} | Berkshire Hathaway HomeServices Nevada Properties`,
          telephone: "+17025001942",
          email: contactEmail,
          address: {
            "@type": "PostalAddress",
            streetAddress: "9406 W Lake Mead Blvd, Suite 100",
            addressLocality: "Las Vegas",
            addressRegion: "NV",
            postalCode: "89134",
            addressCountry: "US",
          },
        },
      };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {isMesa ? MESA_HOME_BRAND : "Berkshire Hathaway HomeServices Nevada Properties"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {isMesa ? `Contact Dr. Jan Duffy | ${MESA_SITE_BRAND}` : "Contact Dr. Jan Duffy"}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {isMesa
                ? `Questions about ${mesaAtSkyeviewCommunity.name}, tours near ${mesaAtSkyeviewCommunity.street}, or buying and selling in Skye Canyon? Call, email, or schedule below.`
                : `Questions about ${config.neighborhood} or Las Vegas real estate? Call, email, or use the scheduling calendar below this page.`}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#schedule-appointment"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Schedule Online
              </a>
              {isMesa ? (
                <a
                  href="#mesa-community"
                  className="inline-flex items-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-lg font-semibold"
                >
                  Mesa at Skyeview Map
                </a>
              ) : null}
              <a
                href="#office"
                className="inline-flex items-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-lg font-semibold"
              >
                {isMesa ? "BHHS Office & Map" : "Office & Map"}
              </a>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Get In Touch</h2>
            <p className="text-slate-700 mb-8 text-center">
              Expert guidance backed by <strong>Berkshire Hathaway HomeServices</strong>. Serving Las
              Vegas since 2008 with $127M+ in closed transactions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start bg-slate-50 rounded-lg p-4">
                <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone (Call or Text)</h3>
                  <a
                    href="tel:+17025001942"
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                  >
                    (702) 500-1942
                  </a>
                </div>
              </div>
              <div className="flex items-start bg-slate-50 rounded-lg p-4">
                <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Why Contact Berkshire Hathaway HomeServices?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">
                    <strong className="text-white">Trusted Brand:</strong> Backed by Berkshire
                    Hathaway Inc.
                  </p>
                </div>
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">
                    <strong className="text-white">Proven Results:</strong> $127M+ closed in Las
                    Vegas.
                  </p>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">
                    <strong className="text-white">Global Network:</strong> 50,000+ agents
                    worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isMesa && (
            <section
              id="mesa-community"
              className="max-w-5xl mx-auto mt-16 scroll-mt-28"
              aria-labelledby="mesa-community-heading"
            >
              <div className="text-center mb-8">
                <h2
                  id="mesa-community-heading"
                  className="text-3xl font-bold text-slate-900 mb-3"
                >
                  Mesa at Skyeview — Community Location
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Tour and directions for {mesaAtSkyeviewCommunity.name} in {mesaAtSkyeviewCommunity.masterPlan}.
                  Dr. Jan coordinates showings and new-home registration—this is the community address in{" "}
                  {mesaAtSkyeviewCommunity.zip}, not the BHHS brokerage office below.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start bg-slate-50 rounded-lg p-5">
                    <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" aria-hidden />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Community NAP</h3>
                      <address className="not-italic text-slate-700">
                        {mesaAtSkyeviewCommunity.salesOfficeAddress}
                      </address>
                      <p className="text-slate-500 text-sm mt-2">
                        {mesaAtSkyeviewCommunity.masterPlan} · Northwest Las Vegas
                      </p>
                    </div>
                  </div>
                  <a
                    href={getMesaCommunityDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Navigation className="h-5 w-5 mr-2" aria-hidden />
                    Get Directions
                  </a>
                  <a
                    href="tel:+17025001942"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors ml-0 sm:ml-3"
                  >
                    <Phone className="h-5 w-5 mr-2" aria-hidden />
                    Call Before You Tour
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm min-h-[280px]">
                  <iframe
                    title={`Map of ${mesaAtSkyeviewCommunity.name} at ${mesaAtSkyeviewCommunity.salesOfficeAddress}`}
                    src={getMesaCommunityMapsEmbedUrl()}
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
          )}

          {/* Service Areas Section */}
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Areas We Serve
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Dr. Jan Duffy provides expert real estate services throughout the Las Vegas Valley. 
              Whether you're buying, selling, or investing in any of these communities, contact us 
              for personalized guidance backed by Berkshire Hathaway HomeServices.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Las Vegas",
                "Henderson",
                "Summerlin",
                "Green Valley",
                "North Las Vegas",
                "Southern Highlands",
                "Skye Canyon",
                "Centennial Hills",
                "The Ridges",
                "Inspirada",
                "Mountains Edge",
                "Spring Valley",
              ].map((area) => (
                <div key={area} className="bg-slate-50 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                  <span className="text-slate-700 font-medium text-sm">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Contact Options */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Prefer to Reach Out Directly?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="tel:+17025001942"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors"
              >
                <Phone className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Call Now</div>
                  <div className="text-blue-100">(702) 500-1942</div>
                </div>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center justify-center bg-slate-700 hover:bg-slate-800 text-white p-6 rounded-xl transition-colors"
              >
                <Mail className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Send Email</div>
                  <div className="text-slate-300">{contactEmail}</div>
                </div>
              </a>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What should I expect during my first consultation?",
                  a: "Your consultation is a no-pressure conversation about your real estate goals. We'll discuss your timeline, budget, preferences, and answer any questions you have about the Las Vegas market. Whether you're buying, selling, or exploring options, I'll provide honest guidance tailored to your situation.",
                },
                {
                  q: "Do I need to be pre-approved before scheduling a showing?",
                  a: "For buyers, having a pre-approval letter strengthens your position, but it's not required for an initial consultation. I can connect you with trusted local lenders during our first meeting if you haven't started the financing process yet.",
                },
                {
                  q: "How quickly can you respond to inquiries?",
                  a: "I typically respond to calls, texts, and emails within 2 hours during business hours (9am-6pm daily). For urgent matters, calling or texting (702) 500-1942 is the fastest way to reach me.",
                },
                {
                  q: "Do you charge for consultations?",
                  a: "No. Initial consultations are always free and without obligation. Whether you're ready to move forward or just exploring your options, there's never any pressure.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
</>
  );
}
