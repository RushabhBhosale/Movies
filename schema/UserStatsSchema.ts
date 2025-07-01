import { z } from "zod";

export const UserStatsSchema = z.object({
  userId: z.string().min(1),
  totalWatchedMinutes: z.number(),
  avgRating: z.number().optional(),
  mostViewedGenre: z.string().optional(),
  genreCount: z.record(z.number()),
  statusCount: z.object({
    Watching: z.number(),
    Completed: z.number(),
    Dropped: z.number(),
    "On-Hold": z.number(),
  }),
  updatedAt: z.date(),
});
