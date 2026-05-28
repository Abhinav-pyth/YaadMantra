import type { ExplanationItem, GeneratedSuggestion } from "@/types/mnemonic";
import { createLocalId } from "@/utils/storage";

const englishToHindi: Record<string, string> = {
  a: "अ",
  b: "ब",
  c: "क",
  d: "द",
  e: "इ",
  f: "फ",
  g: "ग",
  h: "ह",
  i: "इ",
  j: "ज",
  k: "क",
  l: "ल",
  m: "म",
  n: "न",
  o: "ओ",
  p: "प",
  q: "क",
  r: "र",
  s: "स",
  t: "त",
  u: "उ",
  v: "व",
  w: "व",
  x: "एक्स",
  y: "य",
  z: "ज"
};

const wordBank: Record<string, string[]> = {
  अ: ["अम्मा", "अकेले", "अजब", "अच्छा"],
  आ: ["आशा", "आलू", "आगे", "आनंद"],
  इ: ["इमरती", "इधर", "इच्छा", "इशारा"],
  ई: ["ईशा", "ईमान", "ईख", "ईश्वर"],
  उ: ["उमंग", "उड़न", "उज्ज्वल", "उपहार"],
  ए: ["एकता", "एड़ी", "एहसास", "एयर"],
  ओ: ["ओम", "ओढ़नी", "ओस", "ओपन"],
  क: ["काका", "किरण", "किताब", "कसम"],
  ख: ["खुश", "खीर", "खिड़की", "खजाना"],
  ग: ["गुड्डू", "गंगा", "गुलाब", "गुरु"],
  घ: ["घर", "घंटी", "घोड़ा", "घूमे"],
  च: ["चंदू", "चाय", "चंचल", "चिड़िया"],
  ज: ["जादू", "जल्दी", "जंगल", "जीत"],
  ट: ["टॉफी", "टापू", "टोपी", "टिकट"],
  ड: ["डब्बा", "डोरी", "डगर", "डमरू"],
  त: ["तारा", "तुलसी", "तुरंत", "तैयार"],
  द: ["दीपा", "दिल", "दादी", "दंगल"],
  न: ["नानी", "नटखट", "नया", "नदी"],
  प: ["पापा", "परी", "पुस्तक", "पीतल"],
  फ: ["फूफा", "फूल", "फिर", "फुर्ती"],
  ब: ["बबलू", "बहन", "बाज़ार", "बादल"],
  भ: ["भैया", "भालू", "भोजन", "भारत"],
  म: ["मामा", "मिठाई", "मेला", "मन"],
  य: ["यश", "याद", "यात्रा", "योग"],
  र: ["रानी", "रास्ता", "रंग", "रवि"],
  ल: ["लालू", "लड्डू", "लता", "लहर"],
  व: ["वाणी", "विजय", "वादा", "वृक्ष"],
  श: ["शिव", "शांति", "शेर", "शाला"],
  स: ["सीमा", "सोनू", "सपना", "सागर"],
  ह: ["हरी", "हवा", "हंस", "हिम्मत"],
  एक्स: ["एक्सरे", "एक्स्ट्रा", "एक्सप्रेस", "एक्साइटेड"]
};

const bridges = ["ने", "से", "को", "भी", "फिर", "और", "संग", "जल्दी"];

function firstUsefulCharacter(word: string) {
  const trimmed = word.trim();
  if (!trimmed) {
    return "य";
  }

  const first = trimmed.charAt(0).toLocaleLowerCase("en-US");

  if (englishToHindi[first]) {
    return englishToHindi[first];
  }

  return trimmed.charAt(0);
}

function pickHindiWord(seed: string, position: number, variant: number) {
  const bank = wordBank[seed] ?? [seed];
  return bank[(position + variant) % bank.length];
}

function sentenceFromSeeds(seeds: string[], variant: number) {
  return seeds
    .map((seed, index) => {
      const word = pickHindiWord(seed, index, variant);
      const shouldBridge = index < seeds.length - 1 && (index + variant) % 2 === 0;
      return shouldBridge ? `${word} ${bridges[(index + variant) % bridges.length]}` : word;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseWords(input: string) {
  return input
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export function generateMnemonicSuggestions(input: string): GeneratedSuggestion[] {
  const words = parseWords(input);

  if (words.length < 2) {
    return [];
  }

  const seeds = words.map(firstUsefulCharacter);
  const explanation: ExplanationItem[] = words.map((word, index) => ({
    key: seeds[index],
    value: word
  }));

  return Array.from({ length: Math.min(5, Math.max(3, words.length)) }, (_, index) => ({
    id: createLocalId("generated"),
    sentence: sentenceFromSeeds(seeds, index),
    explanation
  }));
}

export function explanationToText(explanation: ExplanationItem[]) {
  return explanation.map((item) => `${item.key} = ${item.value}`).join("\n");
}

export function textToExplanation(value: string): ExplanationItem[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.includes("=") ? "=" : line.includes("-") ? "-" : ":";
      const [rawKey, ...rest] = line.split(separator);
      return {
        key: rawKey?.trim() || "संकेत",
        value: rest.join(separator).trim() || line
      };
    });
}
