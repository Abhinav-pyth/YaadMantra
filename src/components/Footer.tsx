import Link from "next/link";
import styles from "@/components/components.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>YaadMantra</strong>
        <p>Local-first Hindi mnemonic learning for exams, interviews, and daily revision.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/about">About</Link>
        <Link href="/create">Create</Link>
        <Link href="/favorites">Favorites</Link>
      </nav>
    </footer>
  );
}
