import { z } from "zod";

export const ReviewSchema = z.object({
  userId: z.string(),
  mediaId: z.string(),
  type: z.enum(["movie", "tv"]),
  review: z.string().min(1),
  rating: z.number().min(1).max(10),
});

export const ReviewUpdateSchema = z.object({
  id: z.string(),
  review: z.string().min(1),
  rating: z.number().min(1).max(10),
});
