import type { CategoryMeta } from "@/types/mnemonic";

export const categories: CategoryMeta[] = [
  {
    name: "Geography",
    slug: "geography",
    hindiName: "भूगोल",
    description: "देश, नदियां, महासागर, पर्वत और मानचित्र याद रखने के लिए।",
    accent: "var(--category-geography)",
    icon: "map"
  },
  {
    name: "History",
    slug: "history",
    hindiName: "इतिहास",
    description: "राजवंश, आंदोलनों, तिथियों और घटनाओं के स्मृति मंत्र।",
    accent: "var(--category-history)",
    icon: "scroll"
  },
  {
    name: "Science",
    slug: "science",
    hindiName: "विज्ञान",
    description: "भौतिकी, रसायन, जीवविज्ञान और सामान्य विज्ञान के सूत्र।",
    accent: "var(--category-science)",
    icon: "atom"
  },
  {
    name: "UPSC",
    slug: "upsc",
    hindiName: "यूपीएससी",
    description: "प्रशासन, संविधान, अर्थव्यवस्था और समसामयिकी के संकेत।",
    accent: "var(--category-upsc)",
    icon: "book"
  },
  {
    name: "SSC",
    slug: "ssc",
    hindiName: "एसएससी",
    description: "तेज रिवीजन, सामान्य ज्ञान और परीक्षा-उन्मुख याददाश्त।",
    accent: "var(--category-ssc)",
    icon: "target"
  },
  {
    name: "Coding",
    slug: "coding",
    hindiName: "कोडिंग",
    description: "कम्प्यूटर साइंस, वेब, एल्गोरिद्म और डेटाबेस के मंत्र।",
    accent: "var(--category-coding)",
    icon: "code"
  },
  {
    name: "Java Interview",
    slug: "java-interview",
    hindiName: "जावा इंटरव्यू",
    description: "जावा, JVM, OOP और इंटरव्यू कॉन्सेप्ट को याद करें।",
    accent: "var(--category-java)",
    icon: "coffee"
  },
  {
    name: "English Vocabulary",
    slug: "english-vocabulary",
    hindiName: "अंग्रेजी शब्दावली",
    description: "शब्द, अर्थ, prefix-suffix और exam vocabulary के लिए।",
    accent: "var(--category-english)",
    icon: "spark"
  }
];

export const categoryNames = categories.map((category) => category.name);
