import "../CSS/Blog.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar1 from "./Home/sidebar1";
import Sidebar from "./Home/sidebar";

import { useState } from "react";
import { useNavigate } from "react-router";
import { products } from "../productData";

export default function Blog() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const navigate = useNavigate();

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="blog-container">
        <h2 className="blog-title">Explore Our Ayurvedic Products</h2>
        <div className="blog-grid">
          {products.map((product) => (
            <div className="blog-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="blog-img"
              />
              <h3 className="blog-heading">{product.title}</h3>
              <p className="blog-description">{product.description}</p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/blog/${product.id}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
