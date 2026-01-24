import mongoose from "mongoose";
const { Schema } = mongoose;
function generateOrderId(length = 10) {
  const chars =
    "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const productOrderSchema = new Schema(
  {
    productName : {
      type: String,
      required: true
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

const orderSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobilenumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit mobile number!`,
      },
    },
    deliveryAddress: { type: String, required: true },
    pincode: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{6}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 6-digit pincode!`,
      },
    },
    orderId: { type: String, unique: true, default: () => generateOrderId() },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    products: { type: [productOrderSchema], required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
