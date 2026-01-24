// import multer from "multer";
// import path from "path";

// const tempDir = path.join(process.cwd(), "public", "temp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tempDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });

// utils/multer.js
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image\/(jpeg|png|webp)/)) {
      return cb(new Error("Only JPEG, PNG, or WEBP images are allowed"), false);
    }
    cb(null, true);
  },
});
