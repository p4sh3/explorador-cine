import { tmdbErrorResponse } from "@/lib/tmdb/api-response";
import { getDetails } from "@/lib/tmdb/client";
import {
  invalidMediaTypeResponse,
  parseMediaType,
} from "@/lib/tmdb/route-params";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mediaType = parseMediaType(params.get("type"));
  const rawId = params.get("id") ?? "";
  const id = Number(rawId);

  if (!mediaType) return invalidMediaTypeResponse();

  if (!/^[1-9]\d*$/.test(rawId) || !Number.isSafeInteger(id)) {
    return Response.json(
      { error: "El identificador del título no es válido." },
      { status: 400 },
    );
  }

  try {
    return Response.json(await getDetails(mediaType, id));
  } catch (error) {
    return tmdbErrorResponse(error);
  }
}
