import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        No encontramos esta página
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Puede que el enlace no exista o haya cambiado.
      </p>
      <Link
        className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
        href="/"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
