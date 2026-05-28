"use client";

import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

export function SearchBar({ value, onChange, placeholder = "Mnemonic, category, keyword खोजें", label = "Search mnemonics" }: SearchBarProps) {
  return (
    <label className={styles.searchBar}>
      <span className="srOnly">{label}</span>
      <Icon name="search" />
      <input
        autoComplete="off"
        inputMode="search"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  );
}
