"use client";

import { useEffect, useMemo } from "react";
import { STORAGE_KEYS } from "@/utils/storage";
import { useLocalStorageState } from "@/hooks/useLocalStorage";

export type StreakState = {
  current: number;
  longest: number;
  lastVisit: string | null;
};

const initialStreak: StreakState = {
  current: 0,
  longest: 0,
  lastVisit: null
};

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayDifference(previousDateKey: string, currentDateKey: string) {
  const previous = new Date(`${previousDateKey}T00:00:00`);
  const current = new Date(`${currentDateKey}T00:00:00`);
  return Math.round((current.getTime() - previous.getTime()) / 86_400_000);
}

export function useStreak() {
  const today = useMemo(() => localDateKey(), []);
  const [streak, setStreak, isReady] = useLocalStorageState<StreakState>(STORAGE_KEYS.streak, initialStreak);

  useEffect(() => {
    setStreak((currentStreak) => {
      if (currentStreak.lastVisit === today) {
        return currentStreak;
      }

      const difference = currentStreak.lastVisit ? dayDifference(currentStreak.lastVisit, today) : 0;
      const current = difference === 1 ? currentStreak.current + 1 : 1;

      return {
        current,
        longest: Math.max(current, currentStreak.longest),
        lastVisit: today
      };
    });
  }, [setStreak, today]);

  return {
    streak,
    isReady
  };
}
