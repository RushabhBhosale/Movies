import clientPromise from "@/utils/mongoDb";
import { WatchlistUpdateSchema } from "@/schema/WatchlistSchema";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = WatchlistUpdateSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("watchlistitems");

    const updatePayload: Record<string, any> = {
      status: parsed.status,
    };

    if (parsed.lastSeason !== undefined) {
      updatePayload.lastSeason = parsed.lastSeason;
    }

    if (parsed.lastEpisode !== undefined) {
      updatePayload.lastEpisode = parsed.lastEpisode;
    }

    const updated = await collection.findOneAndUpdate(
      { _id: new ObjectId(parsed.id) },
      { $set: updatePayload },
      { returnDocument: "after" }
    );

    if (!updated.value) {
      return NextResponse.json(
        { error: "Watchlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Watchlist item updated", data: updated.value },
      { status: 200 }
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
      {
        error: `Server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
