"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";
import { STORAGE_KEYS } from "@/utils/storage";

type Theme = "light" | "dark";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = resolveInitialTheme();
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
  }

  return (
    <button
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`${styles.iconButton} ${styles.themeToggle}`}
      onClick={toggleTheme}
      type="button"
    >
      <Icon name={mounted && theme === "dark" ? "moon" : "sun"} />
    </button>
  );
}
