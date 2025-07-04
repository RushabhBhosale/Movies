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

    const reviews = await db
      .collection("reviews")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ data: reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Server error: ${
          error instanceof Error ? error.message : error
        }`,
      },
      { status: 500 }
    );
  }
}
