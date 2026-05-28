"use client";

import { useMemo, useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { MnemonicCard } from "@/components/MnemonicCard";
import { SearchBar } from "@/components/SearchBar";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import { searchMnemonics } from "@/utils/search";
import styles from "@/app/pages.module.css";
import type { CategoryMeta, Mnemonic } from "@/types/mnemonic";

type CategoriesClientProps = {
  categories: CategoryMeta[];
  starterMnemonics: Mnemonic[];
};

export function CategoriesClient({ categories, starterMnemonics }: CategoriesClientProps) {
  const [query, setQuery] = useState("");
  const { customMnemonics } = useCustomMnemonics();
  const allMnemonics = useMemo(() => [...starterMnemonics, ...customMnemonics], [customMnemonics, starterMnemonics]);
  const filteredMnemonics = useMemo(() => searchMnemonics(allMnemonics, query), [allMnemonics, query]);

  const categoryCounts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        count: allMnemonics.filter((mnemonic) => mnemonic.category === category.name).length
      })),
    [allMnemonics, categories]
  );

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>Categories</p>
        <h1>हर विषय के लिए याद रखने वाला रास्ता</h1>
        <p>Starter JSON data और आपके local custom mnemonics एक ही searchable category system में दिखते हैं।</p>
        <SearchBar value={query} onChange={setQuery} placeholder="category, keyword या mnemonic खोजें" />
      </header>

      <CategoryGrid categories={categoryCounts} />

      <div className={styles.categorySections}>
        {categories.map((category) => {
          const mnemonics = filteredMnemonics.filter((mnemonic) => mnemonic.category === category.name);
          return (
            <section className={styles.categorySection} id={category.slug} key={category.slug}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.overline}>{category.hindiName}</p>
                  <h2>{category.name}</h2>
                </div>
                <span>{mnemonics.length} मंत्र</span>
              </div>
              {mnemonics.length ? (
                <div className={styles.cardGrid}>
                  {mnemonics.map((mnemonic) => (
                    <MnemonicCard key={mnemonic.id} mnemonic={mnemonic} />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyLine}>इस search में कोई mnemonic नहीं मिला।</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
