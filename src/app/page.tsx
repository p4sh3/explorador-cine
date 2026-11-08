export default function Home() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-zinc-950 px-6 py-20 text-zinc-50">
      <section className="w-full max-w-3xl text-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
          Proyecto en preparación
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Explorador de Cine
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
          Un espacio para descubrir películas y series, explorar sus detalles y
          guardar tus favoritas.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left sm:p-8">
          <h2 className="text-lg font-semibold">Etapa 1 completada</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            La base de Next.js, TypeScript y Tailwind está lista. En las
            próximas etapas se incorporarán las rutas, la búsqueda y los datos
            de películas y series.
          </p>
        </div>
      </section>
    </main>
  );
}
