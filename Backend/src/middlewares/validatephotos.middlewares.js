import { ApiError } from "../utils/Apierror.js";

export const validatePhotos = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ApiError(400, "At least one product photo is required."));
  }
``
  if (req.files.length > 7) {
    return next(new ApiError(400, "You can upload a maximum of 7 photos."));
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  for (const file of req.files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return next(new ApiError(400, "Only JPEG and PNG images are allowed."));
    }
  }
  next();
};
