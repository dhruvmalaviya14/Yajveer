import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingAnimation from "./components/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { Fectchdata } from "./Redux/CartSlice";
import { fectchdata } from "./Redux/Review";
import { contactdata } from "./Redux/Contactus";
import { fectchuserdata } from "./Redux/User";
import { useEffect } from "react";
import { orderdata } from "./Redux/Order";
import { orderhistorydata } from "./Redux/OrderHistory";
import { Toaster } from "react-hot-toast";
import Notfound from "./components/Notfound";

function App() {
  const dispatch = useDispatch();

  const { loading: cartLoading, error: cartError } = useSelector(
    (state) => state.cart
  );

  const { loading: reviewLoading, error: reviewError } = useSelector(
    (state) => state.reviews
  );

  const { loading: contactusLoading, error: contactusError } = useSelector(
    (state) => state.contactus
  );

  const { loading: userLoading, error: userError } = useSelector(
    (state) => state.users
  );

  const { loading: OrderHistoryLoading, error: OrderHistoryError } =
    useSelector((state) => state.orderhistory);

  const { loading: OrderLoading, error: OrderError } =
    useSelector((state) => state.order);

  useEffect(() => {
    dispatch(Fectchdata());
    dispatch(fectchdata());
    dispatch(contactdata());
    dispatch(fectchuserdata());
    dispatch(orderdata());
    dispatch(orderhistorydata());
  }, [dispatch]);

  if (
    cartLoading ||
    reviewLoading ||
    contactusLoading ||
    userLoading ||
    OrderLoading ||
    OrderHistoryLoading
  ) {
    return <LoadingAnimation />;
  }

  if (
    cartError ||
    reviewError ||
    contactusError ||
    userError ||
    OrderError ||
    OrderHistoryError
  ) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{cartError || reviewError}</p>
        <button
          onClick={() => {
            dispatch(Fectchdata());
            dispatch(fectchdata());
            dispatch(contactdata());
            dispatch(fectchuserdata());
            dispatch(orderdata());
            dispatch(orderhistorydata());
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
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Notfound></Notfound>}></Route>
    </Routes>
    </>
  );
}

export default App;
