"use client";

import { useEffect, useState } from "react";
import styles from "@/components/components.module.css";

type ToastType = "success" | "warning" | "error" | "info";

type Toast = {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
};

type ToastInput = Omit<Toast, "id">;

const toastEventName = "yaadmantra:toast";

export function showToast(input: ToastInput) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ToastInput>(toastEventName, {
      detail: input
    })
  );
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function handleToast(event: Event) {
      const detail = (event as CustomEvent<ToastInput>).detail;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((currentToasts) => [...currentToasts, { ...detail, id }].slice(-4));

      window.setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
      }, 3600);
    }

    window.addEventListener(toastEventName, handleToast);
    return () => window.removeEventListener(toastEventName, handleToast);
  }, []);

  return (
    <div aria-live="polite" aria-relevant="additions" className={styles.toastRegion}>
      {toasts.map((toast) => (
        <div className={`${styles.toast} ${styles[`toast${toast.type}`]}`} key={toast.id} role="status">
          <strong>{toast.title}</strong>
          {toast.message ? <span>{toast.message}</span> : null}
        </div>
      ))}
    </div>
  );
}
