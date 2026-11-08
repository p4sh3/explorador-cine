"use client";

import { useFavorites } from "@/components/favorites/favorites-provider";
import type { TmdbContent } from "@/lib/tmdb/types";

export function FavoriteButton({ content }: { content: TmdbContent }) {
  const { error, isFavorite, ready, toggleFavorite } = useFavorites();
  const favorite = isFavorite(content);

  return (
    <div>
      <button
        aria-label={
          favorite
            ? `Quitar ${content.title} de favoritos`
            : `Guardar ${content.title} en favoritos`
        }
        aria-pressed={favorite}
        className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-xs font-medium text-zinc-300 transition hover:border-amber-400/50 hover:text-amber-300 disabled:cursor-wait disabled:opacity-50"
        disabled={!ready || Boolean(error)}
        onClick={() => toggleFavorite(content)}
        type="button"
      >
        <span aria-hidden="true" className="text-base leading-none">
          {favorite ? "♥" : "♡"}
        </span>
        {favorite ? "En favoritos" : "Guardar"}
      </button>
      {error && (
        <p className="mt-1 text-xs text-red-300" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
