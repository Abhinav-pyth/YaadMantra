import type { Metadata } from "next";
import { CategoriesClient } from "@/app/categories/CategoriesClient";
import { categories } from "@/data/categories";
import { starterMnemonics } from "@/utils/data";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse YaadMantra mnemonic categories for geography, history, science, UPSC, SSC, coding, Java, and English vocabulary."
};

export default function CategoriesPage() {
  return <CategoriesClient categories={categories} starterMnemonics={starterMnemonics} />;
}
