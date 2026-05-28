import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MnemonicCard } from "@/components/MnemonicCard";
import { getMnemonicById, starterMnemonics } from "@/utils/data";
import styles from "@/app/pages.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return starterMnemonics.map((mnemonic) => ({
    id: mnemonic.id
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const mnemonic = getMnemonicById(id);

  if (!mnemonic) {
    return {
      title: "Mnemonic not found"
    };
  }

  return {
    title: mnemonic.title,
    description: `${mnemonic.mnemonic} - ${mnemonic.category} mnemonic on YaadMantra.`,
    openGraph: {
      title: `${mnemonic.title} | YaadMantra`,
      description: mnemonic.mnemonic
    }
  };
}

export default async function MnemonicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mnemonic = getMnemonicById(id);

  if (!mnemonic) {
    notFound();
  }

  const related = starterMnemonics
    .filter((item) => item.category === mnemonic.category && item.id !== mnemonic.id)
    .slice(0, 3);

  return (
    <div className={styles.pageShell}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/categories">Categories</Link>
        <span>/</span>
        <span>{mnemonic.title}</span>
      </nav>

      <header className={styles.detailHero}>
        <p className={styles.overline}>{mnemonic.category}</p>
        <h1>{mnemonic.title}</h1>
        <p lang="hi">{mnemonic.mnemonic}</p>
      </header>

      <MnemonicCard initiallyExpanded mnemonic={mnemonic} />

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.overline}>Related</p>
            <h2>{mnemonic.category} के और मंत्र</h2>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {related.map((item) => (
            <MnemonicCard compact key={item.id} mnemonic={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
