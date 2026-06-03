import { mesaExtractableFacts } from "@/lib/mesa-aeo-content";

/** Visible fact block for LLM/voice extraction (paired with SpeakableSpecification in JSON-LD). */
export default function MesaExtractableFacts() {
  return (
    <section
      id="mesa-extractable-facts"
      className="py-10 bg-slate-50 border-y border-slate-200"
      aria-labelledby="mesa-facts-heading"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="mesa-facts-heading" className="text-xl font-bold text-slate-900 mb-4">
          Mesa at Skyeview at a glance
        </h2>
        <ul className="space-y-3 text-slate-700 text-base leading-relaxed list-disc pl-5">
          {mesaExtractableFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-500">
          MLS pricing and availability change—contact Dr. Jan for current inventory in ZIP 89166.
        </p>
      </div>
    </section>
  );
}
