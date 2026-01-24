import React from "react";
import reactDom from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./components/login";
import { Routes, Route } from "react-router";
import Home from "./components/home";
import SignUp from "./components/signup";
import ReviewForm from "./components/ReviewForm";
import ProductDetails from "./components/ProductDetails";
import FAQ from "./components/Footer/FAQ";
import ContactUs from "./components/Footer/ContactUs";
import AboutUs from "./components/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Returnpolicy from "./components/Footer/returnpolicy";
import TermsAndConditions from "./components/TermsConditions";
import ShippingPolicy from "./components/ShippingPolices";
import LoadingAnimation from "./components/LoadingAnimation";
import { Fectchdata } from "./Redux/CartSlice";
import { fectchdata } from "./Redux/Reviews";
import Forgotpassword from "./components/Forgotpass";
import Forgotpassword1 from "./components/Forgotpass1";
import Forgotpassword2 from "./components/Forgotpass2";
import Testimonial from "./components/Testimonial";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import GreetingForm from "./components/Greetingform";
import CheckoutForm from "./components/CheckoutForm";
import Notfound from "./components/Notfound";

const App = () => {
  const dispatch = useDispatch();
  const { loading: cartLoading, error: cartError } = useSelector(
    (state) => state.cart
  );

  const { loading: reviewLoading, error: reviewError } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    dispatch(Fectchdata());
    dispatch(fectchdata());
  }, [dispatch]);

  if (cartLoading || reviewLoading) {
    return <LoadingAnimation />;
  }

  if (cartError || reviewError) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{cartError || reviewError}</p>
        <button
          onClick={() => {
            dispatch(Fectchdata());
            dispatch(fectchdata());
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            zIndex: 100000, 
          },
        }}
      />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/reviewForm" element={<ReviewForm></ReviewForm>}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
        <Route path="/faq" element={<FAQ></FAQ>}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
        <Route
          path="/privacy"
          element={<PrivacyPolicy></PrivacyPolicy>}
        ></Route>
        <Route
          path="/returnpolicy"
          element={<Returnpolicy></Returnpolicy>}
        ></Route>
        <Route
          path="/terms"
          element={<TermsAndConditions></TermsAndConditions>}
        ></Route>
        <Route
          path="/shipping"
          element={<ShippingPolicy></ShippingPolicy>}
        ></Route>
        <Route
          path="/forgotpassword"
          element={<Forgotpassword></Forgotpassword>}
        ></Route>
        <Route
          path="/forgotpassword1"
          element={<Forgotpassword1></Forgotpassword1>}
        ></Route>
        <Route
          path="/forgotpassword2"
          element={<Forgotpassword2></Forgotpassword2>}
        ></Route>
        <Route
          path="/Testimonial"
          element={<Testimonial></Testimonial>}
        ></Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<CheckoutForm />}></Route>
        <Route path="/greeting" element={<GreetingForm />}></Route>
        <Route path="/404" element={<Notfound></Notfound>} />
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
    </>
  );
};

export default App;
