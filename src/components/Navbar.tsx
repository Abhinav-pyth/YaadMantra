"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "@/components/components.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/quiz", label: "Quiz" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/create", label: "Create" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <Link aria-label="YaadMantra home" className={styles.brand} href="/" onClick={() => setIsOpen(false)}>
        <span className={styles.brandMark}>य</span>
        <span>
          <strong>YaadMantra</strong>
          <small>Hindi mnemonic learning</small>
        </span>
      </Link>

      <nav aria-label="Primary navigation" className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ""}`}>
        {navLinks.map((link) => (
          <Link
            aria-current={pathname === link.href ? "page" : undefined}
            className={pathname === link.href ? styles.activeNavLink : ""}
            href={link.href}
            key={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.navActions}>
        <ThemeToggle />
        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className={`${styles.iconButton} ${styles.menuButton}`}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <Icon name={isOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
