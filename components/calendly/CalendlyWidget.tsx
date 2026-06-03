"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

export default function CalendlyWidget({
  url = "https://calendly.com/drjanduffy/showing",
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initWidget = () => {
      if (typeof window !== "undefined" && (window as any).Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = "";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "calendly-inline-widget";
        widgetDiv.setAttribute("data-url", url);
        widgetDiv.style.minWidth = minWidth;
        widgetDiv.style.height = height;
        widgetDiv.style.width = "100%";

        widgetRef.current.appendChild(widgetDiv);

        (window as any).Calendly.initInlineWidget({
          url: url,
          parentElement: widgetDiv,
        });
      }
    };

    if ((window as any).Calendly) {
      initWidget();
    } else {
      const checkCalendly = setInterval(() => {
        if ((window as any).Calendly) {
          clearInterval(checkCalendly);
          initWidget();
        }
      }, 100);

      setTimeout(() => clearInterval(checkCalendly), 10000);
    }
  }, [url, minWidth, height]);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div ref={widgetRef} style={{ minWidth, height, width: "100%" }} />
    </>
  );
}

