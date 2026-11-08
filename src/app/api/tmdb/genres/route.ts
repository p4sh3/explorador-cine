import { tmdbErrorResponse } from "@/lib/tmdb/api-response";
import { getGenres } from "@/lib/tmdb/client";
import {
  invalidMediaTypeResponse,
  parseMediaType,
} from "@/lib/tmdb/route-params";

export async function GET(request: Request) {
  const mediaType = parseMediaType(
    new URL(request.url).searchParams.get("type"),
  );

  if (!mediaType) return invalidMediaTypeResponse();

  try {
    return Response.json({ genres: await getGenres(mediaType) });
  } catch (error) {
    return tmdbErrorResponse(error);
  }
}
