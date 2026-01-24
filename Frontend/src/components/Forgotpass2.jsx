import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { useState } from "react";
import "../CSS/Forgotpass2.css";
import Ayur from "../assets/logp.jpg";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";
import { Navigate } from "react-router";
import axios from "axios";

export default function Forgotpass2() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setOtp] = useState("");
  const [newPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;
    if (!email || !code || !newPassword) {
      toast.error("Please fill in all fields..");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please Enter Valid Email!!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/resetpassword`,
        { email , code , newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <Navbar />
          <Navbar2 />
          <MainNav />
          <div className="log">
            <div className="imgsec">
              <img src={Ayur} alt="Yajveer" />
            </div>
            <div className="logform">
              <div className="mainlog">
                <div className="wel">
                  <p className="logn">Reset Password</p>
                  <p>Enter your details below.</p>
                </div>
                <div className="field">
                  <form className="logf" onSubmit={handleSubmit}>
                    <div className="usn">
                      <label htmlFor="email">Email : </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="usn">
                      <label htmlFor="otp">OTP : </label>
                      <input
                        type="text"
                        id="otp"
                        placeholder="Enter the OTP"
                        value={code}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="usn">
                      <label htmlFor="password">New Password : </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="forgot-btn2">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
