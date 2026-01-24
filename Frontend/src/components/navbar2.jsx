import React, { useState } from "react"; 
import "../CSS/navabar2.css";
import Logo from "../assets/yajveer-logo.jpg";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../Redux/CartSlice";
import { Link, useNavigate } from "react-router"; 
import Fuse from "fuse.js"; 

export default function Navbar2() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(""); 

  const { data: products } = useSelector((state) => state.cart);
  const cartItemsCount = useSelector(selectCartItemsCount);


  const handleSearch = () => {
    if (!query.trim()) return; 

    const fuse = new Fuse(products, {
      keys: ["productName"],
      threshold: 5, // smaller → stricter match
    });

    // 2. run the search – returns ranked list
    const result = fuse.search(query.trim());

    if (result.length) {
      const { _id } = result[0].item;
      navigate(`/product/${_id}`);
    } else {
      navigate("/404"); // or whatever your NotFound route is
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <nav className="Navbar2">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo} alt="Yajveer" />
        </div>

        <div className="search">
          <div className="s1">
            <div className="list">
              <div className="title">
                <p>
                  All&nbsp;Categories{" "}
                  <i
                    className="bi bi-caret-down-fill"
                    style={{ fontSize: "1rem" }}
                  ></i>
                </p>
              </div>
              <div className="Menulist">
                {products?.map((item) => (
                  <p key={item._id}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.productName}
                    </Link>
                  </p>
                ))}
              </div>
            </div>

            <div className="content">
              <div className="input">
                <input
                  type="text"
                  placeholder="Search for the product"
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={handleKeyDown} 
                />
              </div>
              <div
                className="s2"
                onClick={handleSearch} 
                style={{ cursor: "pointer" }}
              >
                {" "}

                <div className="con">
                  <i className="bi bi-search fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="addtocart">
          <div className="like">
            <i className="bi bi-heart" style={{ color: "white" }}></i>
            <p>Wishlist</p>
          </div>

          <Link to="/cart" className="add">
            <div
              className="cart-icon-container"
              style={{ position: "relative" }}
            >
              <i className="bi bi-cart-plus" style={{ color: "white" }}></i>
              {cartItemsCount > 0 && (
                <span
                  className="cart-count"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#ff4444",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </div>
            <p>Cart</p>
          </Link>
        </div>
      </nav>
    </>
  );
}
