"use client";

import { useEffect, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} role="presentation">
      <section aria-labelledby="modal-title" aria-modal="true" className={styles.modal} role="dialog">
        <div className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
          <button aria-label="Close modal" className={styles.iconButton} onClick={onClose} type="button">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
