import "../../CSS/Home/sidebar1.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../LoadingAnimation";
import { useSelector } from "react-redux";

export default function Sidebar1({ onClose }) {
  const { data: products } = useSelector((state) => state.cart);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLoginUser") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/userlogout`,
        {},
        { withCredentials: true }
      );

      const result = response.data;
      if (result.success) {
        sessionStorage.setItem("isLoginUser", "false");
        setIsLoggedIn(false);
        toast.success("Logout successful");
      } else {
        setPopupMessage("Logout failed: " + result.message);
      }
    } catch (error) {
      sessionStorage.setItem("isLoginUser", "true");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="sidebar1-overlay">
      <div className="sidebar1-content">
        <div className="sdclose" onClick={onClose}>
          <i className="bi bi-x-lg closeico"></i>
        </div>
        <div className="sidebar1cont">
          {products &&
            products.map((item) => (
              <div className="side1con1" key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <div className="itemsName1" onClick={onClose}>
                    <p>{item.productName}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        <div className="contactSection">
          <h3 className="contactHeader">Contact</h3>
          <Link to="tel:+917405430230">
            <div className="contactItem">
              <i className="bi bi-telephone-fill"></i>
              <span>+91 74054 30230</span>
            </div>
          </Link>

          <Link to="mailto:yajveerayurved@gmail.com">
            <div className="contactItem">
              <i className="bi bi-envelope-fill"></i>
              <span>yajveerayurved@gmail.com</span>
            </div>
          </Link>

          <div className="authSection">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="authLink">
                  Login
                </Link>
                <span>/</span>
                <Link to="/signup" className="authLink">
                  Signup
                </Link>
                <span>/</span>
              </>
            ) : (
              <button className="authLink" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
