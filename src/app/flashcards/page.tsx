import type { Metadata } from "next";
import { FlashcardsClient } from "@/app/flashcards/FlashcardsClient";
import { starterMnemonics } from "@/utils/data";

export const metadata: Metadata = {
  title: "Flashcards",
  description: "Flip Hindi mnemonic flashcards with CSS-only animations."
};

export default function FlashcardsPage() {
  return <FlashcardsClient starterMnemonics={starterMnemonics} />;
}
