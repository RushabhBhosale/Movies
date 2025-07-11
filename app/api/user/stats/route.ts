import { getMediaDetails, getDetailedTVRuntime } from "@/hooks/useTmdb";
import clientPromise from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Please provide the userId" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const watchlistItems = await db
      .collection("watchlistitems")
      .find({ userId })
      .toArray();

    const statusCount: Record<string, number> = {};
    const genreMap: Record<string, number> = {};
    let totalMinutes = 0;
    let totalRating = 0;
    let ratingCount = 0;

    const mediaIds: string[] = [];

    for (const item of watchlistItems) {
      const { status, mediaId, type } = item;

      mediaIds.push(mediaId);

      statusCount[status] = (statusCount[status] || 0) + 1;

      if (status === "Completed") {
        let details;

        if (type === "tv") {
          details = await getDetailedTVRuntime(mediaId);
        } else {
          details = await getMediaDetails(mediaId, type);
        }

        const runtime = details.runtime || 0;
        totalMinutes += runtime;

        for (const genre of details.genres || []) {
          genreMap[genre.name] = (genreMap[genre.name] || 0) + 1;
        }

        if (details.vote_average) {
          totalRating += details.vote_average;
          ratingCount++;
        }
      }
    }

    const totalHours = totalMinutes / 60;
    const mostViewedGenre =
      Object.entries(genreMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    const avgRating = ratingCount
      ? (totalRating / ratingCount).toFixed(1)
      : "N/A";
    const completionRate = (
      ((statusCount["Completed"] || 0) / (watchlistItems.length || 1)) *
      100
    ).toFixed(1);

    return NextResponse.json(
      {
        data: {
          stats: {
            watching: statusCount["Watching"] || 0,
            completed: statusCount["Completed"] || 0,
            dropped: statusCount["Dropped"] || 0,
            onHold: statusCount["On-hold"] || 0,
          },
          totalHoursWatched: Math.round(totalHours * 10) / 10,
          totalMinutesWatched: Math.round(totalMinutes),
          mostViewedGenre,
          avgRating,
          completionRate: `${completionRate}%`,
          allGenres: genreMap,
          totalItems: watchlistItems.length,
          mediaIds,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Watchlist error:", err);
    return NextResponse.json(
      { error: "Internal Server Error. Getting the watchlist" },
      { status: 500 }
    );
  }
}
