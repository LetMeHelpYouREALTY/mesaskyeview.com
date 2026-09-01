"use client";

import { useEffect } from "react";
import "./types";
import { CALENDLY_SHOWING_URL } from "@/lib/calendly-url";

interface CalendlyBadgeProps {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

/**
 * Floating Calendly badge. widget.js loads once from DomainThirdPartyScripts
 * (id="calendly-widget-js"). Do not add another Script tag here.
 */
export default function CalendlyBadge({
  url = CALENDLY_SHOWING_URL,
  text = "Schedule a tour",
  color = "#152238",
  textColor = "#ffffff",
  branding = false,
}: CalendlyBadgeProps) {
  useEffect(() => {
    const initBadge = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url,
          text,
          color,
          textColor,
          branding,
        });
        return true;
      }
      return false;
    };

    if (initBadge()) return undefined;

    const interval = window.setInterval(() => {
      if (initBadge()) window.clearInterval(interval);
    }, 150);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 12000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [url, text, color, textColor, branding]);

  return (
    <link
      href="https://assets.calendly.com/assets/external/widget.css"
      rel="stylesheet"
    />
  );
}
