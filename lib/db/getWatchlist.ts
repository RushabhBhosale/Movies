import clientPromise from "@/utils/mongoDb";

export async function getWatchlist(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const watchlist = await db
      .collection("watchlistitems")
      .find({ userId })
      .sort({ addedAt: -1 })
      .toArray();

    return watchlist.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
}
