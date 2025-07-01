import { WatchlistSchema } from "@/schema/WatchlistSchema";
import clientPromise from "@/utils/mongoDb";
import { fetchTmdbData, getMediaDetails } from "@/hooks/useTmdb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = WatchlistSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    const users = db.collection("users");
    const watchlist = db.collection("watchlistitems");

    const user = await users.findOne({ _id: new ObjectId(parsed.userId) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existing = await watchlist.findOne({
      userId: parsed.userId,
      mediaId: parsed.mediaId,
      type: parsed.type,
    });

    if (existing) {
      return NextResponse.json({ message: "Already in watchlist" });
    }

    const mediaData = await fetchTmdbData(`/${parsed.type}/${parsed.mediaId}`);

    const result = await watchlist.insertOne({
      ...parsed,
      details: mediaData,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Added to watchlist",
        data: { _id: result.insertedId, ...parsed, mediaData },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server Error" },
      { status: 500 }
    );
  }
}
