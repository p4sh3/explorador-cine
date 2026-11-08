import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalle de película | Explorador de Cine",
};

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        Película
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Detalle de película
      </h1>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p className="text-sm text-zinc-300">Identificador: {id}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          La información de la película se mostrará cuando conectemos la fuente
          de datos.
        </p>
      </section>
    </main>
  );
}
