import Link from "next/link";
import { TrendingSection } from "@/components/catalog/trending-section";

const contentTypes = [
  {
    eyebrow: "LARGOMETRAJES",
    title: "Películas",
    description:
      "Encuentra tu próxima historia favorita entre películas de todos los géneros.",
    href: "/buscar?tipo=peliculas",
    number: "01",
  },
  {
    eyebrow: "EN CAPÍTULOS",
    title: "Series",
    description:
      "Explora series para descubrir mundos a los que siempre querrás volver.",
    href: "/buscar?tipo=series",
    number: "02",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(180,83,9,0.2),transparent_45%),linear-gradient(135deg,#11100f_0%,#09090b_65%)]"
        />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Tu próxima historia empieza aquí
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
            ¿Qué te gustaría
            <br />
            <span className="text-amber-400">ver hoy?</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Explora películas y series, conoce cada historia y reúne tus
            favoritas en un solo lugar.
          </p>
          <Link
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            href="/buscar"
          >
            Explorar títulos
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
        <TrendingSection />
      </section>

      <section
        aria-labelledby="explora-heading"
        className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-20 lg:px-12"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Empieza a descubrir
            </p>
            <h2
              className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              id="explora-heading"
            >
              Explora por formato
            </h2>
          </div>
          <Link
            className="hidden text-sm font-medium text-amber-400 transition hover:text-amber-300 sm:inline-flex"
            href="/buscar"
          >
            Ir a búsqueda <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {contentTypes.map((content) => (
            <Link
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-400/40 hover:bg-white/[0.06] sm:p-8"
              href={content.href}
              key={content.number}
            >
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-400">
                  {content.eyebrow}
                </p>
                <span className="font-mono text-sm text-zinc-600">
                  {content.number}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-white">
                {content.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                {content.description}
              </p>
              <span className="mt-7 inline-flex text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
                Explorar <span aria-hidden="true" className="ml-2">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
