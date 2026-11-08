export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Cargando página"
      className="mx-auto w-full max-w-7xl flex-1 animate-pulse px-6 py-14 sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="h-3 w-36 rounded bg-white/10" />
      <div className="mt-5 h-10 w-64 rounded bg-white/10" />
      <div className="mt-4 h-5 max-w-lg rounded bg-white/10" />
      <div className="mt-10 h-48 rounded-2xl border border-white/10 bg-white/[0.03]" />
    </main>
  );
}
