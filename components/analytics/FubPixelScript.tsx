import Script from "next/script";
import {
  getFubPixelId,
  getFubPixelScriptUrl,
  isFubPixelEnabled,
} from "@/lib/fub-pixel-config";

type FubPixelScriptProps = {
  /** afterInteractive on all domains — Home Activity needs early pageview capture */
  strategy?: "afterInteractive" | "lazyOnload";
};

/** Official FUB Widget Tracker loader (widget.followupboss.com). One pixel per team account. */
export default function FubPixelScript({
  strategy = "afterInteractive",
}: FubPixelScriptProps) {
  if (!isFubPixelEnabled()) return null;

  const pixelId = getFubPixelId()!;
  const scriptUrl = getFubPixelScriptUrl(pixelId);

  return (
    <Script id="fub-pixel" strategy={strategy}>{`
      (function(w,t,f){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
      var s=t.createElement('script');s.src='${scriptUrl}';
      s.async=1;t.head.appendChild(s);})(window,document,'fubTracker');
    `}</Script>
  );
}
