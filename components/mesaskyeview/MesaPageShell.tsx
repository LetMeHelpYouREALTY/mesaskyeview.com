import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import {
  mesaAtSkyeviewCommunity,
  MESA_HOME_BRAND,
} from "@/lib/mesaskyeview-brand";
import {
  getMesaCommunityDirectionsUrl,
  getMesaCommunityMapsEmbedUrl,
} from "@/lib/mesa-at-skyeview-schema";
import MesaskyeviewPhotoGallery from "@/components/mesaskyeview/MesaskyeviewPhotoGallery";

export type MesaBreadcrumb = { name: string; href?: string };

type MesaPageShellProps = {
  breadcrumbs: MesaBreadcrumb[];
  title: string;
  intro: string;
  children: React.ReactNode;
  faqSchema?: Record<string, unknown>;
  showGallery?: boolean;
  showMap?: boolean;
};

export default function MesaPageShell({
  breadcrumbs,
  title,
  intro,
  children,
  faqSchema,
  showGallery = false,
  showMap = true,
}: MesaPageShellProps) {
  const directionsUrl = getMesaCommunityDirectionsUrl();

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <nav className="max-w-6xl mx-auto mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.name}>
                {i > 0 && " / "}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-600">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-slate-900">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <header className="max-w-4xl mx-auto text-center mb-12">
            <p className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {MESA_HOME_BRAND}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{title}</h1>
            <p className="text-xl text-slate-600">{intro}</p>
          </header>

          <div className="max-w-4xl mx-auto prose prose-slate prose-lg mb-12">{children}</div>

          {showMap && (
            <section className="max-w-4xl mx-auto mb-12 rounded-xl border border-slate-200 overflow-hidden">
              <h2 className="text-lg font-bold text-slate-900 px-4 pt-4">
                {mesaAtSkyeviewCommunity.name} — map & directions
              </h2>
              <address className="not-italic text-slate-700 px-4 pb-2 text-sm">
                {mesaAtSkyeviewCommunity.salesOfficeAddress}
              </address>
              <div className="aspect-video w-full">
                <iframe
                  title={`Map of ${mesaAtSkyeviewCommunity.name}`}
                  src={getMesaCommunityMapsEmbedUrl()}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-wrap gap-3 p-4 bg-slate-50">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Get directions
                </a>
                <a
                  href={agentInfo.phoneTel}
                  className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call {agentInfo.phoneFormatted}
                </a>
              </div>
            </section>
          )}

          {showGallery && <MesaskyeviewPhotoGallery />}

          <section className="max-w-4xl mx-auto bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Work with Dr. Jan Duffy</h2>
            <p className="text-blue-100 mb-6">
              Buyer and seller representation for {mesaAtSkyeviewCommunity.name} and Skye Canyon (
              {mesaAtSkyeviewCommunity.zip}). License S.0197614.LLC · Berkshire Hathaway HomeServices
              Nevada Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/listings"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-blue-50"
              >
                Search homes
              </Link>
              <Link
                href="/contact"
                className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-md font-bold"
              >
                Contact Dr. Jan
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
