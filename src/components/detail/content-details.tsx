"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CatalogError } from "@/components/catalog/catalog-error";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { fetchDetails } from "@/lib/tmdb/browser-client";
import type { MediaType, TmdbDetails } from "@/lib/tmdb/types";

type ContentDetailsProps = {
  id: number;
  mediaType: MediaType;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w780";

export function ContentDetails({ id, mediaType }: ContentDetailsProps) {
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${mediaType}:${id}:${attempt}`;
  const [resource, setResource] = useState<{
    key: string;
    details: TmdbDetails | null;
    error: string | null;
  } | null>(null);
  const loading = resource?.key !== requestKey;
  const details = resource?.key === requestKey ? resource.details : null;
  const error = resource?.key === requestKey ? resource.error : null;

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    fetchDetails(mediaType, id, controller.signal)
      .then((nextDetails) =>
        setResource({
          key: requestKey,
          details: nextDetails,
          error: null,
        }),
      )
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setResource({
          key: requestKey,
          details: null,
          error: cause instanceof Error ? cause.message : "Error desconocido.",
        });
      });

    return () => controller.abort();
  }, [id, mediaType, attempt, requestKey]);

  if (loading) {
    return (
      <main
        aria-busy="true"
        className="mx-auto w-full max-w-7xl flex-1 animate-pulse px-6 py-14 sm:px-10 sm:py-20 lg:px-12"
      >
        <div className="grid gap-8 md:grid-cols-[minmax(220px,320px)_1fr]">
          <div className="aspect-[2/3] rounded-2xl bg-white/10" />
          <div>
            <div className="h-10 max-w-xl rounded bg-white/10" />
            <div className="mt-6 h-5 max-w-sm rounded bg-white/10" />
            <div className="mt-10 h-24 rounded bg-white/10" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !details) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
        <CatalogError
          message={error ?? "No se encontró información para este título."}
          onRetry={retry}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
      <Link
        className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        href="/buscar"
      >
        ← Volver a explorar
      </Link>
      <article className="mt-7 grid gap-8 md:grid-cols-[minmax(220px,320px)_1fr] md:gap-12">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 md:mx-0">
          {details.posterPath ? (
            <Image
              alt={`Póster de ${details.title}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 320px"
              src={`${imageBaseUrl}${details.posterPath}`}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-zinc-500">
              Póster no disponible
            </div>
          )}
        </div>
        <div className="py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            {mediaType === "movie" ? "Película" : "Serie"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {details.title}
          </h1>
          <div className="mt-4">
            <FavoriteButton content={details} />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
            {details.releaseDate && (
              <span>{details.releaseDate.slice(0, 4)}</span>
            )}
            {details.voteAverage > 0 && (
              <span className="text-amber-400">
                ★ {details.voteAverage.toFixed(1)} / 10
              </span>
            )}
            {details.runtime && <span>{details.runtime} min</span>}
            {details.numberOfSeasons && (
              <span>
                {details.numberOfSeasons}{" "}
                {details.numberOfSeasons === 1 ? "temporada" : "temporadas"}
              </span>
            )}
          </div>
          {details.genres.length > 0 && (
            <ul aria-label="Géneros" className="mt-5 flex flex-wrap gap-2">
              {details.genres.map((genre) => (
                <li
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                  key={genre.id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
          <section className="mt-9">
            <h2 className="text-lg font-semibold text-white">Sinopsis</h2>
            <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-zinc-300">
              {details.overview || "No hay una sinopsis disponible en español."}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
