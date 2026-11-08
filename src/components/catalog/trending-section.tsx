"use client";

import { useCallback, useEffect, useState } from "react";
import { ContentGrid } from "@/components/catalog/content-grid";
import { CatalogError } from "@/components/catalog/catalog-error";
import { ContentSkeleton } from "@/components/catalog/content-skeleton";
import { Pagination } from "@/components/catalog/pagination";
import { fetchTrending } from "@/lib/tmdb/browser-client";
import type { MediaType, TmdbContent } from "@/lib/tmdb/types";

export function TrendingSection() {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [resource, setResource] = useState<{
    key: string;
    page: number;
    totalPages: number;
    items: TmdbContent[];
    error: string | null;
  } | null>(null);
  const requestKey = `${mediaType}:${page}:${attempt}`;
  const loading = resource?.key !== requestKey;

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    fetchTrending(mediaType, page, controller.signal)
      .then((page) =>
        setResource({
          key: requestKey,
          page: page.page,
          totalPages: page.totalPages,
          items: page.results,
          error: null,
        }),
      )
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setResource({
          key: requestKey,
          page,
          totalPages: 1,
          items: [],
          error: cause instanceof Error ? cause.message : "Error desconocido.",
        });
      });

    return () => controller.abort();
  }, [mediaType, page, attempt, requestKey]);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Lo más visto esta semana
          </p>
          <h2
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            id="trending-heading"
          >
            Tendencias
          </h2>
        </div>
        <div
          aria-label="Tipo de tendencia"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1"
          role="group"
        >
          {(["movie", "tv"] as const).map((type) => (
            <button
              aria-pressed={mediaType === type}
              className={`min-h-9 rounded-full px-4 text-xs font-medium transition ${
                mediaType === type
                  ? "bg-amber-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
              key={type}
              onClick={() => {
                setMediaType(type);
                setPage(1);
              }}
              type="button"
            >
              {type === "movie" ? "Películas" : "Series"}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <ContentSkeleton />
      ) : resource?.error ? (
        <CatalogError message={resource.error} onRetry={retry} />
      ) : (
        <>
          <ContentGrid items={resource?.items ?? []} />
          {resource && (
            <Pagination
              onPageChange={setPage}
              page={resource.page}
              totalPages={resource.totalPages}
            />
          )}
        </>
      )}
    </section>
  );
}
