import mongoose, { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    mediaId: { type: String, required: true },
    type: { type: String, enum: ["movie", "tv"], required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;
