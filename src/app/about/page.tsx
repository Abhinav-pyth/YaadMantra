import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import styles from "@/app/pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About YaadMantra, a local-first Hindi mnemonic learning platform."
};

export default function AboutPage() {
  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>About YaadMantra</p>
        <h1>Mnemonic learning, Hindi-first और privacy-friendly</h1>
        <p>
          YaadMantra exam preparation और technical interviews के लिए Hindi mnemonic sentences को searchable,
          quiz-ready और offline-friendly बनाता है।
        </p>
      </header>

      <section className={styles.aboutGrid}>
        <article>
          <Icon name="sparkles" />
          <h2>AI-like without API</h2>
          <p>Generator first letters और Hindi filler word bank से suggestions बनाता है। कोई paid model call नहीं होता।</p>
        </article>
        <article>
          <Icon name="heart" />
          <h2>Local-first data</h2>
          <p>Starter data JSON files में है। Favorites, custom mnemonics, streak और quiz score localStorage में रहते हैं।</p>
        </article>
        <article>
          <Icon name="cards" />
          <h2>Practice modes</h2>
          <p>MCQ quiz, timer, progress bar और CSS-only flashcard flip से active recall daily habit बनता है।</p>
        </article>
      </section>

      <section className={styles.aboutBand}>
        <h2>Built for static Vercel deploy</h2>
        <p>
          App Router, TypeScript, native CSS modules, manifest, service worker, robots.txt और sitemap included हैं।
          कोई external backend, database, auth provider, Tailwind, shadcn या state library नहीं।
        </p>
        <Link className="buttonPrimary" href="/create">
          <Icon name="plus" /> Create a mnemonic
        </Link>
      </section>
    </div>
  );
}
