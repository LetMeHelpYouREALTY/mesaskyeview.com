import Link from "next/link";
import { MESA_EXPLORE_PAGES } from "@/lib/mesa-site-pages";

export default function MesaExploreLinks() {
  return (
    <section className="py-16 bg-white border-y border-slate-100" aria-labelledby="mesa-explore-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 id="mesa-explore-heading" className="text-3xl font-bold text-slate-900 mb-3">
            Explore Mesa at Skyeview
          </h2>
          <p className="text-slate-600">
            Dedicated guides for buyers, sellers, floor plans, amenities, and ZIP 89166—built for
            hyperlocal search and AI answers.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto list-none p-0 m-0">
          {MESA_EXPLORE_PAGES.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="block h-full rounded-lg border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">
                  {page.title}
                </h3>
                <p className="text-sm text-slate-600">{page.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
