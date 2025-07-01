import clientPromise from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const watchingItems = await db
      .collection("watchlistitems")
      .find({ userId, status: "Watching" })
      .project({ mediaId: 1, _id: 0 })
      .toArray();

    const mediaIds = watchingItems.map((item) => item.mediaId);

    return NextResponse.json({ mediaIds }, { status: 200 });
  } catch (err) {
    console.error("Error fetching watching list:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
