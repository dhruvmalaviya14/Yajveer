import { useState } from "react";
import "../CSS/signup.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router";
import LoadingAnimation from "./LoadingAnimation";

export default function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });


  const validate = () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;
    const phoneRegex = /^\d{10}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    if (!formData.mobileNumber || !phoneRegex.test(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/userregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        setPopupMessage(result.message);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Network error or server not responding.");
    } finally {
      setIsLoading(false);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingAnimation></LoadingAnimation>
      ) : (
        <>
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar></Navbar>
          <Navbar2></Navbar2>
          <MainNav></MainNav>
          <div className="signup-container">
            <div className="signup-img-section">
              <img src={Ayur} alt="Yajveer" />
            </div>
            <div className="signup-form">
              <div className="signup-main">
                <div className="signup-welcome">
                  <p className="signup-title">Register Here</p>
                  <p>Welcome to Yajveer!</p>
                  <p>Register your account</p>
                </div>
                <div className="signup-fields">
                  <form className="signup-form-elements" onSubmit={handleSubmit}>
                    <div className="signup-email">
                      <label htmlFor="email">Email : </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="signup-password">
                      <label htmlFor="password">Password : </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="signup-phone">
                      <label htmlFor="PhoneNo">Mobile No : </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Enter Your Mobile No"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <button className="signup-button">Sign Up</button>
                  </form>

                  <div className="signup-login-redirect">
                    <p className="signup-redirect-text">Already Have Account ? </p>
                    <Link to="/login">
                      <p className="signup-redirect-link">Login</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </>
      )}
    </>
  );
}
