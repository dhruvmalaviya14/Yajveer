import React, { useState, useEffect } from "react";
import "../CSS/AboutUs.css";
import yajveerLogo from "../assets/Jamun.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";

const Counter = ({ label, duration = 1000, displayValue }) => {
  const [show, setShow] = useState("0");

  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;
    const interval = duration / totalFrames;

    const timer = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        clearInterval(timer);
        setShow(displayValue);
      } else {
        const percent = frame / totalFrames;
        const current = (parseFloat(displayValue) * percent).toFixed(1);
        setShow(`${current}M+`);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [displayValue, duration]);

  return (
    <div className="stat-box">
      <h3>{show}</h3>
      <p>{label}</p>
    </div>
  );
};


function AboutUs() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />

      <div className="about-us-section">
        <div className="about-us-header">
          <h2>ABOUT US</h2>
          <p className="about-us-breadcrumb">
           <a href="/" className="breadcrumb-link"> Yajveer Ayurvedic </a> &gt; About us
          </p>
        </div>
      </div>

      <div className="about-us-section about-us-content">
        <div className="about-us-container">
          <div className="about-us-image">
            <img src={yajveerLogo} alt="Yajveer Ayurvedic Product" />
          </div>
          <div className="about-us-text">
            <h3>...Yajveer Ayurvedic...</h3>
            <h2>ABOUT US</h2>
            <p>
              Yajveer Ayurveda is a trusted name in Ayurvedic wellness,
              committed to reviving ancient herbal traditions for modern
              lifestyles. Based in India, we specialize in offering a wide
              spectrum of Ayurvedic products designed to support health,
              vitality, and natural healing.
            </p>
            <p>
              Our product range includes remedies for diabetes, digestive
              health, joint pain, immunity enhancement, skincare, and more — all
              crafted from time-tested herbs and natural ingredients. Every
              formulation is carefully developed and lab-tested to ensure
              purity, safety, and efficacy.
            </p>
            <p>
              At Yajveer, we source our herbs directly from sustainable farms
              and tribal forests, ensuring authenticity and potency. Our
              production follows strict quality controls, and we are proud to
              use no artificial chemicals or harmful preservatives in any of our
              offerings.
            </p>
            <p>
              With a growing customer base across India, Yajveer Ayurveda is
              more than a brand — it's a movement toward natural wellness. Our
              mission is to make Ayurvedic solutions accessible, reliable, and a
              part of every household’s health journey.
            </p>
          </div>
        </div>
      </div>

      <div className="funfact-section">
        <h4 className="funfact-title">
          FUNFACT
          <span className="underline"></span>
        </h4>
        <h2 className="funfact-heading">HAPPINESS CONTINUES</h2>

        <div className="funfact-grid">
            <Counter label="HAPPY CUSTOMERS" displayValue="2M+" duration={3000} />
          <div className="stat-box">
            <h3>
               99%<span className="plus">+</span>
            </h3>
            <p>CUSTOMER SATISFACTION</p>
          </div>
           <Counter label="ORDER DELIVERED" displayValue="10M+" duration={4000} />
          <div className="stat-box">
            <h3>
              100 <span className="plus">+</span>
            </h3>
            <p>PRODUCTS</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AboutUs;