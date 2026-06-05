import type { GeneratedSuggestion } from "@/types/mnemonic";

export async function generateWithAi(words: string[]): Promise<GeneratedSuggestion[]> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words })
  });

  if (!response.ok) {
    throw new Error("Failed to generate with AI");
  }

  const data = await response.json();
  return data.suggestions;
}
