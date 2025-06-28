import { connectDB } from "@/utils/db";
import Review from "@/models/Review";
import { ReviewUpdateSchema } from "@/schema/ReviewSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = ReviewUpdateSchema.parse(body);

    await connectDB();

    const updatedReview = await Review.findByIdAndUpdate(
      parsed.id,
      {
        rating: parsed.rating,
        review: parsed.review,
      },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Review updated successfully", data: updatedReview },
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
      { error: error instanceof Error ? error.message : "Server Error" },
      { status: 500 }
    );
  }
}
