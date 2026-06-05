import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { words } = await request.json();

    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json({ error: "Words are required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "minimax/minimax-01";

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const prompt = `You are a mnemonic generator. Given a list of words, create 3 unique and catchy mnemonic sentences in Hindi that help remember these words.
Each mnemonic should use the first letter of each word to form a Hindi sentence.
Provide the output in JSON format:
{
  "suggestions": [
    {
      "sentence": "The Hindi mnemonic sentence",
      "explanation": [
        { "key": "Hindi Letter", "value": "Original English/Hindi Word" }
      ]
    }
  ]
}

Words to remember: ${words.join(", ")}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://yaadmantra.vercel.app",
        "X-Title": "YaadMantra",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are a helpful assistant that generates creative Hindi mnemonics." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return NextResponse.json({ error: "Failed to generate mnemonics" }, { status: response.status });
    }

    const suggestions = data.choices[0].message.content;
    const parsed = typeof suggestions === "string" ? JSON.parse(suggestions) : suggestions;

    // Add unique IDs to suggestions
    const finalSuggestions = parsed.suggestions.map((s: any, index: number) => ({
      ...s,
      id: `ai-${Date.now()}-${index}`
    }));

    return NextResponse.json({ suggestions: finalSuggestions });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
