"use client";

import { useEffect, useMemo, useState } from "react";
import { FlashCard } from "@/components/FlashCard";
import { Icon } from "@/components/Icon";
import { categories } from "@/data/categories";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import styles from "@/app/pages.module.css";
import type { CategoryName, Mnemonic } from "@/types/mnemonic";

type CategoryFilter = "All" | CategoryName;

export function FlashcardsClient({ starterMnemonics }: { starterMnemonics: Mnemonic[] }) {
  const { customMnemonics } = useCustomMnemonics();
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [index, setIndex] = useState(0);
  const allMnemonics = useMemo(() => [...starterMnemonics, ...customMnemonics], [customMnemonics, starterMnemonics]);
  const filteredMnemonics = useMemo(
    () => (category === "All" ? allMnemonics : allMnemonics.filter((mnemonic) => mnemonic.category === category)),
    [allMnemonics, category]
  );
  const current = filteredMnemonics[index] ?? filteredMnemonics[0];

  useEffect(() => {
    setIndex(0);
  }, [category]);

  function move(delta: number) {
    setIndex((currentIndex) => {
      if (!filteredMnemonics.length) {
        return 0;
      }
      return (currentIndex + delta + filteredMnemonics.length) % filteredMnemonics.length;
    });
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>Flashcards</p>
        <h1>Front पर मंत्र, back पर meaning</h1>
        <p>CSS flip animation के साथ active recall करें और category-wise deck बदलें।</p>
      </header>

      <div className={styles.filterBar} aria-label="Flashcard category filter">
        <button className={category === "All" ? styles.activeChip : ""} onClick={() => setCategory("All")} type="button">
          All
        </button>
        {categories.map((item) => (
          <button
            className={category === item.name ? styles.activeChip : ""}
            key={item.slug}
            onClick={() => setCategory(item.name)}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>

      <section className={styles.flashcardStage}>
        {current ? <FlashCard key={current.id} mnemonic={current} /> : null}
        <div className={styles.flashControls}>
          <button className="buttonSecondary" onClick={() => move(-1)} type="button">
            <Icon name="arrowRight" /> Previous
          </button>
          <span>
            {filteredMnemonics.length ? index + 1 : 0}/{filteredMnemonics.length}
          </span>
          <button className="buttonPrimary" onClick={() => move(1)} type="button">
            Next <Icon name="arrowRight" />
          </button>
        </div>
      </section>
    </div>
  );
}
