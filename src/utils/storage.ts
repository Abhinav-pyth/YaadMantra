export const STORAGE_KEYS = {
  favorites: "yaadmantra:favorites:v1",
  customMnemonics: "yaadmantra:custom-mnemonics:v1",
  theme: "yaadmantra:theme:v1",
  streak: "yaadmantra:streak:v1",
  quizBest: "yaadmantra:quiz-best:v1"
} as const;

export function safeReadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWriteStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createLocalId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${randomPart}`;
}
