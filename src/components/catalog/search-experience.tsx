"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CatalogError } from "@/components/catalog/catalog-error";
import { ContentGrid } from "@/components/catalog/content-grid";
import { ContentSkeleton } from "@/components/catalog/content-skeleton";
import {
  fetchContentList,
  fetchGenres,
} from "@/lib/tmdb/browser-client";
import type { MediaType, TmdbContent, TmdbGenre } from "@/lib/tmdb/types";

type SearchExperienceProps = {
  initialQuery: string;
  initialType: MediaType;
};

export function SearchExperience({
  initialQuery,
  initialType,
}: SearchExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [mediaType, setMediaType] = useState(initialType);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [resource, setResource] = useState<{
    key: string;
    items: TmdbContent[];
    error: string | null;
  } | null>(null);
  const [genreResource, setGenreResource] = useState<{
    mediaType: MediaType;
    genres: TmdbGenre[];
    error: string | null;
  } | null>(null);
  const requestKey = `${mediaType}:${submittedQuery}:${attempt}`;
  const loading = resource?.key !== requestKey;
  const error =
    formError ??
    (resource?.key === requestKey ? resource.error : null);
  const genres =
    genreResource?.mediaType === mediaType ? genreResource.genres : [];
  const genreError =
    genreResource?.mediaType === mediaType ? genreResource.error : null;

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    fetchContentList(mediaType, submittedQuery, controller.signal)
      .then((page) =>
        setResource({ key: requestKey, items: page.results, error: null }),
      )
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setResource({
          key: requestKey,
          items: [],
          error: cause instanceof Error ? cause.message : "Error desconocido.",
        });
      });

    return () => controller.abort();
  }, [mediaType, submittedQuery, attempt, requestKey]);

  useEffect(() => {
    const controller = new AbortController();

    fetchGenres(mediaType, controller.signal)
      .then(({ genres: nextGenres }) =>
        setGenreResource({ mediaType, genres: nextGenres, error: null }),
      )
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setGenreResource({
          mediaType,
          genres: [],
          error:
            cause instanceof Error
              ? cause.message
              : "No se pudieron cargar los géneros.",
        });
      });

    return () => controller.abort();
  }, [mediaType]);

  const visibleItems = useMemo(
    () => {
      const items = resource?.key === requestKey ? resource.items : [];
      return selectedGenre
        ? items.filter((item) => item.genreIds.includes(Number(selectedGenre)))
        : items;
    },
    [resource, requestKey, selectedGenre],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (normalizedQuery && normalizedQuery.length < 2) {
      setFormError("Escribe al menos 2 caracteres para buscar.");
      return;
    }

    setFormError(null);
    setSubmittedQuery(normalizedQuery);
  }

  return (
    <>
      <form
        className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[1fr_auto_auto_auto] sm:p-5"
        onSubmit={handleSubmit}
        role="search"
      >
        <label className="sr-only" htmlFor="query">
          Nombre de película o serie
        </label>
        <input
          autoComplete="off"
          className="min-h-12 min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-400"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej. El viaje de Chihiro"
          type="search"
          value={query}
          id="query"
        />
        <label className="sr-only" htmlFor="type">
          Tipo de contenido
        </label>
        <select
          className="min-h-12 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-zinc-200 outline-none focus:border-amber-400"
          onChange={(event) => {
            setMediaType(event.target.value as MediaType);
            setSelectedGenre("");
          }}
          value={mediaType}
          id="type"
        >
          <option value="movie">Películas</option>
          <option value="tv">Series</option>
        </select>
        <label className="sr-only" htmlFor="genre">
          Filtrar por género
        </label>
        <select
          className="min-h-12 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-zinc-200 outline-none focus:border-amber-400 disabled:opacity-60"
          disabled={genres.length === 0}
          onChange={(event) => setSelectedGenre(event.target.value)}
          value={selectedGenre}
          id="genre"
        >
          <option value="">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button
          className="min-h-12 rounded-xl bg-amber-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          type="submit"
        >
          Buscar
        </button>
      </form>

      {genreError && (
        <p className="mt-3 text-sm text-amber-200" role="status">
          No se pudo cargar el filtro de géneros: {genreError}
        </p>
      )}

      <section aria-live="polite" className="mt-10">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            {submittedQuery
              ? `Resultados para “${submittedQuery}”`
              : `Tendencias en ${mediaType === "movie" ? "películas" : "series"}`}
          </h2>
          {selectedGenre && !loading && !error && (
            <p className="mt-1 text-sm text-zinc-400">
              {visibleItems.length} resultados con este género.
            </p>
          )}
        </div>
        {loading ? (
          <ContentSkeleton />
        ) : error ? (
          <CatalogError message={error} onRetry={retry} />
        ) : (
          <ContentGrid items={visibleItems} />
        )}
      </section>
    </>
  );
}
