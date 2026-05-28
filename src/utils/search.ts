import type { Mnemonic } from "@/types/mnemonic";

const whitespacePattern = /\s+/g;

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase("hi-IN")
    .replace(whitespacePattern, " ")
    .trim();
}

export function mnemonicToSearchIndex(mnemonic: Mnemonic) {
  return normalizeSearchText(
    [
      mnemonic.title,
      mnemonic.mnemonic,
      mnemonic.category,
      mnemonic.difficulty,
      mnemonic.keywords.join(" "),
      mnemonic.explanation.map((item) => `${item.key} ${item.value} ${item.note ?? ""}`).join(" ")
    ].join(" ")
  );
}

export function searchMnemonics(mnemonics: Mnemonic[], query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return mnemonics;
  }

  const queryParts = normalizedQuery.split(" ").filter(Boolean);

  return mnemonics.filter((mnemonic) => {
    const index = mnemonicToSearchIndex(mnemonic);
    return queryParts.every((part) => index.includes(part));
  });
}
