export type MediaType = "movie" | "tv";

export type TmdbContent = {
  id: number;
  mediaType: MediaType;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  genreIds: number[];
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbDetails = TmdbContent & {
  genres: TmdbGenre[];
  runtime: number | null;
  numberOfSeasons: number | null;
  status: string | null;
};

export type TmdbPage = {
  page: number;
  totalPages: number;
  results: TmdbContent[];
};
