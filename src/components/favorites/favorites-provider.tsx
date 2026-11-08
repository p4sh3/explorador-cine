"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import type { TmdbContent } from "@/lib/tmdb/types";

const STORAGE_KEY = "explorador-cine:favorites:v1";

type FavoritesSnapshot = {
  favorites: TmdbContent[];
  ready: boolean;
  error: string | null;
};

type FavoritesContextValue = FavoritesSnapshot & {
  toggleFavorite: (content: TmdbContent) => void;
  removeFavorite: (content: Pick<TmdbContent, "id" | "mediaType">) => void;
  isFavorite: (content: Pick<TmdbContent, "id" | "mediaType">) => boolean;
};

const EMPTY_FAVORITES: TmdbContent[] = [];
const SERVER_SNAPSHOT: FavoritesSnapshot = {
  favorites: EMPTY_FAVORITES,
  ready: false,
  error: null,
};

let snapshot = SERVER_SNAPSHOT;
let initialized = false;
const listeners = new Set<() => void>();

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function isFavoriteRecord(value: unknown): value is TmdbContent {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    Number.isSafeInteger(item.id) &&
    (item.mediaType === "movie" || item.mediaType === "tv") &&
    typeof item.title === "string" &&
    typeof item.overview === "string" &&
    (typeof item.posterPath === "string" || item.posterPath === null) &&
    (typeof item.backdropPath === "string" || item.backdropPath === null) &&
    (typeof item.releaseDate === "string" || item.releaseDate === null) &&
    typeof item.voteAverage === "number" &&
    Array.isArray(item.genreIds) &&
    item.genreIds.every(
      (id) => typeof id === "number" && Number.isSafeInteger(id),
    )
  );
}

function readFavorites(serialized: string | null): TmdbContent[] {
  if (serialized === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error("Los favoritos guardados no tienen un formato válido.");
  }

  if (!Array.isArray(parsed) || !parsed.every(isFavoriteRecord)) {
    throw new Error("Los favoritos guardados contienen datos no válidos.");
  }

  return parsed;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function initialize() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  try {
    snapshot = {
      favorites: readFavorites(window.localStorage.getItem(STORAGE_KEY)),
      ready: true,
      error: null,
    };
  } catch (cause) {
    snapshot = {
      ...SERVER_SNAPSHOT,
      ready: true,
      error:
        cause instanceof Error
          ? cause.message
          : "No se pudieron leer los favoritos del navegador.",
    };
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  initialize();

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  listener();
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;

  try {
    snapshot = {
      favorites: readFavorites(event.newValue),
      ready: true,
      error: null,
    };
  } catch (cause) {
    snapshot = {
      ...snapshot,
      error:
        cause instanceof Error
          ? cause.message
          : "No se pudieron sincronizar los favoritos.",
    };
  }
  notify();
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function updateFavorites(
  update: (current: TmdbContent[]) => TmdbContent[],
) {
  initialize();
  if (snapshot.error) return;

  const favorites = update(snapshot.favorites);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    snapshot = { favorites, ready: true, error: null };
    notify();
  } catch {
    snapshot = {
      ...snapshot,
      error:
        "No se pudieron guardar los favoritos. Revisa el almacenamiento del navegador.",
    };
    notify();
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((content: TmdbContent) => {
    updateFavorites((favorites) => {
      const exists = favorites.some(
        (item) =>
          item.id === content.id && item.mediaType === content.mediaType,
      );
      return exists
        ? favorites.filter(
            (item) =>
              item.id !== content.id || item.mediaType !== content.mediaType,
          )
        : [content, ...favorites];
    });
  }, []);

  const removeFavorite = useCallback(
    (content: Pick<TmdbContent, "id" | "mediaType">) => {
      updateFavorites((favorites) =>
        favorites.filter(
          (item) =>
            item.id !== content.id || item.mediaType !== content.mediaType,
        ),
      );
    },
    [],
  );

  const isFavorite = useCallback(
    (content: Pick<TmdbContent, "id" | "mediaType">) =>
      current.favorites.some(
        (item) =>
          item.id === content.id && item.mediaType === content.mediaType,
      ),
    [current.favorites],
  );

  const value = useMemo(
    () => ({
      ...current,
      toggleFavorite,
      removeFavorite,
      isFavorite,
    }),
    [current, isFavorite, removeFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider.");
  }
  return context;
}
