import Image from "next/image";
import Link from "next/link";
import type { TmdbContent } from "@/lib/tmdb/types";

type ContentCardProps = {
  content: TmdbContent;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

export function ContentCard({ content }: ContentCardProps) {
  const href =
    content.mediaType === "movie"
      ? `/peliculas/${content.id}`
      : `/series/${content.id}`;

  return (
    <article className="group min-w-0">
      <Link
        aria-label={`Ver detalles de ${content.title}`}
        className="block overflow-hidden rounded-xl border border-white/10 bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        href={href}
      >
        <div className="relative aspect-[2/3]">
          {content.posterPath ? (
            <Image
              alt={`Póster de ${content.title}`}
              className="object-cover transition duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 25vw, 18vw"
              src={`${imageBaseUrl}${content.posterPath}`}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-zinc-500">
              Póster no disponible
            </div>
          )}
        </div>
      </Link>
      <div className="pt-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-5 text-zinc-100">
          <Link className="transition hover:text-amber-300" href={href}>
            {content.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          {content.releaseDate?.slice(0, 4) || "Año desconocido"}
          {content.voteAverage > 0 && (
            <span className="ml-2 text-amber-400">
              ★ {content.voteAverage.toFixed(1)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
