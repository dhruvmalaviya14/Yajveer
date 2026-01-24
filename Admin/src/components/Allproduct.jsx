import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CSS/Allproduct.css"; 
import LoadingAnimation from "./LoadingAnimation"; 

const Allproduct = () => {
  const { data: products, loading, error } = useSelector((state) => state.cart); // Assuming 'cart' slice holds products
  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="error-message">
        Error loading products: {error.message || "Unknown error"}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="no-products-message">No products found.</div>;
  }

  return (
    <div className="all-products-container">
      <h1 className="page-title">All Products</h1>
      <div className="mm">
        <div className="ml">
          {products.map((product) => (
            <div className="Menucard" key={product._id}>
              <Link
                to={`/admin/products/${product._id}`}
                className="details-button-link"
              >
                <div className="menui">
                  <img
                    src={product.photos[0]}
                    alt={product.productName}
                    className="ig"
                  />
                </div>
              </Link>
              <div className="pname">
                <p>{product.productName}</p>
              </div>
              <div className="pprice">
                <p className="dis">{product.discount}%OFF</p>
                <p className="dsp">₹{product.actualPrice}</p>
                <p className="acp">
                  ₹
                  {Math.floor(
                    product.actualPrice +
                      (product.discount * product.actualPrice) / 100
                  )}
                </p>
              </div>
              <Link
                to={`/admin/products/${product._id}`}
                className="details-button-link"
              >
                <button className="menucart">Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allproduct;
