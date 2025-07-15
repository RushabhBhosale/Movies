import { NextResponse } from "next/server";
import { fetchTmdbData } from "@/hooks/useTmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const prompt = `You are a movie recommendation expert. The user is trying to search for a movie or TV show using fuzzy or vague input if the user inputs a message like shahrukh khan movies or anything like movies on cars just give the output of movie or tvshow name related to that . Your job is to return the correct full name of the most likely movie or show. ONLY return the name. No explanations.\n\nUser input: "${query}"
  ONLY RETURN THE NAME EXAMPLE :- The dark knight or NARUTO or 3 Idiots if i type batmn its should be BATMAN
  `;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 30,
        }),
      }
    );

    const data = await response.json();
    const suggestionRaw = data?.choices?.[0]?.message?.content;
    const suggestion =
      typeof suggestionRaw === "string"
        ? suggestionRaw
            .split("\n")[0]
            .replace(/^\d+\.\s*/, "")
            .trim()
        : null;

    if (!suggestion) {
      return NextResponse.json({ results: [] });
    }

    const tmdbRes = await fetchTmdbData(
      `/search/multi?query=${encodeURIComponent(suggestion)}`
    );

    return NextResponse.json({ results: tmdbRes });
  } catch (err) {
    console.error("AI Search error", err);
    return NextResponse.json({ results: [] });
  }
}
