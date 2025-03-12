// models/Product.js
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Името не може да е празно!"],
    maxlength: [31, "Максимална дължина: 31 символа"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9а-яА-Я][a-zA-Z0-9а-яА-Я\s.,!?-]*$/.test(value);
      },
      message: "Името съдържа невалидни символи!",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
