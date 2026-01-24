import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import "../CSS/CheckoutForm.css";

const CheckoutForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const cartTotal = useSelector((state) =>
    state.cart.items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0)
  ).toFixed(2);

  const buildProductsPayload = () =>
    cartItems.map((item) => ({
      productName : item.productName,
      productId: item._id,
      weightInGrams: parseInt(item.selectedWeight),
      quantity: item.quantity,
      basePrice: Number(item.price),
      actualPrice: Number(item.price) * item.quantity,
    }));

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]{3,30}$/.test(formData.name)) {
      newErrors.name = "Enter a valid name (3-30 characters)";
    } else if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    } else if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    } else if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Address should be at least 10 characters long";
    } else if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    Object.values(newErrors).forEach((msg) => toast.error(msg));

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderPayload = {
      fullname: formData.name.trim(),
      email: formData.email.trim(),
      mobilenumber: formData.mobile.trim(),
      deliveryAddress: formData.address.trim(),
      pincode: formData.pincode.trim(),
      totalAmount: Number(cartTotal),
      products: buildProductsPayload(),
    };

    setIsLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/orders/create/`,
        orderPayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Order placed successfully!");
      dispatch(clearCart());       
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        pincode: "",
      });
      onClose(); // close the modal
      navigate("/greeting");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="checkout-form-container">
      <div className="form-header">
        <h2>Checkout Details</h2>
        <button
          className="close-form-btn"
          onClick={onClose}
          type="button"
          aria-label="Close checkout form"
        >
          <IoClose />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="total-amount">
            <span>Total Amount:</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>

        <p className="delivery-note">All taxes included. Delivery charge (up to ₹100) is extra.</p>

        <button type="submit" className="proceed-payment-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
