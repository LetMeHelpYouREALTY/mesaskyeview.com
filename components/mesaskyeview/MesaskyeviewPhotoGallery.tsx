import Image from "next/image";
import Link from "next/link";
import {
  mesaGalleryPhotos,
  type MesaPhoto,
} from "@/lib/mesaskyeview-photos";
import { mesaAtSkyeviewCommunity, MESA_HOME_BRAND } from "@/lib/mesaskyeview-brand";

type MesaskyeviewPhotoGalleryProps = {
  title?: string;
  description?: string;
  photos?: MesaPhoto[];
  showCta?: boolean;
};

export default function MesaskyeviewPhotoGallery({
  title = `Life at ${mesaAtSkyeviewCommunity.name}`,
  description = `Photos of ${mesaAtSkyeviewCommunity.name} in ${mesaAtSkyeviewCommunity.masterPlan} (${mesaAtSkyeviewCommunity.zip})—one-story new homes, Skye Canyon amenities, and the Northwest Las Vegas lifestyle near Kyle Canyon.`,
  photos = mesaGalleryPhotos,
  showCta = true,
}: MesaskyeviewPhotoGalleryProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50" aria-labelledby="mesa-gallery-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            id="mesa-gallery-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-slate-600">{description}</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto list-none p-0 m-0">
          {photos.map((photo) => (
            <li key={photo.src} className="group">
              <figure className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    quality={65}
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                    fetchPriority="low"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-slate-600 border-t border-slate-100">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {showCta && (
          <p className="text-center text-sm text-slate-500 mt-8 max-w-2xl mx-auto">
            Imagery represents {MESA_HOME_BRAND} at {mesaAtSkyeviewCommunity.name},{" "}
            {mesaAtSkyeviewCommunity.salesOfficeAddress}. For tours and current inventory,{" "}
            <Link href="/contact" className="text-blue-600 font-medium hover:underline">
              contact Dr. Jan Duffy
            </Link>{" "}
            or explore{" "}
            <Link href="/new-construction" className="text-blue-600 font-medium hover:underline">
              new construction
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
