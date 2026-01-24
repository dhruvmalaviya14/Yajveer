import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import mongoose from "mongoose";
dotenv.config({ path: "./.env" });
import { buildInvoicePdf } from "./invoice.js";

const sendOtpMail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendSelfMail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Order Placed: ${order.orderId}`,
      text: `A new order has been placed:\n
          Full Name: ${order.fullname}
          Email: ${order.email}
          Mobile: ${order.mobilenumber}
          Delivery Address: ${order.deliveryAddress}
          Order ID: ${order.orderId}
          Total Amount: ${order.totalAmount}
          Payment Status: ${order.paymentStatus}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Self notification email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending self notification email:", error);
    throw error;
  }
};

const OrderConfirmation = async (to, order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Yajveer Store" <${process.env.EMAIL_USER}>`,
      to,
      subject: `🛍️ Thank You for Your Order! [Order ID: ${order.orderId}]`,
      text: `
Hi ${order.fullname},

Thank you for shopping with us at Yajveer!

We're excited to let you know that we've received your order and it's now being processed. Below are your order details:

🔹 Order ID: ${order.orderId}  
🔹 Name: ${order.fullname}  
🔹 Email: ${order.email}  
🔹 Phone: ${order.mobilenumber}  
🔹 Delivery Address: ${order.deliveryAddress}  
🔹 Total Amount: ₹${order.totalAmount}  
🔹 Payment Status: ${order.paymentStatus}


If you have any questions, feel free to reply to this email — we’re happy to help.

Thanks again for choosing Yajveer!  
Warm regards,  
**Team Yajveer**

🌐 Visit us: https://www.yajveer.in
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Customer confirmation email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending customer confirmation email:", error);
    throw error;
  }
};

const sendPaymentConfirmationMail = async (to, order, invoiceData) => {
  try {
    const pdfBuffer = await buildInvoicePdf(invoiceData);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Payment Successful - Order ${order.orderId}`,
      text: `Dear ${order.fullname},

      Your payment for Order ID: ${order.orderId} has been received successfully.

      Please find the invoice for your recent order attached as a PDF.

      Thank you for shopping with us!

      Best regards,
      From YajveerAyurved Team`,
      attachments: [
        {
          filename: `invoice-${order.orderId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Payment confirmation email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending payment confirmation email:", error);
    throw error;
  }
};

export { sendOtpMail, sendSelfMail, sendPaymentConfirmationMail , OrderConfirmation };
