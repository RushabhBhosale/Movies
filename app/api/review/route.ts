import Review from "@/models/Review";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await connectDB();

    const reviews = await Review.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ data: reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error: ${error}` },
      { status: 500 }
    );
  }
}
