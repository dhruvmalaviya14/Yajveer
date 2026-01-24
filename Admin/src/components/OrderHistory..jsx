import "../CSS/OrderHistory.css";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const { data: orderhistory } = useSelector((state) => state.orderhistory);

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + (product.actualPrice || 0),
      0
    );
  };

  return (
    <div className="order-history-dashboard">
      <h1 className="dashboard-title">Order History</h1>
      {orderhistory && orderhistory.length > 0 ? (
        <div className="table-container">
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Products</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderhistory.map((order, index) => (
                <>
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
                      {order.products.map((product, idx) => (
                        <div key={idx} className="product-item">
                          <div className="product-name">
                            {product.productId?.productName || "N/A"}
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
                  </tr>
                  {/* Add separator line after each order except last */}
                  {index !== orderhistory.length - 1 && (
                    <tr className="order-separator">
                      <td colSpan="5"></td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">No order history found</div>
      )}
    </div>
  );
}
