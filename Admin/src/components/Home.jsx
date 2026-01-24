import React, { use, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { HiOutlineDocumentReport, HiOutlineCash } from "react-icons/hi";
import Contactus from "./Contactus";
import Products from "./Products";
import Detail from "./Detail";
import Reviews from "./Reviews";
import Users from "./Users";
import { useSelector } from "react-redux";
import "../CSS/Home.css";
import Order from "./Order";
import OrderHistory from "./OrderHistory.";
import LineChart from "./LineChart";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const mockLineData = [
  {
    id: 1,
    title: "Users Growth",
    data: [
      { x: "Jan", y: 1000 },
      { x: "Feb", y: 1250 },
      { x: "Mar", y: 1100 },
      { x: "Apr", y: 1400 },
      { x: "May", y: 1300 },
      { x: "Jun", y: 1800 },
      { x: "Jul", y: 1600 },
      { x: "Aug", y: 2100 },
      { x: "Sep", y: 1900 },
      { x: "Oct", y: 2300 },
      { x: "Nov", y: 2100 },
      { x: "Dec", y: 2500 },
    ],
  },
  {
    id: 2,
    title: "Products Growth",
    data: [
      { x: "Jan", y: 20 },
      { x: "Feb", y: 28 },
      { x: "Mar", y: 25 },
      { x: "Apr", y: 35 },
      { x: "May", y: 32 },
      { x: "Jun", y: 40 },
      { x: "Jul", y: 38 },
      { x: "Aug", y: 45 },
      { x: "Sep", y: 42 },
      { x: "Oct", y: 48 },
      { x: "Nov", y: 44 },
      { x: "Dec", y: 50 },
    ],
  },
  {
    id: 3,
    title: "Orders Growth",
    data: [
      { x: "Jan", y: 500 },
      { x: "Feb", y: 650 },
      { x: "Mar", y: 580 },
      { x: "Apr", y: 800 },
      { x: "May", y: 750 },
      { x: "Jun", y: 950 },
      { x: "Jul", y: 850 },
      { x: "Aug", y: 1100 },
      { x: "Sep", y: 980 },
      { x: "Oct", y: 1300 },
      { x: "Nov", y: 1150 },
      { x: "Dec", y: 1400 },
    ],
  },
  {
    id: 4,
    title: "Reviews Growth",
    data: [
      { x: "Jan", y: 100 },
      { x: "Feb", y: 180 },
      { x: "Mar", y: 150 },
      { x: "Apr", y: 280 },
      { x: "May", y: 250 },
      { x: "Jun", y: 380 },
      { x: "Jul", y: 320 },
      { x: "Aug", y: 480 },
      { x: "Sep", y: 420 },
      { x: "Oct", y: 580 },
      { x: "Nov", y: 520 },
      { x: "Dec", y: 650 },
    ],
  },
];
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const handleLogout = async () => {
    console.log("Hii , I am Rishi Kukadiya!!")
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/adminlogout`,
        {},
        { withCredentials: true }
      );

      const result = response.data;
      if (result.success) {
        sessionStorage.setItem("isLoggedInAdmin", "false");
        toast.success("Logout successful");
        Navigate("/");
      } else {
        toast.error("Logout failed: " + result.message);
      }
    } catch (error) {
      sessionStorage.setItem("isLoggedInAdmin", "true");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: user } = useSelector((state) => state.users);
  const { data: products } = useSelector((state) => state.cart);
  const { data: reviews } = useSelector((state) => state.reviews);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const metrics = [
    {
      id: 1,
      title: "Total Users",
      value: `${user?.totalUsers?.length || 0}`,
      icon: <FiUsers />,
    },
    {
      id: 2,
      title: "Total Products",
      value: `${products.length}`,
      icon: <FiBox />,
    },
    { id: 3, title: "Total Orders", value: "789", icon: <HiOutlineCash /> },
    {
      id: 4,
      title: "Total Reviews",
      value: `${reviews.length}`,
      icon: <FiMessageSquare />,
    },
  ];

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="admin-dashboard">
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-close-btn" onClick={toggleSidebar}>
            <FiX />
          </button>
          <Link to="/admin" className="nav-item">
            <span className="nav-icon">
              <FiHome />
            </span>
            Dashboard
          </Link>
          <Link to="/admin/users" className="nav-item">
            <span className="nav-icon">
              <FiUsers />
            </span>
            Users
          </Link>
          <Link to="/admin/products" className="nav-item">
            <span className="nav-icon">
              <FiBox />
            </span>
            Products
          </Link>
          <Link to="/admin/orders" className="nav-item">
            <span className="nav-icon">
              <HiOutlineCash />
            </span>
            Orders
          </Link>
          <Link to="/admin/query" className="nav-item">
            <span className="nav-icon">
              <FiSearch></FiSearch>
            </span>
            Query
          </Link>
          <Link to="/admin/reviews" className="nav-item">
            <span className="nav-icon">
              <FiMessageSquare />
            </span>
            Reviews
          </Link>
          <Link to="/admin/orderHistory" className="nav-item">
            <span className="nav-icon">
              <HiOutlineDocumentReport />
            </span>
            OrderHistory
          </Link>
          <Link className="nav-item" onClick={handleLogout}>
            <span className="nav-icon">
              <FiLogOut />
            </span>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        {!isSidebarOpen && (
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="dashboard-header">
                  <h1>Dashboard Overview</h1>
                </div>
                <div className="metrics-grid">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="metric-card">
                      <div className="metric-icon">{metric.icon}</div>
                      <div className="metric-details">
                        <h3>{metric.title}</h3>
                        <div className="metric-value">{metric.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="charts-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    padding: "20px",
                    marginTop: "20px",
                  }}
                >
                  <div className="chart-card">
                    <LineChart data={mockLineData[0]} title="Users Growth" />
                  </div>
                  <div className="chart-card">
                    <LineChart data={mockLineData[1]} title="Products Growth" />
                  </div>
                  <div className="chart-card">
                    <LineChart data={mockLineData[2]} title="Orders Growth" />
                  </div>
                  <div className="chart-card">
                    <LineChart data={mockLineData[3]} title="Reviews Growth" />
                  </div>
                </div>
              </>
            }
          />

          <Route path="/products/*" element={<Products />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/users" element={<Users></Users>} />
          <Route path="/orders" element={<Order></Order>} />
          <Route path="/query" element={<Contactus></Contactus>} />
          <Route path="/reviews" element={<Reviews></Reviews>} />
          <Route path="/orderHistory" element={<OrderHistory></OrderHistory>} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
