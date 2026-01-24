import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    photos: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 7;
        },
        message: "You can upload a maximum of 7 photos.",
      },
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      // in percentage
      type: Number,
      min: 0,
      max: 100,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot be more than 5"],
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["box", "pouch"],
        message: 'Product type must be either "box" or "pouch".',
      },
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
