// Order.jsx
import "../CSS/Order.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingAnimation from "./LoadingAnimation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { deleteOrder, addOrder } from "../Redux/Order.js"; // Make sure addOrder is implemented!
import { orderhistorydata } from "../Redux/OrderHistory.js";
import axios from "axios";
import { io } from "socket.io-client";

export default function Order() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: orders } = useSelector((state) => state.order);
  console.log(orders);

  
  useEffect(() => {
    const socket = io("https://back.yajveer.in", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("newOrder", (order) => {
      dispatch(addOrder(order));
      toast.success("New order received!");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + (product.actualPrice || 0),
      0
    );
  };

  const handleStatusChange = async (orderId) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/admin/orders/${orderId}/markdone`
      );
      dispatch(deleteOrder(orderId));
      dispatch(orderhistorydata());
      toast.success("Order archived successfully.");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to archive order!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <>
      <div className="orders-dashboard">
        <h1 className="dashboard-title">Customer Orders</h1>

        {orders && orders.length > 0 ? (
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Created At</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th className="payment-status-header">
                    <div>Payment</div>
                    <div>Status</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="order-id">{order.orderId}</td>
                    <td className="customer-info">
                      <div className="customer-name">{order.fullname}</div>
                      <div className="customer-email">{order.email}</div>
                    </td>
                    <td className="customer-phone">{order.mobilenumber}</td>
                    <td className="customer-address">
                      {order.deliveryAddress}, {order.pincode}
                    </td>
                    <td className="created-at">
                      <p>{new Date(order.createdAt).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}</p>
                    </td>
                    <td className="products-info">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          <div className="product-name">
                            {product.productId?.productName || product.productName || "N/A"}
                          </div>
                          <div className="product-details">
                            <span>{product.weightInGrams}g</span>
                            <span>Qty: {product.quantity}</span>
                            <span>₹{product.basePrice}</span>
                            <span>₹{product.actualPrice}</span>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="order-total">
                      ₹{calculateTotal(order.products)}
                    </td>
                    <td className="order-status">
                      <button
                        className="status-button pending"
                        onClick={() => handleStatusChange(order.orderId)}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-orders">No orders found</div>
        )}
      </div>
    </>
  );
}
