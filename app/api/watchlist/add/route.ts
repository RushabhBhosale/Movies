import User from "@/models/User";
import WatchListItem from "@/models/WatchlistItem";
import { WatchlistSchema } from "@/schema/WatchlistSchema";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = WatchlistSchema.parse(body);

    await connectDB();

    const user = await User.findById(parsed.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existing = await WatchListItem.findOne({
      userId: parsed.userId,
      mediaId: parsed.mediaId,
      type: parsed.type,
    });

    if (existing) {
      return NextResponse.json({ message: "Already in watchlist" });
    }

    const item = await WatchListItem.create(parsed);

    return NextResponse.json(
      { message: "Added to watchlist", data: item },
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
