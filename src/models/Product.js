// models/Product.js
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
