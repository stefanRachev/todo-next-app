import mongoose, { Schema } from "mongoose";

const pelletSchema = new Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true, 
  },
  bags: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const Pellet =
  mongoose.models.Pellet ?? mongoose.model("Pellet", pelletSchema);
