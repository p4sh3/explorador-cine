"use client";

type CatalogErrorProps = {
  message: string;
  onRetry: () => void;
};

export function CatalogError({ message, onRetry }: CatalogErrorProps) {
  return (
    <div
      className="rounded-2xl border border-red-400/20 bg-red-400/5 px-6 py-8 text-center"
      role="alert"
    >
      <h2 className="text-base font-semibold text-white">
        No se pudo cargar el catálogo
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-300">
        {message}
      </p>
      <button
        className="mt-5 min-h-10 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition hover:border-amber-400 hover:text-amber-300"
        onClick={onRetry}
        type="button"
      >
        Reintentar
      </button>
    </div>
  );
}
