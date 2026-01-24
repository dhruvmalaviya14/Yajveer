import React, { useState } from "react";
import "../../CSS/Footer/ContactUs.css";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import MainNav from "../mainnav";
import Footer from "./Footer";
import Sidebar from "../Home/sidebar";
import Sidebar1 from "../Home/sidebar1";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingAnimation from "../LoadingAnimation";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Select a subject");

  const validate = () => {
    const newErrors = {};
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Invalid email";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number";
    else if (!subjects.includes(formData.subject))
      newErrors.subject = "Select a valid subject";
    else if (!formData.message.trim())
      newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors).join(", "));
      return false;
    }

    return true;
  };

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Order Status",
    "Other",
  ];

  const handleSubjectSelect = (subject) => {
    setFormData({ ...formData, subject });
    setSelectedSubject(subject);
    setIsDropdownOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("subject", formData.subject.toLowerCase());
    payload.append("message", formData.message);


    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/contactus`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSelectedSubject("Select Subject");
    } catch (err) {
      console.error("Error submitting review:", err.response?.data || err);

      if (err.response) {
        if (err.response.status === 401) {
          toast.error("Please login to submit a review.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(
            err.response.data.message || "Failed to submit . Please try again."
          );
        }
      } else {
        console.error("Error submitting review:", err);
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
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar />
          <Navbar2></Navbar2>
          <MainNav></MainNav>

          <div className="contact-container">
            <div className="map-container">
              {" "}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.053170918609!2d72.96525697530076!3d21.269362779471205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be046985d6c0e71%3A0xad929c7d3ca842d9!2sMG%20Dreams!5e0!3m2!1sen!2sin!4v1747919794962!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="form-container">
              <h2 className="form-title">Contact Us</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <div className="subject-select-container">
                    <div
                      className="selected-option"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedSubject}
                      <i
                        className={`bi bi-caret-down-fill ${
                          isDropdownOpen ? "rotate" : ""
                        }`}
                      ></i>
                    </div>
                    <div
                      className={`options-list ${isDropdownOpen ? "show" : ""}`}
                    >
                      {subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="option"
                          onClick={() => handleSubjectSelect(subject)}
                        >
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default ContactUs;
