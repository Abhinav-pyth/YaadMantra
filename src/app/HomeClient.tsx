"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Icon } from "@/components/Icon";
import { MnemonicCard } from "@/components/MnemonicCard";
import { SearchBar } from "@/components/SearchBar";
import { StatPill } from "@/components/StatPill";
import { showToast } from "@/components/Toast";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import { useStreak } from "@/hooks/useStreak";
import { generateMnemonicSuggestions } from "@/utils/mnemonicGenerator";
import { searchMnemonics } from "@/utils/search";
import styles from "@/app/page.module.css";
import type { CategoryMeta, GeneratedSuggestion, Mnemonic } from "@/types/mnemonic";

type HomeClientProps = {
  starterMnemonics: Mnemonic[];
  trendingMnemonics: Mnemonic[];
  categories: (CategoryMeta & { count: number })[];
  totalCategories: number;
};

export function HomeClient({ starterMnemonics, trendingMnemonics, categories, totalCategories }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [generatorInput, setGeneratorInput] = useState("Bangladesh, Afghanistan, China, Pakistan, Nepal, Myanmar, Bhutan");
  const [suggestions, setSuggestions] = useState<GeneratedSuggestion[]>([]);
  const { customMnemonics } = useCustomMnemonics();
  const { streak } = useStreak();

  const allMnemonics = useMemo(() => [...starterMnemonics, ...customMnemonics], [customMnemonics, starterMnemonics]);
  const searchResults = useMemo(() => searchMnemonics(allMnemonics, query).slice(0, 9), [allMnemonics, query]);

  function handleGenerate() {
    const nextSuggestions = generateMnemonicSuggestions(generatorInput);
    setSuggestions(nextSuggestions);

    showToast({
      title: nextSuggestions.length ? "Suggestions ready" : "Add more words",
      message: nextSuggestions.length ? "Local generator ने नए Hindi-style मंत्र बनाए।" : "कम से कम दो comma-separated words डालें।",
      type: nextSuggestions.length ? "success" : "warning"
    });
  }

  async function copySuggestion(sentence: string) {
    await navigator.clipboard.writeText(sentence);
    showToast({ title: "Copied", message: "Generated sentence clipboard में सेव हो गई।", type: "success" });
  }

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Hindi mnemonics से facts
            <span> दिमाग में टिक जाते हैं।</span>
          </h1>
          <p>
            Geography, Science, Coding, UPSC और interviews के लिए local-first mnemonic learning. Search, quiz,
            flashcards, favorites और custom मंत्र, सब browser में सेव।
          </p>
          <SearchBar value={query} onChange={setQuery} placeholder="खोजें: भारत, SOLID, vitamin, Java..." />
          <div className={styles.heroActions}>
            <Link className="buttonPrimary" href="/quiz">
              <Icon name="timer" /> Quiz शुरू करें
            </Link>
            <Link className="buttonSecondary" href="/create">
              <Icon name="plus" /> अपना मंत्र बनाएं
            </Link>
          </div>
          <div className={styles.statsRow} aria-label="YaadMantra stats">
            <StatPill label="starter mnemonics" value={starterMnemonics.length} />
            <StatPill label="categories" value={totalCategories} />
            <StatPill label="day streak" value={streak.current || 1} />
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Featured mnemonic">
          <div className={styles.heroPanelTop}>
            <span className={styles.brandGlyph}>याद</span>
            <span>Trending</span>
          </div>
          <p lang="hi">बहन अकेले चाय पीना ना, मैं भी हूँ</p>
          <dl>
            <div>
              <dt>ब</dt>
              <dd>बांग्लादेश</dd>
            </div>
            <div>
              <dt>अ</dt>
              <dd>अफ़गानिस्तान</dd>
            </div>
            <div>
              <dt>च</dt>
              <dd>चीन</dd>
            </div>
          </dl>
          <Link className={styles.panelLink} href="/mnemonic/geo-neighbours-india">
            पूरा मंत्र देखें <Icon name="arrowRight" />
          </Link>
        </aside>
      </section>

      {query ? (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.overline}>Instant search</p>
              <h2>Search results</h2>
            </div>
            <span>{searchResults.length} matches</span>
          </div>
          <div className={styles.cardGrid}>
            {searchResults.map((mnemonic) => (
              <MnemonicCard key={mnemonic.id} mnemonic={mnemonic} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.overline}>Trending Mnemonics</p>
            <h2>आज के high-retention मंत्र</h2>
          </div>
          <Link href="/categories">All categories</Link>
        </div>
        <div className={styles.cardGrid}>
          {trendingMnemonics.map((mnemonic) => (
            <MnemonicCard key={mnemonic.id} mnemonic={mnemonic} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.overline}>Categories</p>
            <h2>Exam और skill के हिसाब से सीखें</h2>
          </div>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className={`${styles.section} ${styles.twoColumn}`}>
        <div className={styles.quickPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.overline}>Practice</p>
              <h2>Revision modes</h2>
            </div>
          </div>
          <div className={styles.quickGrid}>
            <Link href="/quiz">
              <Icon name="timer" />
              <strong>Quiz</strong>
              <span>Timer, score और random MCQs</span>
            </Link>
            <Link href="/flashcards">
              <Icon name="cards" />
              <strong>Flashcards</strong>
              <span>CSS flip cards से active recall</span>
            </Link>
            <Link href="/favorites">
              <Icon name="heart" />
              <strong>Favorites</strong>
              <span>Saved मंत्र localStorage में</span>
            </Link>
          </div>
        </div>

        <div className={styles.generatorPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.overline}>Local Generator</p>
              <h2>AI-like, API-free</h2>
            </div>
          </div>
          <label>
            <span>Comma-separated words</span>
            <textarea value={generatorInput} onChange={(event) => setGeneratorInput(event.target.value)} />
          </label>
          <button className="buttonPrimary" onClick={handleGenerate} type="button">
            <Icon name="sparkles" /> Generate suggestions
          </button>
          {suggestions.length ? (
            <div className={styles.suggestionList}>
              {suggestions.map((suggestion) => (
                <button key={suggestion.id} onClick={() => copySuggestion(suggestion.sentence)} type="button">
                  {suggestion.sentence}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
