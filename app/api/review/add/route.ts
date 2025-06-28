import { connectDB } from "@/utils/db";
import Review from "@/models/Review";
import { ReviewSchema } from "@/schema/ReviewSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ReviewSchema.parse(body);

    await connectDB();

    const review = await Review.create(parsed);

    return NextResponse.json(
      { message: "Review added successfully", data: review },
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
      { error: "Server Error", details: error },
      { status: 500 }
    );
  }
}
