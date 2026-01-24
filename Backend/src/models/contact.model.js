import mongoose from "mongoose";
const { Schema } = mongoose;

const allowedSubjects = [
  "general inquiry",
  "product information",
  "order status",
  "other",
];

const contactSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      enum: allowedSubjects,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
export { allowedSubjects };
