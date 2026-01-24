import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { removeFromCart, updateQuantity, clearCart } from "../Redux/CartSlice";
import { toast } from "react-hot-toast";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import ConfirmModal from "./ConfirmModal";
import CheckoutForm from "./CheckoutForm";
import "../CSS/Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) =>
    state.cart.items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0)
  ).toFixed(2);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleQuantityChange = (item, change) => {
    const currentQuantity = parseInt(item.quantity) || 1;
    const newQuantity = currentQuantity + change;

    // Don't allow quantities below 1
    if (newQuantity < 1) return;

    // Prevent duplicate updates while processing
    const updateKey = `${item._id}-${item.selectedWeight}`;
    if (updatingItems.has(updateKey)) return;

    // Add item to updating set to prevent duplicate updates
    setUpdatingItems((prev) => new Set([...prev, updateKey]));

    // Dispatch update action
    if (newQuantity === 0) {
      handleRemoveItem(item);
    } else {
      dispatch(
        updateQuantity({
          _id: item._id,
          selectedWeight: item.selectedWeight,
          quantity: newQuantity,
        })
      );
      toast.success("Quantity updated");
    }

    // Remove from updating set after a short delay
    setTimeout(() => {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(updateKey);
        return newSet;
      });
    }, 300);
  };
  const handleRemoveItem = (item) => {
    const updateKey = `${item._id}-${item.selectedWeight}`;

    if (updatingItems.has(updateKey)) return;

    setModalConfig({
      isOpen: true,
      title: "Remove Item",
      message: "Are you sure you want to remove this item from your cart?",
      onConfirm: () => {
        setUpdatingItems((prev) => new Set([...prev, updateKey]));

        dispatch(
          removeFromCart({
            _id: item._id,
            selectedWeight: item.selectedWeight,
          })
        );

        toast.success("Item removed from cart");

        setTimeout(() => {
          setUpdatingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(updateKey);
            return newSet;
          });
        }, 300);
      },
    });
  };

  const handleClearCart = () => {
    setModalConfig({
      isOpen: true,
      title: "Clear Cart",
      message: "Are you sure you want to remove all items from your cart?",
      onConfirm: () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCheckoutForm(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseCheckout = () => {
    setShowCheckoutForm(false);
    document.body.style.overflow = "auto"; 
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="cart-container">
        <h1>Your Cart ({cartItems.length} items)</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-header">
              <span className="header-item">Item</span>
              <span className="header-price">Price</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total</span>
            </div>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedWeight}`}
                  className="cart-item"
                >
                  <div className="item-info">
                    {" "}
                    <div className="item-image">
                      <img
                        src={
                          Array.isArray(item.photos) && item.photos.length > 0
                            ? item.photos[0]
                            : item.image || "/yajveer-logo.jpg"
                        }
                        alt={item.productName}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/yajveer-logo.jpg";
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h3>{item.productName}</h3>
                      <p className="item-weight">
                        Weight: {item.selectedWeight}
                      </p>
                      <button
                        className="remove-item"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="item-price">
                    ₹{parseFloat(item.price).toFixed(2)}
                  </div>{" "}
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                      disabled={parseInt(item.quantity) <= 1}
                    >
                      −
                    </button>
                    <span>{parseInt(item.quantity)}</span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                      disabled={updatingItems.has(
                        `${item._id}-${item.selectedWeight}`
                      )}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                  ₹
                    {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                      2
                    )}
                  </div>
                </div>
              ))}
            </div>{" "}
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-button" onClick={handleCheckout}>
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      />
      {showCheckoutForm && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <CheckoutForm onClose={handleCloseCheckout} cartTotal={cartTotal} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
