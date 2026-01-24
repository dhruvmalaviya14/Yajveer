import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/Apierror.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addProduct = async (req, res, next) => {
  try {
    const {
      productName,
      description,
      actualPrice,
      discount,
      ingredients,
      benefits,
      rating,
      type,
    } = req.body;

    if (!productName || !description || !actualPrice || !type) {
      throw new ApiError(
        400,
        "Product name, description, actual price, and type are required."
      );
    }

    // Validate type value
    if (!["box", "pouch"].includes(type)) {
      throw new ApiError(400, 'Product type must be either "box" or "pouch".');
    }

    let photos = [];
    if (req.files && req.files.length > 0) {
      if (req.files.length > 7) {
        throw new ApiError(400, "You can upload a maximum of 7 photos.");
      }
      const uploadPromises = req.files.map((file) =>
        uploadoncloudinary(file.buffer, "products")
      );
      const results = await Promise.all(uploadPromises);
      photos = results.map((result) => result.secure_url);
    }

    if (photos.length === 0) {
      throw new ApiError(400, "At least one product photo is required.");
    }

    const productData = {
      productName,
      description,
      actualPrice,
      photos,
      type, // <-- add type to product data
    };

    if (discount !== undefined) productData.discount = discount;
    if (ingredients !== undefined)
      productData.ingredients = Array.isArray(ingredients)
        ? ingredients
        : [ingredients];
    if (benefits !== undefined)
      productData.benefits = Array.isArray(benefits) ? benefits : [benefits];
    if (rating !== undefined) productData.rating = rating;

    const product = await Product.create(productData);

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully."));
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, products, "All products fetched successfully.")
      );
  } catch (error) {
    next(new ApiError(500, "Failed to fetch products."));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      throw new ApiError(400, "Invalid product ID.");
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product deleted successfully."));
  } catch (error) {
    next(error);
  }
};

export { addProduct, getAllProducts, deleteProduct };
