import React from "react";
import { useParams } from "react-router";
import { products } from "../productData";
import "../CSS/BlogDetail.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar1 from "./Home/sidebar1";
import Sidebar from "./Home/sidebar";
import { useState } from "react";

const BlogDetail = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="blog-error">Product not found.</div>;
  }

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="blog-detail-container">
        <h1 className="blog-title">{product.title}</h1>
        <img src={product.image} alt={product.title} className="blog-image" />
        <p className="blog-description">{product.fullDescription}</p>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
