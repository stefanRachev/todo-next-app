import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
     select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authProvideId: {
     type: String 
    },
});

export const User = mongoose.models?.User ?? mongoose.model("User", userSchema);
