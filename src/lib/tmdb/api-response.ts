import { TmdbError } from "@/lib/tmdb/client";

export function tmdbErrorResponse(error: unknown): Response {
  if (error instanceof TmdbError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  console.error("Error inesperado en el servicio de TMDB.", error);
  return Response.json(
    { error: "Ocurrió un error inesperado al consultar los títulos." },
    { status: 500 },
  );
}
