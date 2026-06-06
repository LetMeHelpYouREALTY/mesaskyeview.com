"use client";

import { useEffect, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

const STORAGE_KEY = "mesaskyeview_analytics_opt_out";

/**
 * Lightweight US privacy notice (CCPA/CPRA opt-out surface for CA buyers).
 * TODO(jan): confirm CMP choice — replace or augment with a certified CMP if required.
 * Consent Mode v2 is NOT wired here; enable in GTM only when Google Ads runs broadly.
 */
export default function UsPrivacyOptOutBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
      setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  function optOut() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
      sendGTMEvent({ event: "analytics_opt_out" });
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy choices"
      className="fixed bottom-0 inset-x-0 z-[100] border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-3 shadow-lg"
    >
      <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-4xl">
        <p className="text-sm text-slate-700">
          We use analytics to understand how visitors use this site and improve lead
          follow-up. California residents may opt out of analytics cookies.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={optOut}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Opt out
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
