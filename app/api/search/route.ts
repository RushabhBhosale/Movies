import { fetchTmdbData } from "@/hooks/useTmdb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) return NextResponse.json({ results: [] });

  try {
    const results = await fetchTmdbData(
      `/search/multi?query=${encodeURIComponent(query)}`
    );

    const filtered = results.filter(
      (item: any) => item.media_type === "movie" || item.media_type === "tv"
    );

    return NextResponse.json({ results: filtered });
  } catch (err) {
    console.error("Search API failed", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
