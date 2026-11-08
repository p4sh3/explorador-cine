"use client";

import Link from "next/link";
import { ContentCard } from "@/components/catalog/content-card";
import { useFavorites } from "@/components/favorites/favorites-provider";

export function FavoritesList() {
  const { error, favorites, ready } = useFavorites();

  if (!ready) {
    return (
      <div
        aria-busy="true"
        aria-label="Cargando favoritos"
        className="h-40 animate-pulse rounded-2xl bg-white/5"
      />
    );
  }

  return (
    <>
      {error && (
        <p
          className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200"
          role="alert"
        >
          {error}
        </p>
      )}
      {favorites.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
          <h2 className="text-lg font-medium text-white">
            Aún no tienes favoritos
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-400">
            Guarda películas o series con el botón de favoritos para
            encontrarlas aquí. Tu lista se conserva en este navegador.
          </p>
          <Link
            className="mt-6 inline-flex min-h-10 items-center rounded-full bg-amber-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
            href="/buscar"
          >
            Explorar títulos
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 xl:grid-cols-6">
          {favorites.map((favorite) => (
            <ContentCard
              content={favorite}
              key={`${favorite.mediaType}-${favorite.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
