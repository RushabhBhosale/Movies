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
      enum: ["Watching", "On-hold", "Dropped", "Completed"],
      default: "Watching",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WatchListItem =
  models.WatchListItem || model("WatchListItem", watchListItemSchema);
export default WatchListItem;
