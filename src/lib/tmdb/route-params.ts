import type { MediaType } from "@/lib/tmdb/types";

export function parseMediaType(value: string | null): MediaType | null {
  if (value === "movie" || value === "tv") return value;
  return null;
}

export function invalidMediaTypeResponse() {
  return Response.json(
    { error: "El tipo debe ser 'movie' o 'tv'." },
    { status: 400 },
  );
}
