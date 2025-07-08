import { z } from "zod";

export const WatchlistSchema = z.object({
  userId: z.string().min(1),
  mediaId: z.number().min(1),
  type: z.enum(["movie", "tv"]),
  status: z.enum([
    "Watching",
    "On-Hold",
    "Dropped",
    "Completed",
    "Watch Later",
  ]),
  userRating: z.number().min(1).max(10).optional().nullable(),
  lastEpisodeId: z.number().optional().nullable(),
  lastSeasonId: z.number().optional().nullable(),
  globalEpisodeNo: z.number().optional().nullable(),
  review: z.string().optional().nullable(),
  details: z.any().optional(),
});

export const WatchlistUpdateSchema = z.object({
  id: z.string().min(1),
  status: z
    .enum(["Watching", "On-hold", "Dropped", "Completed", "Watch Later"])
    .optional(),
  userRating: z.number().min(1).max(10).optional().nullable(),
  lastEpisodeId: z.number().optional().nullable(),
  lastSeasonId: z.number().optional().nullable(),
  globalEpisodeNo: z.number().optional().nullable(),
  review: z.string().optional().nullable(),
});
