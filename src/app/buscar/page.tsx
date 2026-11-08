import type { Metadata } from "next";

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
  const type = params.tipo === "series" ? "series" : "peliculas";

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

      <form
        action="/buscar"
        className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[1fr_auto_auto] sm:p-5"
        role="search"
      >
        <label className="sr-only" htmlFor="query">
          Nombre de película o serie
        </label>
        <input
          autoComplete="off"
          className="min-h-12 min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-400"
          defaultValue={query}
          id="query"
          name="q"
          placeholder="Ej. El viaje de Chihiro"
          type="search"
        />
        <label className="sr-only" htmlFor="type">
          Tipo de contenido
        </label>
        <select
          className="min-h-12 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-zinc-200 outline-none focus:border-amber-400"
          defaultValue={type}
          id="type"
          name="tipo"
        >
          <option value="peliculas">Películas</option>
          <option value="series">Series</option>
        </select>
        <button
          className="min-h-12 rounded-xl bg-amber-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          type="submit"
        >
          Buscar
        </button>
      </form>

      <section
        aria-live="polite"
        className="mt-8 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center"
      >
        <h2 className="text-lg font-medium text-white">
          {query ? `Búsqueda: “${query}”` : "Tu próxima historia te espera"}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-400">
          La búsqueda está preparada. Los resultados aparecerán cuando
          conectemos la fuente de datos en la siguiente etapa.
        </p>
      </section>
    </main>
  );
}
