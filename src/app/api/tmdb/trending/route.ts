import { tmdbErrorResponse } from "@/lib/tmdb/api-response";
import { getTrending } from "@/lib/tmdb/client";
import {
  invalidMediaTypeResponse,
  parseMediaType,
} from "@/lib/tmdb/route-params";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mediaType = parseMediaType(params.get("type"));

  if (!mediaType) return invalidMediaTypeResponse();

  const rawPage = params.get("page") ?? "1";
  const page = Number(rawPage);
  if (!/^[1-9]\d*$/.test(rawPage) || !Number.isSafeInteger(page) || page > 500) {
    return Response.json(
      { error: "La página debe ser un número entre 1 y 500." },
      { status: 400 },
    );
  }

  try {
    return Response.json(await getTrending(mediaType, page));
  } catch (error) {
    return tmdbErrorResponse(error);
  }
}
