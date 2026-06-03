import { Calendar } from "lucide-react";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";

const CALENDLY_URL = "https://calendly.com/drjanduffy/showing";

export default function ScheduleSection() {
  return (
    <section
      id="schedule-appointment"
      className="py-16 md:py-20 bg-slate-50 border-t border-slate-200"
      aria-labelledby="schedule-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-blue-600 text-white p-6 md:p-8 text-center">
            <Calendar className="h-10 w-10 mx-auto mb-3" aria-hidden />
            <h2 id="schedule-heading" className="text-2xl md:text-3xl font-bold mb-2">
              Schedule an Appointment
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto">
              Book a phone consultation, property showing, or in-person meeting at our Las Vegas
              office with Dr. Jan Duffy.
            </p>
          </div>
          <div className="p-4 md:p-6">
            <CalendlyWidget url={CALENDLY_URL} height="650px" />
          </div>
        </div>
      </div>
    </section>
  );
}
