import { Link } from "react-router";
import { useState, useEffect } from "react";
import "../CSS/navbar.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";

export default function Navbar() {
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
        toast.error("Logout failed: " + result.message);
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

  return (
    <>
      {isLoading ? (
        <LoadingAnimation></LoadingAnimation>
      ) : (
        <>
          <nav className="navbar">
            <div className="navbar-left">
              <Link to="/aboutUs">
                <p>About Us</p>
              </Link>
              <Link to="/returnpolicy">
                <p>Returns Policy</p>
              </Link>
              <Link to="/faq">
                  <p>FAQs</p>
              </Link>
            </div>
            <div className="navbar-right">
              <div className="navbar-dropdown">
                <p>Help Center</p>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="tel:+917405430230">
                      <i className="bi bi-headset"></i> Call Center
                    </Link>
                  </li>
                  <li>
                    <i className="bi bi-chat-dots"></i> Live Chat
                  </li>
                </ul>
              </div>
              <i className="bi bi-person-circle"></i>
              {!isLoggedIn ? (
                <Link to="/login">
                  <button className="account-button">My Account</button>
                </Link>
              ) : (
                <button className="account-button" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
