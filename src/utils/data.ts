import mnemonicData from "@/data/mnemonics.json";
import { categories } from "@/data/categories";
import type { CategoryName, Mnemonic } from "@/types/mnemonic";

export const starterMnemonics = mnemonicData as Mnemonic[];

export function getCategoryMeta(categoryName: CategoryName) {
  return categories.find((category) => category.name === categoryName) ?? categories[0];
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getMnemonicById(id: string) {
  return starterMnemonics.find((mnemonic) => mnemonic.id === id);
}

export function getTrendingMnemonics(limit = 6) {
  const preferredIds = [
    "geo-neighbours-india",
    "science-planets",
    "coding-solid",
    "upsc-fundamental-rights",
    "java-thread-states",
    "history-mughal-order"
  ];

  const preferred = preferredIds
    .map((id) => starterMnemonics.find((mnemonic) => mnemonic.id === id))
    .filter(Boolean) as Mnemonic[];

  return preferred.slice(0, limit);
}

export function getMnemonicsByCategory(categoryName: CategoryName) {
  return starterMnemonics.filter((mnemonic) => mnemonic.category === categoryName);
}

export function getCategoryCounts(mnemonics: Mnemonic[] = starterMnemonics) {
  return categories.map((category) => ({
    ...category,
    count: mnemonics.filter((mnemonic) => mnemonic.category === category.name).length
  }));
}
