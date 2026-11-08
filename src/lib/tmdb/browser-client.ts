import type {
  MediaType,
  TmdbContent,
  TmdbDetails,
  TmdbGenre,
  TmdbPage,
} from "@/lib/tmdb/types";

async function getJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new Error("No fue posible conectar con la aplicación.");
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error("La aplicación devolvió una respuesta inválida.");
  }

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : "No fue posible completar la solicitud.";
    throw new Error(message);
  }

  return body as T;
}

export function fetchTrending(
  mediaType: MediaType,
  page = 1,
  signal?: AbortSignal,
) {
  return getJson<TmdbPage>(
    `/api/tmdb/trending?type=${mediaType}&page=${page}`,
    signal,
  );
}

export function fetchSearch(
  mediaType: MediaType,
  query: string,
  page = 1,
  signal?: AbortSignal,
) {
  return getJson<TmdbPage>(
    `/api/tmdb/search?type=${mediaType}&query=${encodeURIComponent(query)}&page=${page}`,
    signal,
  );
}

export function fetchGenres(mediaType: MediaType, signal?: AbortSignal) {
  return getJson<{ genres: TmdbGenre[] }>(
    `/api/tmdb/genres?type=${mediaType}`,
    signal,
  );
}

export function fetchDetails(
  mediaType: MediaType,
  id: number,
  signal?: AbortSignal,
) {
  return getJson<TmdbDetails>(
    `/api/tmdb/details?type=${mediaType}&id=${id}`,
    signal,
  );
}

export function fetchContentList(
  mediaType: MediaType,
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<TmdbPage> {
  return query
    ? fetchSearch(mediaType, query, page, signal)
    : fetchTrending(mediaType, page, signal);
}

export type { TmdbContent };
