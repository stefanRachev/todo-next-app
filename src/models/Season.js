// models/Season.js
import mongoose, { Schema } from "mongoose";

const seasonSchema = new Schema(
  {
    user: { type: String, required: true, index: true },
    totalBags: { type: Number, required: true },
    totalTons: { type: Number, required: true },
    firstDate: { type: String, required: true },
    lastDate: { type: String, required: true },
    dates: [String],
  },
  { timestamps: true }
);

export const Season =
  mongoose.models.Season ?? mongoose.model("Season", seasonSchema);
