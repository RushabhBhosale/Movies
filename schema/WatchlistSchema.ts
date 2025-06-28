import { z } from "zod";

export const WatchlistSchema = z.object({
  userId: z.string().min(1),
  mediaId: z.string().min(1),
  type: z.enum(["movie", "tv"]),
  status: z.enum(["Watching", "On-hold", "Dropped", "Completed"]),
});

export const WatchlistUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["Watching", "On-hold", "Dropped", "Completed"]),
});
