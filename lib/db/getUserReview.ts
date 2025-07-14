import clientPromise from "@/utils/mongoDb";

export async function getUserReview(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const review = await db
      .collection("reviews")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    console.log("asc", review);

    return review.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching review:", error);
    return [];
  }
}
