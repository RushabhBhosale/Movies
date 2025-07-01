import clientPromise from "@/utils/mongoDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const watchlistItemId = searchParams.get("watchlistItemId");

    if (!watchlistItemId) {
      return NextResponse.json(
        { error: "Please provide the watchlistItemId" },
        { status: 404 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("watchlistitems")
      .deleteOne({ _id: new ObjectId(watchlistItemId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server Error. Deleting watchlist item: ${error}` },
      { status: 500 }
    );
  }
}
