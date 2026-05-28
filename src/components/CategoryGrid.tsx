import Link from "next/link";
import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";
import type { CategoryMeta } from "@/types/mnemonic";

type CategoryGridProps = {
  categories: (CategoryMeta & { count?: number })[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <Link
          className={styles.categoryTile}
          href={`/categories#${category.slug}`}
          key={category.slug}
          style={{ "--category-accent": category.accent } as React.CSSProperties}
        >
          <span className={styles.categoryIcon}>
            <Icon name={category.icon} />
          </span>
          <span>
            <strong>{category.name}</strong>
            <em>{category.hindiName}</em>
          </span>
          {typeof category.count === "number" ? <small>{category.count} मंत्र</small> : null}
        </Link>
      ))}
    </div>
  );
}
