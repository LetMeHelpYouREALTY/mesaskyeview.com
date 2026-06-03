import Image from "next/image";
import {
  drJanDuffyPhotos,
  isExternalAgentPhoto,
  type DrJanPhotoKey,
} from "@/lib/agent-photos";
import { agentInfo } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type DrJanDuffyPhotoProps = {
  variant?: DrJanPhotoKey;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export default function DrJanDuffyPhoto({
  variant = "headshot",
  priority = false,
  className,
  imageClassName = "object-cover object-top",
  sizes = "(max-width: 768px) 100vw, 400px",
}: DrJanDuffyPhotoProps) {
  const photo = drJanDuffyPhotos[variant];
  const external = isExternalAgentPhoto(photo.src);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl bg-slate-100",
        external && "min-h-[12rem]",
        className
      )}
    >
      {external ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={cn("object-cover object-top", imageClassName)}
          priority={priority}
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          className={cn("h-full w-full", imageClassName)}
          priority={priority}
        />
      )}
      <figcaption className="sr-only">
        {agentInfo.name}, {agentInfo.title}, License {agentInfo.license}
      </figcaption>
    </figure>
  );
}
