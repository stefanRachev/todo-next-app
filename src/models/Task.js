import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

export default mongoose.model("Task", taskSchema);
