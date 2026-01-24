import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { useState } from "react";
import "../CSS/Forgotpass.css";
import Ayur from "../assets/logp.jpg";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";
import { Navigate } from "react-router";
import axios from "axios";

export default function Forgotpassword() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const validate = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;

    if (!email || !emailRegex.test(email)) {
     toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(email)) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/forgotpassword`,
        { email },
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
    return <Navigate to="/forgotpassword1" replace />;
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
                  <p className="logn">Forgot Password</p>
                  <p>Enter your registered email</p>
                </div>
                <div className="field">
                  <form className="logf" onSubmit={handleSubmit}>
                    <div className="usn">
                      <label htmlFor="email">Email : </label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="forgot-btn3">
                      Send OTP
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
