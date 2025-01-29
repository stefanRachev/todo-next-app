import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authProvideId: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["google", "github"],
  },
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.models?.User ?? mongoose.model("User", userSchema);
export { User };
