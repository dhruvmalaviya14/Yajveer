import express from "express";
import { upload } from "../middlewares/multer.midddleware.js";
import { addProduct,getAllProducts } from "../controllers/product.controller.js";
import { verifyJWT1 } from "../middlewares/auth.middlewares.js";
import { validatePhotos } from "../middlewares/validatephotos.middlewares.js";
import { deleteProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/admin/addproducts",
  verifyJWT1,             
  upload.array("photos", 7),
  validatePhotos,
  addProduct 
);


router.get("/", getAllProducts);
router.delete("/products/:id",verifyJWT1,deleteProduct);


export default router;
