import mongoose, { model, models } from "mongoose";

const watchListItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Watching", "On-Hold", "Dropped", "Completed", "Plan to Watch"],
      default: "Watching",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    season: {
      type: Number,
    },
    episode: {
      type: Number,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WatchListItem =
  models.WatchListItem || model("WatchListItem", watchListItemSchema);
export default WatchListItem;
