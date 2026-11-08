export function ContentSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-label="Cargando títulos"
      aria-busy="true"
      className="grid animate-pulse grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 xl:grid-cols-6"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          <div className="aspect-[2/3] rounded-xl bg-white/10" />
          <div className="mt-3 h-4 rounded bg-white/10" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
