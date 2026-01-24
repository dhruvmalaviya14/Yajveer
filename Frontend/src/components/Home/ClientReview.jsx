import { useState } from "react";
import "../../CSS/Home/ClientReview.css";
import { useSelector } from "react-redux";
import userlogo from "../../assets/User.jpg";

const ClientReview = () => {
  const { data: Reviews = [] } = useSelector((state) => state.reviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // ✅ Prevent division by 0
  const totalReviews = Reviews.length;

  const nextReviews = () => {
    if (totalReviews > 0) {
      setCurrentIndex((prev) => (prev + itemsPerPage) % totalReviews);
    }
  };

  const prevReviews = () => {
    if (totalReviews > 0) {
      setCurrentIndex((prev) => {
        const newIndex = prev - itemsPerPage;
        return newIndex < 0 ? (totalReviews + newIndex) % totalReviews : newIndex;
      });
    }
  };

  // ✅ Pure, non-mutating logic to create visibleReviews array
  const visibleReviews = totalReviews === 0
    ? []
    : Array.from({ length: Math.min(itemsPerPage, totalReviews) }, (_, i) => {
        const index = (currentIndex + i) % totalReviews;
        return Reviews[index];
      });

  return (
    <div className="reviews-wrapper">
      <h2 className="reviews-heading">What Our Customers Say</h2>

      {totalReviews === 0 ? (
        <p className="no-reviews-msg">No reviews available yet.</p>
      ) : (
        <div className="reviews-slider">
          {totalReviews > itemsPerPage && (
            <button className="arrow left" onClick={prevReviews}>
              ❮
            </button>
          )}

          <div className="review-cards-container">
            {visibleReviews.map((review, idx) => (
              <div className="review-card" key={review._id || idx}>
                <img src={userlogo} alt="User" className="user-image" />
                <p className="review-text">"{review.review}"</p>
                <p className="review-text">"{review.productname}"</p>
                <h4 className="user-name">{review.name}</h4>
                <div className="user-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))}
          </div>

          {totalReviews > itemsPerPage && (
            <button className="arrow right" onClick={nextReviews}>
              ❯
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientReview;
