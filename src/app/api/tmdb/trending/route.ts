import { tmdbErrorResponse } from "@/lib/tmdb/api-response";
import { getTrending } from "@/lib/tmdb/client";
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
    return Response.json(await getTrending(mediaType));
  } catch (error) {
    return tmdbErrorResponse(error);
  }
}
