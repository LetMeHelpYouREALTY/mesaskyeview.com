"use client";

import CloudflareHeroBackground from "@/components/shared/CloudflareHeroBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteHeroRotations } from "@/lib/site-images";
import { getRealscoutSimpleSearchHtml } from "@/lib/realscout-config";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CloudflareHeroBackground
        images={siteHeroRotations}
        overlayClassName="absolute inset-0 bg-black/40"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Dream Home in
          <br />
          <span className="text-blue-400">Las Vegas & Henderson</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Expert real estate services with personalized attention. Your trusted partner for buying,
          selling, and investing in Southern Nevada.
        </p>

        {/* RealScout Search Widget */}
        <div className="realscout-wrapper mb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: getRealscoutSimpleSearchHtml(),
            }}
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since 2008</span>
            <span>Serving Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">4.9★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${
          prefersReducedMotion ? '' : 'animate-bounce'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
