"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { loadRealScoutScript } from "@/lib/load-realscout-script";
import { getRealscoutSimpleSearchHtml } from "@/lib/realscout-config";

type MesaHeroSearchProps = {
  agentEncodedId: string;
};

/** Tap-to-load RealScout search — keeps UMD off the critical LCP path on mesaskyeview. */
export default function MesaHeroSearch({ agentEncodedId }: MesaHeroSearchProps) {
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

  if (!expanded) {
    return (
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          onClick={() => void openSearch()}
          className="inline-flex items-center gap-2 rounded-md bg-white text-slate-900 px-8 py-4 font-bold text-lg shadow-lg hover:bg-blue-50 transition-colors"
        >
          <Search className="h-5 w-5" aria-hidden />
          Search Homes
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 flex justify-center realscout-wrapper min-h-[56px] w-full max-w-xl mx-auto">
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
