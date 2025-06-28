import WatchListItem from "@/models/WatchlistItem";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const watchlistItemId = searchParams.get("watchlistItemId");

    if (!watchlistItemId) {
      return NextResponse.json(
        {
          error: "Please provide the watchlistItemId",
        },
        {
          status: 404,
        }
      );
    }

    await connectDB();

    const deletedItem = await WatchListItem.findByIdAndDelete(watchlistItemId);

    if (!deletedItem) {
      return NextResponse.json(
        {
          error: "Item not found or already deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Item deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server Error. Deleting watchlist item: ${error}` },
      { status: 500 }
    );
  }
}
