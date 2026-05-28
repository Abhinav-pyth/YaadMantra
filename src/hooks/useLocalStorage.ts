"use client";

import { useCallback, useEffect, useState } from "react";
import { safeReadStorage, safeWriteStorage } from "@/utils/storage";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => safeReadStorage<T>(key, initialValue));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setValue(safeReadStorage<T>(key, initialValue));
    setIsReady(true);
  }, [initialValue, key]);

  const updateValue = useCallback(
    (nextValue: T | ((currentValue: T) => T)) => {
      setValue((currentValue) => {
        const resolvedValue =
          typeof nextValue === "function" ? (nextValue as (currentValue: T) => T)(currentValue) : nextValue;
        safeWriteStorage(key, resolvedValue);
        return resolvedValue;
      });
    },
    [key]
  );

  return [value, updateValue, isReady] as const;
}
