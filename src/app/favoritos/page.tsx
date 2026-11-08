import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favoritos | Explorador de Cine",
  description: "Consulta las películas y series que guardaste.",
};

export default function FavoritesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        Tu colección personal
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Favoritos
      </h1>
      <section className="mt-8 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
        <h2 className="text-lg font-medium text-white">
          Tus favoritos aparecerán aquí
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-400">
          En una próxima etapa podrás guardar películas y series para volver a
          encontrarlas fácilmente.
        </p>
      </section>
    </main>
  );
}
