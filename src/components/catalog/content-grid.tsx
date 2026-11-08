import type { TmdbContent } from "@/lib/tmdb/types";
import { ContentCard } from "@/components/catalog/content-card";

type ContentGridProps = {
  items: TmdbContent[];
};

export function ContentGrid({ items }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
        <h2 className="text-lg font-medium text-white">No encontramos títulos</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Prueba con otro nombre o cambia los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <ContentCard content={item} key={`${item.mediaType}-${item.id}`} />
      ))}
    </div>
  );
}
