import "../../CSS/Footer/Footer.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
export default function Footer() {
  const { data: products } = useSelector((state) => state.cart);
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1 */}
        <div className="footer-column about">
          <h3>About us</h3>
          <p>
            We take pride in providing high-quality herbal products aimed at
            supporting your health and well-being.
          </p>
          <div className="social-icons">
            <Link to="https://www.facebook.com/yajveerayurvedic">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="https://www.instagram.com/yajveerayurvedic/">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="https://wa.me/917405430230">
              <i className="bi bi-whatsapp"></i>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-column quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <i className="bi bi-info-circle"></i>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <i className="bi bi-star"></i>
              <Link to="/Testimonial">Testimonials</Link>
            </li>
            <li>
              <i className="bi bi-box-seam"></i>
              {products?.length > 0 && (
                <Link to={`/product/${products[0]._id}`}>Our Products</Link>
              )}
            </li>
            <li>
              <i className="bi bi-newspaper"></i>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <i className="bi bi-envelope"></i>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <i className="bi bi-pencil-square"></i>
              <Link to="/reviewForm">Review</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column information">
          <h3>Information</h3>
          <ul>
            <li>
              <Link to="/faq">FAQ's</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/returnpolicy">Refund & Return Policy</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Link to="tel:+917405430230">
                <i className="bi bi-telephone"></i> +91-7405430230
              </Link>
            </li>
            <li>
              <Link to="mailto:yajveerayurved@gmail.com">
                <i className="bi bi-envelope"></i> yajveerayurved@gmail.com
              </Link>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=146%20M.G%20Dreams%20Near%20Bapasitaram%20Chok%2C%20Kamrej%2C%20394185"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-geo-alt"></i> 146, M.G Dreams Near
                Bapasitaram chok, Kamrej, 394185
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Row */}
      <div className="footer-bottom">
        <p>Copyright © 2025 Yajveer Ayurvedic Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
