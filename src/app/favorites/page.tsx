import type { Metadata } from "next";
import { FavoritesClient } from "@/app/favorites/FavoritesClient";
import { starterMnemonics } from "@/utils/data";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your locally saved favorite Hindi mnemonics."
};

export default function FavoritesPage() {
  return <FavoritesClient starterMnemonics={starterMnemonics} />;
}
