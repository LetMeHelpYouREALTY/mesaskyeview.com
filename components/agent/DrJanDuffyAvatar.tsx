import Image from "next/image";
import { drJanDuffyPhotos } from "@/lib/agent-photos";
import { cn } from "@/lib/utils";

type DrJanDuffyAvatarProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Circular headshot for chrome (nav, footer, heroes) — Cloudflare `/Image/agent1.png`. */
export default function DrJanDuffyAvatar({
  size = 40,
  className,
  priority = false,
}: DrJanDuffyAvatarProps) {
  const photo = drJanDuffyPhotos.headshot;

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={cn("rounded-full object-cover shrink-0 bg-black", className)}
    />
  );
}
