import WatchListItem from "@/models/WatchlistItem";
import { WatchlistUpdateSchema } from "@/schema/WatchlistSchema";
import { STATUS } from "@/types/watchlist";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parsed = WatchlistUpdateSchema.parse(body);

    await connectDB();

    const updatedItem = await WatchListItem.findOneAndUpdate(
      { _id: parsed.id },
      { status: parsed.status },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: "Watchlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Watchlist item updated", data: updatedItem },
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
      { error: `Server error: ${error}` },
      { status: 500 }
    );
  }
}
