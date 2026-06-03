import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { agentInfo, officeInfo } from "@/lib/site-config";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getContactEmail } from "@/lib/domain-config";

const GOOGLE_REVIEWS_URL = "https://g.page/r/heyberkshire/review";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir//9406+W+Lake+Mead+Blvd+Suite+100,+Las+Vegas,+NV+89134";
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=9406+W+Lake+Mead+Blvd+Suite+100,+Las+Vegas,+NV+89134&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default async function OfficeSection() {
  const config = await getPageDomainConfig();
  const contactEmail = getContactEmail(config);

  return (
    <section
      id="office"
      className="py-16 md:py-20 bg-white border-t border-slate-200"
      aria-labelledby="office-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="office-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Visit Our Office
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {agentInfo.name}, {agentInfo.title} — serving {config.neighborhood} and the Las Vegas
            Valley from {officeInfo.name}.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-start bg-slate-50 rounded-lg p-4">
              <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Office Address (NAP)</h3>
                <address className="not-italic text-slate-700">
                  {officeInfo.name}
                  <br />
                  {officeInfo.address.street}
                  <br />
                  {officeInfo.address.city}, {officeInfo.address.state} {officeInfo.address.zip}
                </address>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 rounded-lg p-4">
              <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Call or Text</h3>
                <Link
                  href={agentInfo.phoneTel}
                  className="text-xl font-bold text-blue-600 hover:text-blue-700"
                >
                  {agentInfo.phoneFormatted}
                </Link>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 rounded-lg p-4">
              <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                <Link
                  href={`mailto:${contactEmail}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {contactEmail}
                </Link>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 rounded-lg p-4">
              <Clock className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                <p className="text-slate-700">
                  Monday – Friday: 9:00 AM – 6:00 PM
                  <br />
                  Saturday: 10:00 AM – 4:00 PM
                  <br />
                  Sunday: By appointment
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              License {agentInfo.license} · {agentInfo.brokerage}
            </p>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden shadow-md mb-4">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${officeInfo.name} - Office Location`}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Link>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-lg font-medium transition-colors text-sm"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Directions
              </a>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm"
              >
                <Star className="h-4 w-4 mr-2" />
                Google Reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
