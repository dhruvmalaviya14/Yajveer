import { useState } from "react";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import "../CSS/ReviewForm.css"; // Ensure this path is correct
import Logo from "../assets/Yajveer.png"; // Ensure this path is correct
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";

export default function ReviewForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(""); 
  const [productname , setProductName] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const validate = () => {
    const newErrors = {};
    const numericRating = parseFloat(rating);
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }else if(!productname.trim()){
      newErrors.productname = "Product Name is required";
    }else if (!review.trim()) {
      newErrors.review = "Review is required";
    }else if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors).join(", "));
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productname", productname);
    formData.append("review", review);
    formData.append("rating", parseFloat(rating)); 

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
          withCredentials: true, 
        }
      );

      // Check for a success status if needed, though axios typically throws for non-2xx
      if (response.status === 201 || response.status === 200) {
         toast.success("Review submitted successfully!");
        setName("");
        setProductName("");
        setReview("");
        setRating("");
        setSelectedFileName("");
      } else {
         toast.error("Failed to submit review. Unexpected response.");
      }
    } catch (err) {
      console.error("Error submitting review:", err.response?.data || err);

      if (err.response) {
        if (err.response.status === 401) {
           toast.error("Please login to submit a review.");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after a delay
        } else if (err.response.data && err.response.data.message) {
          // Use specific error message from backend if available
           toast.error(err.response.data.message);
        } else {
           toast.error("Failed to submit review. Please try again.");
        }
      } else if (err.request) {
        // The request was made but no response was received
         toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        console.log("Hii");
      }
    } finally {
      setIsLoading(false); // Always stop loading animation
    }
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}{" "}
      {!isLoading && (
        <>
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar />
          <Navbar2 />
          <MainNav />

          <section className="review-section">
            <div className="review-box">
              <div className="review-left">
                <img src={Logo} alt="Yajveer Ayurvedic Logo" />
              </div>
              <div className="review-right">
                <h2>Share Your Experience</h2>
                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter the product name "
                      value={productname}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Write your review..."
                      rows="4"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Rating (0-5)" // Placeholder updated
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      min="0" // HTML5 min attribute
                      max="5" // HTML5 max attribute
                      step="0.1" // Allow decimal ratings, e.g., 4.5
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
