import "../CSS/mainNav.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
export default function MainNav() {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.cart);
  return (
    <>
      <nav className="mainNav">
        <div className="left">
          <Link className="items deep-inner-button">
            <div className="title">
              <p>
                All Category{" "}
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: "1rem" }}
                ></i>
              </p>
            </div>
            <div className="Menulist">
              {products &&
                products.map((item) => (
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
          </Link>
        </div>

        <div className="mid">
          <Link to="/" className="home deep-inner-button">
            <p>Home</p>
          </Link>
          <Link className="dp deep-inner-button">
            <div className="title">
              <p>
                Powder{" "}
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: "1rem" }}
                ></i>
              </p>
            </div>
            <div className="Menulist">
              {products &&
                products.map((item) => (
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
          </Link>

          <Link className="pack deep-inner-button">
            <div className="title">
              <p>
                Packtes{" "}
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: "1rem" }}
                ></i>
              </p>
            </div>
            <div className="Menulist">
              {products &&
                products
                  .filter((item) => item.type !== "box")
                  .map((item) => (
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
          </Link>
          <Link to="/Testimonial" className="use deep-inner-button">
            <p>Testimonials</p>
          </Link>

          <Link to="/reviewForm" className="review deep-inner-button">
            <p>Reviews</p>
          </Link>
        </div>

        <div className="right">
          <Link to="/contact" className="mail deep-inner-button">
            <i className="bi bi-envelope"></i>
            <p>Contact</p>
          </Link>
          <Link to="tel:+917405430230" className="call deep-inner-button">
            <i className="bi bi-telephone"></i>
            <p>Call</p>
          </Link>
        </div>
      </nav>
    </>
  );
}
