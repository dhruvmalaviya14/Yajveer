import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Fectchdata, addToCart } from "../Redux/CartSlice.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import ProductReview from "./Preview.jsx";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import "../CSS/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.cart);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(Fectchdata());
    }
  }, [dispatch, products]);

  const product = products.find((p) => p._id === id);

  // Move typeBasedOptions inside a function or use useMemo to avoid accessing undefined product
  const getTypeBasedOptions = (product) => {
    if (!product || !product.actualPrice) {
      return {};
    }
    
    return {
      box: {
        weights: ["75g", "100g", "250g"],
        prices: {
          "75g": `${product.actualPrice}`,
          "100g": `${(1.9 * product.actualPrice * 0.97).toFixed(0)}`,
          "250g": `${(2.6 * product.actualPrice * 0.988).toFixed(0)}`,
        },
      },
      pouch: {
        weights: ["100g", "200g"],
        prices: {
          "100g": `${product.actualPrice}`,
          "200g": `${(2 * product.actualPrice * 0.65).toFixed(0)}`,
        },
      },
    };
  };

  useEffect(() => {
    if (product) {
      // Get type options safely
      const typeBasedOptions = getTypeBasedOptions(product);
      const typeOptions = typeBasedOptions[product.type] || {};
      const availableWeights = typeOptions.weights || [];

      const initialQuantities = availableWeights.reduce((acc, weight) => {
        return { ...acc, [weight]: 0 };
      }, {});
      setSelectedQuantities(initialQuantities);

      // Set up image slider if photos exist
      if (!product?.photos?.length) return;

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === product.photos.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product?.photos, product?.type, product?.actualPrice]);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleQuantityChange = (weight, change) => {
    setSelectedQuantities((prevQuantities) => {
      const currentQty = prevQuantities?.[weight] || 0;
      const newQty = Math.max(0, currentQty + change);
      return {
        ...prevQuantities,
        [weight]: newQty,
      };
    });
  };

  const getSelectedItems = () => {
    if (!product) {
      console.warn("Product not found when trying to get items.");
      return { items: [], totalQuantity: 0 };
    }

    const typeBasedOptions = getTypeBasedOptions(product);
    const typeOptions = typeBasedOptions[product.type] || {};
    const items = [];
    let totalQty = 0;

    for (const weight in selectedQuantities) {
      const qty = selectedQuantities?.[weight];
      if (qty > 0) {
        const itemPrice = typeOptions.prices?.[weight] || 0;

        items.push({
          _id: product._id,
          productName: product.productName,
          selectedWeight: weight,
          quantity: qty,
          price: itemPrice,
          image: product.photos?.[0] || "",
        });
        totalQty += qty;
      }
    }
    return { items, totalQuantity: totalQty };
  };

  const resetSelectedQuantities = () => {
    const reset = {};
    Object.keys(selectedQuantities).forEach((weight) => {
      reset[weight] = 0;
    });
    setSelectedQuantities(reset);
  };

  const handleAddToCart = () => {
    const { items, totalQuantity } = getSelectedItems();

    if (items.length === 0) {
      toast.error(
        "Please select at least one quantity for a weight variant to add to cart."
      );
      return;
    }

    items.forEach((item) => {
      dispatch(
        addToCart({
          item: {
            _id: item._id,
            productName: item.productName,
            selectedWeight: item.selectedWeight,
            price: item.price,
            image: item.image,
          },
          quantity: item.quantity,
        })
      );
    });

    toast.success(`Added ${totalQuantity} item(s) to cart!`);
    resetSelectedQuantities();
  };

  const handleBuyNow = () => {
    const { items, totalQuantity } = getSelectedItems();
    if (items.length === 0) {
      toast.error(
        "Please select at least one quantity for a weight variant to add to cart."
      );
      return;
    }
    handleAddToCart();
    navigate("/cart", { replace: true });
  };

  if (loading)
    return <div className="loading-state">Loading product details...</div>;
  if (error)
    return <div className="error-state">Error loading product details</div>;
  if (!product)
    return <div className="product-not-found">Product not found.</div>;

  // Get type options safely after confirming product exists
  const typeBasedOptions = getTypeBasedOptions(product);
  const typeOptions = typeBasedOptions[product.type] || {};
  const availableWeights = typeOptions.weights || [];

  const parseArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [parsed.toString()];
    } catch (e) {
      return [field.toString()]; // Fallback if not JSON
    }
  };

  const ingredientsList = parseArrayField(product.ingredients);
  const benefitsList = parseArrayField(product.benefits);

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="product-details-container">
        <div className="product-details">
          {/* Top Section - Image and Basic Info */}
          <div className="product-top-section">
            {/* Image Gallery - Left Side */}
            <div className="product-gallery">
              <div className="main-image-slider">
                {product?.photos?.length ? (
                  <>
                    <div
                      className="slider-container"
                      style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                      }}
                    >
                      {product.photos.map((photo, index) => (
                        <div key={index} className="slide">
                          <img
                            src={photo}
                            alt={`${product.productName} ${index + 1}`}
                            className="slider-image"
                          />
                        </div>
                      ))}
                    </div>

                    {product.photos.length > 1 && (
                      <>
                        <button
                          className="slider-arrow prev"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? product.photos.length - 1 : prev - 1
                            )
                          }
                        >
                          &lt;
                        </button>
                        <button
                          className="slider-arrow next"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === product.photos.length - 1 ? 0 : prev + 1
                            )
                          }
                        >
                          &gt;
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="slide">
                    <img
                      src="/path/to/placeholder.jpg"
                      alt={product.productName}
                      className="slider-image"
                    />
                  </div>
                )}
              </div>

              {product?.photos?.length > 1 && (
                <div className="thumbnail-nav">
                  {product.photos.map((_, index) => (
                    <button
                      key={index}
                      className={`thumbnail-indicator ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Basic Info - Right Side */}
            <div className="product-basic-info">
              <h1 className="product-title">{product.productName}</h1>

              {/* Weight Variant Selection */}
              <div className="weight-variant-selection">
                <h3>Available Weights & Quantities:</h3>
                {availableWeights.length > 0 ? (
                  availableWeights.map((weight) => {
                    const price = typeOptions.prices?.[weight] || 0;
                    return (
                      <div key={weight} className="weight-variant-item">
                        <div className="weight-price-row">
                          <span className="variant-weight">{weight}</span>
                          <span className="variant-actual-price">₹{price}</span>
                        </div>
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(weight, -1)}
                            disabled={selectedQuantities[weight] === 0}
                          >
                            -
                          </button>
                          <span>{selectedQuantities[weight] || 0}</span>
                          <button
                            onClick={() => handleQuantityChange(weight, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No weight variants available for this product.</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Description, Ingredients, Benefits */}
          <div className="product-bottom-section">
            {/* Description Row */}
            <div className="content-row section-box">
              <h3>Description</h3>
              <p className="horizontal-description">{product.description}</p>
            </div>

            {ingredientsList.length > 0 && (
              <div className="list-section-detailed">
                <h3>Ingredients</h3>
                <ul>
                  {ingredientsList.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {benefitsList.length > 0 && (
              <div className="list-section-detailed">
                <h3>Benefits</h3>
                <ul>
                  {benefitsList.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductReview productName={product.productName}></ProductReview>
      <Footer />
    </>
  );
}