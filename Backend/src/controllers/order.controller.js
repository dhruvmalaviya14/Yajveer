import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { OrderHistory } from "../models/orderhistory.model.js";
import { sendSelfMail, sendPaymentConfirmationMail } from "../utils/mail.js";
import { OrderConfirmation } from "../utils/mail.js";
import { shapeOrderForInvoice } from "../utils/shapeOrderForInvoice.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fsSync from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logoPath = path.resolve(__dirname, "..", "..", "public", "logo.png");

const logoBase64 = fsSync.readFileSync(logoPath).toString("base64");
const logoUrl = `data:image/png;base64,${logoBase64}`;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^\d{10}$/;

const createOrder = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    mobilenumber,
    deliveryAddress,
    pincode,
    totalAmount,
    products,
  } = req.body;

  if (
    [fullname, email, mobilenumber, deliveryAddress, pincode].some(
      (field) => !field || !field.trim()
    ) ||
    totalAmount === undefined ||
    totalAmount === null ||
    !Array.isArray(products) ||
    products.length === 0
  ) {
    throw new ApiError(400, "All fields and at least one product are required");
  }

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email address format");
  }
  if (!mobileRegex.test(mobilenumber)) {
    throw new ApiError(400, "Mobile number must be exactly 10 digits.");
  }

  const orderData = {
    fullname,
    email,
    mobilenumber,
    deliveryAddress,
    pincode,
    totalAmount,
    paymentStatus: "pending",
    products,
  };

  const order = await Order.create(orderData);

  if (!order) {
    throw new ApiError(500, "Failed to create order");
  }

  const io = req.app.get("io");
  io.emit("newOrder", order);

  try {
    await sendSelfMail(order);
    await OrderConfirmation(order.email , order);
  } catch (error) {
    console.error(
      "Failed to send self notification email & Invoice of User:",
      error
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

const markPaymentDoneAndArchive = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  if (!orderId?.trim()) {
    throw new ApiError(400, "Order ID is required");
  }

  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.paymentStatus = "done";
  await order.save();
  const invoiceData = {
    ...shapeOrderForInvoice(order),
    logoUrl,
  };

  try {
    await sendPaymentConfirmationMail(order.email, order, invoiceData);
  } catch (error) {
    console.error("Failed to send payment confirmation email:", error);
  }

  const historyEntry = await OrderHistory.create({
    ...order.toObject(),
    completedAt: new Date(),
  });
  await Order.deleteOne({ orderId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        historyEntry,
        "Order archived successfully and user notified"
      )
    );
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("products.productId");
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

const getAllOrderHistory = asyncHandler(async (req, res) => {
  const orderHistory = await OrderHistory.find()
    .sort({ completedAt: -1 })
    .populate("products.productId");
  return res
    .status(200)
    .json(
      new ApiResponse(200, orderHistory, "Order history retrieved successfully")
    );
});

export {
  createOrder,
  markPaymentDoneAndArchive,
  getAllOrders,
  getAllOrderHistory,
};
