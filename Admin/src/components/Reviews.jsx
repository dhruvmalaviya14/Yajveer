import "../CSS/Reviews.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteReview } from "../Redux/Review";
import { toast } from "react-hot-toast";
import { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function Reviews() {
  const dispatch = useDispatch();
  const { data: Reviews } = useSelector((state) => state.reviews);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/users/reviews/${id}`
      );
      dispatch(deleteReview(id));
      toast.success("Review deleted successfully.");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete Reviews!!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <>
      <div className="reviews-container-vertical">
        {Reviews && Reviews.length > 0 ? (
          Reviews.map((review, index) => (
            <div className="review-card-vertical" key={index}>
              <h3 className="user-name">{review.name}</h3>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "filled" : ""}>
                    ★
                  </span>
                ))}
              </div>
              <p className="review-text">{review.review}</p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </>
  );
}
