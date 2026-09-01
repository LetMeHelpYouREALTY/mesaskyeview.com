import Link from "next/link";
import { mesaHowToTour } from "@/lib/mesa-aeo-content";
import { agentInfo } from "@/lib/site-config";

/** Visible 3-step tour path — paired with HowTo JSON-LD on the homepage. */
export default function MesaHowToTour() {
  return (
    <section
      id="how-to-tour-mesa"
      className="py-16 bg-white border-y border-slate-100"
      aria-labelledby="how-to-tour-heading"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="how-to-tour-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          {mesaHowToTour.heading}
        </h2>
        <p className="aeo-lead-answer text-lg text-slate-700 mb-8 leading-relaxed">
          {mesaHowToTour.lead}
        </p>
        <ol className="space-y-6">
          {mesaHowToTour.steps.map((step, index) => (
            <li key={step.name} className="flex gap-4">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{step.name}</h3>
                <p className="text-slate-700 text-base leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <a
            href={agentInfo.phoneTel}
            className="text-blue-700 font-semibold underline-offset-2 hover:underline"
          >
            Call {agentInfo.phoneFormatted}
          </a>
          {" · "}
          <Link href="/contact" className="text-blue-700 font-semibold underline-offset-2 hover:underline">
            Schedule on the contact page
          </Link>
        </p>
      </div>
    </section>
  );
}
