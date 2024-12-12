import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
   
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
});


export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
