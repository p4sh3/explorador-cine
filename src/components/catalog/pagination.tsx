type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginación de resultados"
      className="mt-10 flex items-center justify-center gap-5"
    >
      <button
        className="min-h-10 rounded-full border border-white/15 px-4 text-sm font-medium text-zinc-200 transition hover:border-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Anterior
      </button>
      <p aria-live="polite" className="text-sm text-zinc-400">
        Página <span className="font-semibold text-white">{page}</span> de{" "}
        {totalPages}
      </p>
      <button
        className="min-h-10 rounded-full border border-white/15 px-4 text-sm font-medium text-zinc-200 transition hover:border-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Siguiente
      </button>
    </nav>
  );
}
