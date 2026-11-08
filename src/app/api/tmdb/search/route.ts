import { tmdbErrorResponse } from "@/lib/tmdb/api-response";
import { searchContent } from "@/lib/tmdb/client";
import {
  invalidMediaTypeResponse,
  parseMediaType,
} from "@/lib/tmdb/route-params";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mediaType = parseMediaType(params.get("type"));
  const query = params.get("query")?.trim() ?? "";

  if (!mediaType) return invalidMediaTypeResponse();

  if (query.length < 2 || query.length > 100) {
    return Response.json(
      { error: "La búsqueda debe tener entre 2 y 100 caracteres." },
      { status: 400 },
    );
  }

  try {
    return Response.json(await searchContent(mediaType, query));
  } catch (error) {
    return tmdbErrorResponse(error);
  }
}
