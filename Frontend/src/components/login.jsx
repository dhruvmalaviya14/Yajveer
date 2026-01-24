import { useState } from "react";
import "../CSS/login.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar1 from "./Home/sidebar1";
import Sidebar from "./Home/sidebar";
import { Navigate } from "react-router";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import { toast } from "react-hot-toast";
export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  const validate = () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;

    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
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
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/userlogin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.success) {
        sessionStorage.setItem("isLoginUser", "true");
        toast.success(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        sessionStorage.setItem("isLoginUser", "false");
        toast.error(result.message);
      }
    } catch (error) {
      sessionStorage.setItem("isLoginUser", "false");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  if (redirect) {
    return <Navigate to="/" replace />;
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
          <div className="log">
            <div className="imgsec">
              <img src={Ayur} alt="Yajveer" />
            </div>
            <div className="logform ">
              <div className="mainlog">
                <div className="wel">
                  <p className="logn">Login</p>
                  <p>Welcome to Yajveer!</p>
                  <p>Login to your account</p>
                </div>
                <div className="field">
                  <form action="" className="logf" onSubmit={handleSubmit}>
                    <div className="usn">
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
                    <div className="usp">
                      <label htmlFor="password">Password : </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <Link to="/forgotpassword">
                      <p>Forgot Your Password</p>
                    </Link>
                    <button>Login</button>
                  </form>

                  <div className="newus">
                    <p className="ne">New User ? </p>
                    <Link to="/signUp">
                      <p className="ne1">SignUp</p>
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
