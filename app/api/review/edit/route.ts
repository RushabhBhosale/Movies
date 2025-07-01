import clientPromise from "@/utils/mongoDb";
import { ObjectId } from "mongodb";
import { ReviewUpdateSchema } from "@/schema/ReviewSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = ReviewUpdateSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("reviews").findOneAndUpdate(
      { _id: new ObjectId(parsed.id) },
      {
        $set: {
          rating: parsed.rating,
          review: parsed.review,
        },
      },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Review updated successfully", data: result.value },
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
