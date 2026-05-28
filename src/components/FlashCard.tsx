"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";
import type { Mnemonic } from "@/types/mnemonic";

type FlashCardProps = {
  mnemonic: Mnemonic;
};

export function FlashCard({ mnemonic }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      aria-pressed={flipped}
      className={`${styles.flashCard} ${flipped ? styles.flashCardFlipped : ""}`}
      onClick={() => setFlipped((current) => !current)}
      type="button"
    >
      <span className={styles.flashCardInner}>
        <span className={styles.flashFace}>
          <small>{mnemonic.category}</small>
          <strong lang="hi">{mnemonic.mnemonic}</strong>
          <span className={styles.flashHint}>Tap to reveal</span>
        </span>
        <span className={`${styles.flashFace} ${styles.flashBack}`}>
          <small>{mnemonic.title}</small>
          <span className={styles.flashExplanation}>
            {mnemonic.explanation.map((item) => (
              <span key={`${item.key}-${item.value}`}>
                <b>{item.key}</b> {item.value}
              </span>
            ))}
          </span>
          <span className={styles.flashHint}>
            <Icon name="cards" /> Tap to flip back
          </span>
        </span>
      </span>
    </button>
  );
}
