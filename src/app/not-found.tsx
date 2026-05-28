import Link from "next/link";
import styles from "@/app/pages.module.css";

export default function NotFound() {
  return (
    <section className={`${styles.pageShell} ${styles.centeredState}`}>
      <p className={styles.overline}>404</p>
      <h1>यह मंत्र अभी उपलब्ध नहीं है</h1>
      <p>आप home पर वापस जाकर starter mnemonics, quiz, flashcards और अपनी saved list खोल सकते हैं।</p>
      <Link className="buttonPrimary" href="/">
        Home पर जाएं
      </Link>
    </section>
  );
}
