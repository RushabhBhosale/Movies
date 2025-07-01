import clientPromise from "@/utils/mongoDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const DeleteReviewSchema = z.object({
  id: z.string().min(1, "Review ID is required"),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parsed = DeleteReviewSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("reviews")
      .deleteOne({ _id: new ObjectId(parsed.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Review deleted successfully" },
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
      {
        error: error instanceof Error ? error.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
