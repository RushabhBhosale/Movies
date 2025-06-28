import WatchListItem from "@/models/WatchlistItem";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          error: "Please provide the userId",
        },
        {
          status: 404,
        }
      );
    }

    await connectDB();

    const watchlist = await WatchListItem.find({ userId });

    if (watchlist.length < 0) {
      return NextResponse.json(
        {
          message: "Nothing added to the list",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        data: watchlist,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Server Error. Getting the watchlist ${error}`,
      },
      { status: 500 }
    );
  }
}
