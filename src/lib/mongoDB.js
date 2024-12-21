//lib/mongoDB.js



import mongoose from "mongoose";

console.log("MONGODB_URI in runtime:", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectToDatabase;
