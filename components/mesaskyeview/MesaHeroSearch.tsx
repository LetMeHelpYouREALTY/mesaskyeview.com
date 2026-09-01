"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { loadRealScoutScript } from "@/lib/load-realscout-script";
import { getRealscoutSimpleSearchHtml } from "@/lib/realscout-config";

type MesaHeroSearchProps = {
  agentEncodedId: string;
  align?: "center" | "start";
};

/** Tap-to-load RealScout search — keeps UMD off the critical LCP path on mesaskyeview. */
export default function MesaHeroSearch({ agentEncodedId, align = "center" }: MesaHeroSearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);

  async function openSearch() {
    setExpanded(true);
    try {
      await loadRealScoutScript();
      setReady(true);
    } catch {
      setReady(false);
    }
  }

  const alignClass = align === "start" ? "justify-center lg:justify-start" : "justify-center";

  if (!expanded) {
    return (
      <div className={`mb-2 flex ${alignClass}`}>
        <button
          type="button"
          onClick={() => void openSearch()}
          className="inline-flex items-center gap-2 rounded-sm bg-white text-[#152238] px-8 py-3.5 font-semibold text-base tracking-wide shadow-lg hover:bg-amber-50 transition-colors"
        >
          <Search className="h-5 w-5" aria-hidden />
          Search Homes
        </button>
      </div>
    );
  }

  return (
    <div className={`mb-2 flex ${alignClass} realscout-wrapper min-h-[56px] w-full max-w-xl lg:mx-0 mx-auto`}>
      {ready ? (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: getRealscoutSimpleSearchHtml(agentEncodedId),
          }}
        />
      ) : (
        <p className="text-white/80 text-sm py-4">Loading home search…</p>
      )}
    </div>
  );
}
