"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { showToast } from "@/components/Toast";
import { useFavoritesContext } from "@/components/FavoritesProvider";
import styles from "@/components/components.module.css";
import type { Mnemonic } from "@/types/mnemonic";

type MnemonicCardProps = {
  mnemonic: Mnemonic;
  initiallyExpanded?: boolean;
  compact?: boolean;
};

export function MnemonicCard({ mnemonic, initiallyExpanded = false, compact = false }: MnemonicCardProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorite = isFavorite(mnemonic.id);
  const isStarterMnemonic = mnemonic.source === "starter";

  const shareText = useMemo(
    () => `${mnemonic.title}\n${mnemonic.mnemonic}\n${mnemonic.explanation.map((item) => `${item.key} = ${item.value}`).join(", ")}`,
    [mnemonic]
  );

  async function copyMnemonic() {
    await navigator.clipboard.writeText(shareText);
    showToast({ title: "Copied", message: "Mnemonic clipboard में सेव हो गया।", type: "success" });
  }

  async function shareMnemonic() {
    const shareData = {
      title: mnemonic.title,
      text: shareText,
      url: isStarterMnemonic ? `${window.location.origin}/mnemonic/${mnemonic.id}/` : window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    showToast({ title: "Share link copied", message: "Link clipboard में सेव हो गया।", type: "success" });
  }

  function handleFavorite() {
    toggleFavorite(mnemonic.id);
    showToast({
      title: favorite ? "Favorite removed" : "Favorite saved",
      message: favorite ? "यह मंत्र favorites से हट गया।" : "यह मंत्र favorites में जुड़ गया।",
      type: favorite ? "info" : "success"
    });
  }

  return (
    <article className={`${styles.mnemonicCard} ${compact ? styles.mnemonicCardCompact : ""}`}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardMeta}>
            <span>{mnemonic.category}</span>
            <span>{mnemonic.difficulty}</span>
          </p>
          <h3>{mnemonic.title}</h3>
        </div>
        <button
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          className={`${styles.iconButton} ${favorite ? styles.favoriteActive : ""}`}
          onClick={handleFavorite}
          type="button"
        >
          <Icon name={favorite ? "heartFilled" : "heart"} />
        </button>
      </div>

      <p className={styles.mnemonicSentence} lang="hi">
        {mnemonic.mnemonic}
      </p>

      <div className={styles.cardActions}>
        <button className={styles.textButton} onClick={() => setExpanded((current) => !current)} type="button">
          <span>{expanded ? "Hide explanation" : "Expand"}</span>
          <Icon name="chevronDown" />
        </button>
        <button aria-label="Copy mnemonic" className={styles.iconButton} onClick={copyMnemonic} type="button">
          <Icon name="copy" />
        </button>
        <button aria-label="Share mnemonic" className={styles.iconButton} onClick={shareMnemonic} type="button">
          <Icon name="share" />
        </button>
        {isStarterMnemonic ? (
          <Link aria-label={`Open ${mnemonic.title}`} className={styles.iconLink} href={`/mnemonic/${mnemonic.id}`}>
            <Icon name="external" />
          </Link>
        ) : null}
      </div>

      {expanded ? (
        <div className={styles.explanationPanel}>
          <dl>
            {mnemonic.explanation.map((item, index) => (
              <div key={`${item.key}-${index}`}>
                <dt>{item.key}</dt>
                <dd>
                  {item.value}
                  {item.note ? <small>{item.note}</small> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </article>
  );
}
