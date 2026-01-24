// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import ReviewsSlice from "./Reviews.js";
const store = configureStore({
  reducer: {
    cart: CartSlice,
    reviews: ReviewsSlice,
  },
});

export default store;
