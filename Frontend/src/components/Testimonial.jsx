import "../CSS/Testimonial.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar1 from "./Home/sidebar1";
import Sidebar from "./Home/sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Testimonial() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const { data: Reviews } = useSelector((state) => state.reviews);

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <h2 className="testimonial-heading">OUR Testimonial</h2>
      <div className="reviews-container-vertical">
        {Reviews && Reviews.length > 0 ? (
          Reviews.map((review, index) => (
            <div className="review-card-vertical" key={index}>
              <img
                src={review.productPhoto}
                alt={review.name}
                className="user-photo-vertical"
              />
              <h3 className="user-name">{review.name}</h3>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "filled" : ""}>
                    ★
                  </span>
                ))}
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No reviews available.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
