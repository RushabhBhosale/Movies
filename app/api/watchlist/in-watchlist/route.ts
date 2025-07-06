import clientPromise from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const mediaId = Number(searchParams.get("mediaId"));
  const type = searchParams.get("type");

  if (!userId || !mediaId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("watchlistitems");

  const item = await collection.findOne({ userId, mediaId });

  return NextResponse.json({ inWatchlist: !!item, data: item });
}
