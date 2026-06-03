"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { DR_JAN_GOOGLE_PRESENCE } from "@/lib/mesa-google-presence";

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  date?: string;
}

// Default reviews
export const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Tom Sanders",
    location: "Las Vegas, NV",
    rating: 5,
    text: "Dr. Duffy made our home buying experience seamless. Her knowledge of the Las Vegas market is unmatched, and she guided us through every step with professionalism and care.",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Vitor Palmer",
    location: "Henderson, NV",
    rating: 5,
    text: "We couldn't be happier with our new home! The entire process was smooth, and Dr. Duffy's attention to detail and negotiation skills saved us thousands. Highly recommend!",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Summerlin, NV",
    rating: 5,
    text: "As first-time homebuyers, we were nervous about the process. Dr. Duffy patiently explained everything and helped us find the perfect home in our budget. Thank you!",
    date: "2025-09-08",
  },
];

/** Visible stats only — not emitted as AggregateRating JSON-LD on owned RealEstateAgent entities. */
export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 500,
  bestRating: 5,
  worstRating: 1,
};

interface ReviewsSectionProps {
  /** Custom reviews to display */
  reviews?: Review[];
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Third-party Google review profile (sameAs target; no self-serving review schema) */
  googleReviewsUrl?: string;
  /** Custom class name */
  className?: string;
  /** Show 4.9 / 500+ line (off on mesaskyeview — use Google CTA instead) */
  showAggregateLine?: boolean;
}

export default function ReviewsSection({
  reviews = defaultReviews,
  title = "What Our Clients Say",
  subtitle = "Real testimonials from satisfied clients across Las Vegas and Henderson",
  googleReviewsUrl = DR_JAN_GOOGLE_PRESENCE.writeReviewUrl,
  className = "",
  showAggregateLine = true,
}: ReviewsSectionProps) {
  return (
    <section
      id="client-testimonials"
      className={`py-16 md:py-24 bg-slate-50 ${className}`}
      aria-labelledby="reviews-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="reviews-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
          {showAggregateLine && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(aggregateRating.ratingValue)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">
              {aggregateRating.ratingValue}
            </span>
            <span className="text-slate-600">
              ({aggregateRating.reviewCount}+ reviews)
            </span>
          </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 text-lg font-semibold" aria-hidden>
                        {review.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{review.name}</h3>
                  <p className="text-sm text-slate-600">{review.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" aria-hidden />
                <p className="text-slate-700 relative z-10 pl-4">{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-3">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            View verified reviews on Google
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden />
          </a>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Star ratings and review counts on Google are the authoritative source. On-site quotes are
            client experiences only and are not marked up as Review schema.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * @deprecated Do not attach to RealEstateAgent / LocalBusiness JSON-LD (Google self-serving policy).
 */
export function getReviewSchemaData(reviews: Review[]) {
  return reviews.map((review) => ({
    author: review.name,
    rating: review.rating,
    text: review.text,
    date: review.date,
  }));
}
