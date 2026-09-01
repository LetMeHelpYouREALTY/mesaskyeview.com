import Image from "next/image";
import { headers } from "next/headers";
import { GLOBAL_HERO } from "@/lib/global-hero";
import DrJanDuffyAvatar from "@/components/agent/DrJanDuffyAvatar";

/**
 * Compact full-width hero band on inner pages.
 * Homepage keeps the full-bleed Mesa hero so the two bands do not stack.
 */
export default async function GlobalHeroBanner() {
  const pathname = (await headers()).get("x-pathname") || "/";
  if (pathname === "/") return null;

  const { src, alt, tagline, phoneDisplay, phoneTel } = GLOBAL_HERO;

  return (
    <aside
      className="relative w-full overflow-hidden border-b border-slate-800/40"
      aria-label={tagline}
    >
      <div className="relative h-[200px] sm:h-[240px] md:h-[280px] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/25"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full items-end">
          <div className="container mx-auto px-4 pb-5 md:pb-6 flex items-end gap-4">
            <DrJanDuffyAvatar size={64} className="shadow-lg ring-2 ring-amber-400/80" priority />
            <div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] max-w-3xl text-balance">
              {tagline}
            </p>
            {phoneDisplay && phoneTel && (
              <a
                href={phoneTel}
                className="mt-2 inline-block text-sm sm:text-base font-medium text-blue-100 hover:text-white underline-offset-2 hover:underline [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]"
                aria-label={`Call Dr. Jan Duffy at ${phoneDisplay}`}
              >
                Call or text {phoneDisplay}
              </a>
            )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
