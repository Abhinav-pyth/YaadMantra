"use client";

import { useCallback, useMemo } from "react";
import { STORAGE_KEYS } from "@/utils/storage";
import { useLocalStorageState } from "@/hooks/useLocalStorage";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds, isReady] = useLocalStorageState<string[]>(STORAGE_KEYS.favorites, []);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback((id: string) => favoriteSet.has(id), [favoriteSet]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((currentIds) => {
        if (currentIds.includes(id)) {
          return currentIds.filter((currentId) => currentId !== id);
        }

        return [...currentIds, id];
      });
    },
    [setFavoriteIds]
  );

  return {
    favoriteIds,
    favoriteSet,
    isFavorite,
    toggleFavorite,
    isReady
  };
}
