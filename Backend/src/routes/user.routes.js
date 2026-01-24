import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyJWT, verifyJWT1 } from "../middlewares/auth.middlewares.js";
import { submitContactForm } from "../controllers/contact.controllers.js";
import { addReview } from "../controllers/review.controllers.js";
import { upload } from "../middlewares/multer.midddleware.js";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/user.controller.js";
import { getAllContacts } from "../controllers/contact.controllers.js";
import { getAllReviews } from "../controllers/review.controllers.js";
import { deleteContact } from "../controllers/contact.controllers.js";
import { deleteReview } from "../controllers/review.controllers.js";
import { getTotalUsers } from "../controllers/user.controller.js";
import { createOrder } from "../controllers/order.controller.js";
import { getAllOrders , getAllOrderHistory } from "../controllers/order.controller.js";
import { markPaymentDoneAndArchive } from "../controllers/order.controller.js";
const router = Router();

router.route("/userregister").post(registerUser);
router.route("/userlogin").post(loginUser);
router.route("/adminlogin").post(loginAdmin);
router.route("/userlogout").post(verifyJWT, logoutUser);
router.route("/adminlogout").post(verifyJWT1, logoutAdmin);
router.route("/contactus").post(verifyJWT, submitContactForm);
router
  .route("/review")
  .post(verifyJWT, upload.single("productPhoto"), addReview);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyOtp").post(verifyOtp);
router.route("/resetpassword").post(resetPassword);
// router.route("/getallcontacts").get(verifyJWT1,getAllContacts);
router.route("/getallcontacts").get(getAllContacts);
// router.route("/getallreview").get(verifyJWT1,getAllReviews);
router.route("/getallreview").get(getAllReviews);
// router.delete("/reviews/:id", verifyJWT1, deleteReview);
router.delete("/reviews/:id" , deleteReview);
// router.delete("/contacts/:id", verifyJWT1, deleteContact);
router.delete("/contacts/:id", deleteContact);
// router.route("/gettotalusers").get(verifyJWT1,getTotalUsers);
router.route("/gettotalusers").get(getTotalUsers);


router.route("/orders/create").post(createOrder);

// router.route("/admin/orders").get(verifyJWT1,getAllOrders);
router.route("/admin/orders").get(getAllOrders);
// router.route("/admin/orders/:orderId/markdone").patch(verifyJWT1,markPaymentDoneAndArchive);
router.route("/admin/orders/:orderId/markdone").patch(markPaymentDoneAndArchive);
// router.route("/admin/orderhistory").get(verifyJWT1,getAllOrderHistory);
router.route("/admin/orderhistory").get(getAllOrderHistory);

export default router;
