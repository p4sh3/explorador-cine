import "server-only";

import type {
  MediaType,
  TmdbContent,
  TmdbDetails,
  TmdbGenre,
  TmdbPage,
} from "@/lib/tmdb/types";

const DEFAULT_BASE_URL = "https://api.themoviedb.org/3";

export class TmdbError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "TmdbError";
  }
}

function getConfiguration() {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

  if (!token) {
    throw new TmdbError(
      "Falta configurar TMDB_API_READ_ACCESS_TOKEN en .env.local.",
      503,
    );
  }

  const baseUrl = process.env.TMDB_API_BASE_URL || DEFAULT_BASE_URL;

  try {
    return { token, baseUrl: new URL(baseUrl) };
  } catch {
    throw new TmdbError("TMDB_API_BASE_URL no es una URL válida.", 503);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readGenres(value: unknown): TmdbGenre[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((genre) => {
    if (!isRecord(genre)) return [];
    const id = readNumber(genre.id);
    const name = readString(genre.name);
    return id !== null && name ? [{ id, name }] : [];
  });
}

function parseContent(
  value: unknown,
  mediaType: MediaType,
): TmdbContent | null {
  if (!isRecord(value)) return null;

  const id = readNumber(value.id);
  const title =
    readString(mediaType === "movie" ? value.title : value.name) ??
    readString(mediaType === "movie" ? value.original_title : value.original_name);

  if (id === null || !title) return null;

  const genreIds = Array.isArray(value.genre_ids)
    ? value.genre_ids.filter(
        (genreId): genreId is number =>
          typeof genreId === "number" && Number.isInteger(genreId),
      )
    : [];

  return {
    id,
    mediaType,
    title,
    overview: readString(value.overview) ?? "",
    posterPath: readString(value.poster_path),
    backdropPath: readString(value.backdrop_path),
    releaseDate: readString(
      mediaType === "movie" ? value.release_date : value.first_air_date,
    ),
    voteAverage: readNumber(value.vote_average) ?? 0,
    genreIds,
  };
}

async function request(path: string, searchParams?: URLSearchParams) {
  const { token, baseUrl } = getConfiguration();
  const url = new URL(path.replace(/^\//, ""), `${baseUrl.href.replace(/\/$/, "")}/`);

  if (searchParams) {
    searchParams.forEach((value, key) => url.searchParams.set(key, value));
  }

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch {
    throw new TmdbError("No fue posible conectar con TMDB.", 502);
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new TmdbError("No encontramos ese título en TMDB.", 404);
    }

    if (response.status === 401 || response.status === 403) {
      throw new TmdbError(
        "TMDB rechazó la credencial. Revisa TMDB_API_READ_ACCESS_TOKEN.",
        502,
      );
    }

    if (response.status === 429) {
      throw new TmdbError(
        "TMDB recibió demasiadas solicitudes. Intenta de nuevo más tarde.",
        503,
      );
    }

    throw new TmdbError("TMDB no pudo completar la solicitud.", 502);
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    throw new TmdbError("TMDB devolvió una respuesta inválida.", 502);
  }
}

function parsePage(value: unknown, mediaType: MediaType): TmdbPage {
  if (!isRecord(value) || !Array.isArray(value.results)) {
    throw new TmdbError("TMDB devolvió un listado con formato inválido.", 502);
  }

  return {
    page: readNumber(value.page) ?? 1,
    totalPages: readNumber(value.total_pages) ?? 1,
    results: value.results.flatMap((item) => {
      const content = parseContent(item, mediaType);
      return content ? [content] : [];
    }),
  };
}

export async function getTrending(
  mediaType: MediaType,
): Promise<TmdbPage> {
  const data = await request(`/trending/${mediaType}/week`, new URLSearchParams({
    language: "es-MX",
  }));
  return parsePage(data, mediaType);
}

export async function searchContent(
  mediaType: MediaType,
  query: string,
): Promise<TmdbPage> {
  const data = await request(`/search/${mediaType}`, new URLSearchParams({
    language: "es-MX",
    query,
    include_adult: "false",
  }));
  return parsePage(data, mediaType);
}

export async function getGenres(mediaType: MediaType): Promise<TmdbGenre[]> {
  const data = await request(`/genre/${mediaType}/list`, new URLSearchParams({
    language: "es-MX",
  }));

  if (!isRecord(data) || !Array.isArray(data.genres)) {
    throw new TmdbError("TMDB devolvió un listado de géneros inválido.", 502);
  }

  return readGenres(data.genres);
}

export async function getDetails(
  mediaType: MediaType,
  id: number,
): Promise<TmdbDetails> {
  const data = await request(`/${mediaType}/${id}`, new URLSearchParams({
    language: "es-MX",
  }));
  const content = parseContent(data, mediaType);

  if (!content || !isRecord(data)) {
    throw new TmdbError("TMDB devolvió el detalle con formato inválido.", 502);
  }

  return {
    ...content,
    genres: readGenres(data.genres),
    runtime: readNumber(data.runtime),
    numberOfSeasons: readNumber(data.number_of_seasons),
    status: readString(data.status),
  };
}
