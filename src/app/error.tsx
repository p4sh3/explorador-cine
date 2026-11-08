"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        Algo salió mal
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        No pudimos cargar esta página
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
        Intenta nuevamente. Si el problema continúa, vuelve más tarde.
      </p>
      <button
        className="mt-7 min-h-11 rounded-full bg-amber-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        onClick={reset}
        type="button"
      >
        Reintentar
      </button>
    </main>
  );
}
