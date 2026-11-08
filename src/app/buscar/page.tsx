import type { Metadata } from "next";
import { SearchExperience } from "@/components/catalog/search-experience";

export const metadata: Metadata = {
  title: "Buscar | Explorador de Cine",
  description: "Busca películas y series para encontrar tu próximo título.",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    tipo?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const type = params.tipo === "series" ? "tv" : "movie";

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        Encuentra algo para ver
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Buscar títulos
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
        Busca por nombre y elige si quieres explorar películas o series.
      </p>

      <SearchExperience initialQuery={query} initialType={type} />
    </main>
  );
}
