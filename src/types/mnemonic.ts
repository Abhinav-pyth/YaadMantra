export type Difficulty = "Easy" | "Medium" | "Hard";

export type CategoryName =
  | "Geography"
  | "History"
  | "Science"
  | "UPSC"
  | "SSC"
  | "Coding"
  | "Java Interview"
  | "English Vocabulary";

export type MnemonicSource = "starter" | "custom";

export type ExplanationItem = {
  key: string;
  value: string;
  note?: string;
};

export type Mnemonic = {
  id: string;
  title: string;
  mnemonic: string;
  explanation: ExplanationItem[];
  category: CategoryName;
  difficulty: Difficulty;
  keywords: string[];
  source: MnemonicSource;
};

export type CustomMnemonic = Mnemonic & {
  source: "custom";
  createdAt: string;
  updatedAt: string;
};

export type CategoryMeta = {
  name: CategoryName;
  slug: string;
  hindiName: string;
  description: string;
  accent: string;
  icon: "map" | "scroll" | "atom" | "book" | "target" | "code" | "coffee" | "spark";
};

export type GeneratedSuggestion = {
  id: string;
  sentence: string;
  explanation: ExplanationItem[];
};
