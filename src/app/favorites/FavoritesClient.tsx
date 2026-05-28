"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MnemonicCard } from "@/components/MnemonicCard";
import { SearchBar } from "@/components/SearchBar";
import { useFavoritesContext } from "@/components/FavoritesProvider";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import { searchMnemonics } from "@/utils/search";
import styles from "@/app/pages.module.css";
import type { Mnemonic } from "@/types/mnemonic";

export function FavoritesClient({ starterMnemonics }: { starterMnemonics: Mnemonic[] }) {
  const [query, setQuery] = useState("");
  const { favoriteSet, isReady } = useFavoritesContext();
  const { customMnemonics } = useCustomMnemonics();
  const allMnemonics = useMemo(() => [...starterMnemonics, ...customMnemonics], [customMnemonics, starterMnemonics]);
  const favorites = useMemo(
    () => searchMnemonics(allMnemonics.filter((mnemonic) => favoriteSet.has(mnemonic.id)), query),
    [allMnemonics, favoriteSet, query]
  );

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>Favorites</p>
        <h1>आपके saved मंत्र</h1>
        <p>Favorites browser localStorage में रहते हैं, इसलिए बिना account के भी private और instant हैं।</p>
        <SearchBar value={query} onChange={setQuery} placeholder="favorite title या keyword खोजें" />
      </header>

      {!isReady ? (
        <div className={styles.skeletonGrid} aria-label="Loading favorites">
          <span />
          <span />
          <span />
        </div>
      ) : favorites.length ? (
        <div className={styles.cardGrid}>
          {favorites.map((mnemonic) => (
            <MnemonicCard key={mnemonic.id} mnemonic={mnemonic} />
          ))}
        </div>
      ) : (
        <section className={styles.centeredState}>
          <h2>अभी कोई favorite नहीं है</h2>
          <p>Mnemonic cards पर heart button दबाकर अपना revision deck बनाएं।</p>
          <Link className="buttonPrimary" href="/categories">
            Categories खोलें
          </Link>
        </section>
      )}
    </div>
  );
}
