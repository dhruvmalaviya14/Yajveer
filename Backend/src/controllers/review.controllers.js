import { Review } from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/Apierror.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addReview = async (req, res, next) => {
  try {
    const { name, review, rating } = req.body;
    const user = req.user;
    if (!name || !review || !rating) {
      throw new ApiError(400, "All fields are required.");
    }
    if (!req.file) {
      throw new ApiError(400, "Product photo is required.");
    }
    if (rating < 1 || rating > 5) {
      throw new ApiError(400, "Rating must be between 1 and 5.");
    }

    const result = await uploadoncloudinary(req.file.buffer);
    if (!result || !result.secure_url) {
      throw new ApiError(500, "Please Upload Another photo!!");
    }

    const reviewDoc = await Review.create({
      user: user._id,
      name,
      productPhoto: result.secure_url,
      review,
      rating,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, reviewDoc, "Review submitted successfully."));
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch reviews."));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if review exists
    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(404, "Review not found.");
    }

    await Review.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Review deleted successfully."));
  } catch (error) {
    next(error);
  }
};

export { addReview, getAllReviews , deleteReview};
