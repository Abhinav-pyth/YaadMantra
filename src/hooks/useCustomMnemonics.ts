"use client";

import { useCallback } from "react";
import type { CategoryName, CustomMnemonic, Difficulty, ExplanationItem } from "@/types/mnemonic";
import { createLocalId, STORAGE_KEYS } from "@/utils/storage";
import { useLocalStorageState } from "@/hooks/useLocalStorage";

type CustomMnemonicInput = {
  title: string;
  mnemonic: string;
  explanation: ExplanationItem[];
  category: CategoryName;
  difficulty: Difficulty;
  keywords: string[];
};

export function useCustomMnemonics() {
  const [customMnemonics, setCustomMnemonics, isReady] = useLocalStorageState<CustomMnemonic[]>(
    STORAGE_KEYS.customMnemonics,
    []
  );

  const addCustomMnemonic = useCallback(
    (input: CustomMnemonicInput) => {
      const now = new Date().toISOString();
      const mnemonic: CustomMnemonic = {
        ...input,
        id: createLocalId("custom"),
        source: "custom",
        createdAt: now,
        updatedAt: now
      };

      setCustomMnemonics((currentMnemonics) => [mnemonic, ...currentMnemonics]);
      return mnemonic;
    },
    [setCustomMnemonics]
  );

  const updateCustomMnemonic = useCallback(
    (id: string, input: CustomMnemonicInput) => {
      const now = new Date().toISOString();
      setCustomMnemonics((currentMnemonics) =>
        currentMnemonics.map((mnemonic) =>
          mnemonic.id === id
            ? {
                ...mnemonic,
                ...input,
                updatedAt: now
              }
            : mnemonic
        )
      );
    },
    [setCustomMnemonics]
  );

  const deleteCustomMnemonic = useCallback(
    (id: string) => {
      setCustomMnemonics((currentMnemonics) => currentMnemonics.filter((mnemonic) => mnemonic.id !== id));
    },
    [setCustomMnemonics]
  );

  return {
    customMnemonics,
    addCustomMnemonic,
    updateCustomMnemonic,
    deleteCustomMnemonic,
    isReady
  };
}
