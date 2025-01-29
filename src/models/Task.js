import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9а-яА-Я][a-zA-Z0-9а-яА-Я\s.,!?-]*$/.test(value);
      },
      message: "Текстът съдържа невалидни символи!",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
