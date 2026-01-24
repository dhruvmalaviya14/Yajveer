import mongoose from "mongoose";
const { Schema } = mongoose;
const productOrderSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    weightInGrams: { type: Number, required: true },
    quantity: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
  },
  { _id: false }
);

const orderHistorySchema = new Schema(
  {
    fullname: String,
    email: String,
    mobilenumber: String,
    deliveryAddress: String,
    pincode: Number,
    orderId: String,
    totalAmount: Number,
    paymentStatus: String,
    products: [productOrderSchema],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
