import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import "../CSS/ShippingPolicies.css";

const ShippingPolicy = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="shipping-container">
        <h1>Shipping Policy for Yajveer Ayurvedic</h1>

        <p>
          At <strong>Yajveer Ayurvedic</strong>, we are committed to providing
          you with the best possible service, which includes a smooth and
          efficient delivery of your beloved Ayurvedic products. We partner with
          trusted logistics providers to ensure your order reaches you safely
          and on time. This policy outlines our shipping procedures and
          expectations.
        </p>

        <h2>1. Shipping Destinations</h2>
        <p>
          We currently ship across all serviceable locations within India.
          Please ensure your delivery pin code is serviceable by our courier
          partners before placing an order. We do not offer international
          shipping at this time.
        </p>

        <h2>2. Order Processing Time</h2>
        <p>
          All orders are processed and dispatched from our warehouse within{" "}
          <strong>1-2 business days</strong> (Monday to Friday, excluding public
          holidays). Orders placed on weekends or holidays will be processed on
          the next business day.
        </p>
        <ul>
          <li>Orders placed before [e.g., 2 PM IST] on a business day are typically processed the same day.</li>
          <li>Orders placed after [e.g., 2 PM IST] will be processed the next business day.</li>
        </ul>

        <h2>3. Estimated Delivery Time</h2>
        <p>
          Once dispatched, the estimated delivery time depends on your location.
          Generally, you can expect your order to be delivered within:
        </p>
        <ul>
          <li>
            <strong>Metropolitan Cities (Tier 1):</strong> 3-5 business days
          </li>
          <li>
            <strong>Other Major Cities (Tier 2):</strong> 4-7 business days
          </li>
          <li>
            <strong>Remote/Rural Areas:</strong> 7-10 business days (or more,
            depending on accessibility)
          </li>
        </ul>
        <p>
          Please note that these are estimated delivery times. Actual delivery
          times may vary due to unforeseen circumstances, courier efficiency, or
          location-specific issues.
        </p>

        <h2>4. Shipping Charges</h2>
        <ul>
          <li>
            <strong>Prepaid Orders:</strong> Standard shipping is{" "}
            <strong>FREE</strong> on all prepaid orders across India, regardless
            of the order value.
          </li>
          <li>
            <strong>Cash on Delivery (COD) Orders:</strong> A convenience fee of
            ₹50 (or a percentage of the order value, e.g., 2%) will be
            applied to all Cash on Delivery orders. This fee will be clearly
            displayed at checkout. We recommend prepaid options for a seamless
            experience.
          </li>
        </ul>

        <h2>5. Order Tracking</h2>
        <p>
          As soon as your order is shipped, you will receive a shipping
          confirmation email and/or SMS containing your tracking number and a
          link to the courier partner's website. You can use this tracking ID
          to monitor the real-time status of your shipment. Please allow up to
          24 hours for the tracking information to become active after you
          receive the notification.
        </p>

        <h2>6. Incorrect Address / Non-Delivery / Refused Shipments</h2>
        <ul>
          <li>
            <strong>Accurate Information:</strong> It is crucial that you
            provide accurate and complete shipping address and contact
            information (including mobile number) at the time of placing your
            order. We are not responsible for delays or failed deliveries
            resulting from incorrect, incomplete, or outdated address details
            provided by the customer.
          </li>
          <li>
            <strong>Re-delivery Attempts:</strong> Our courier partners typically
            attempt delivery 2-3 times. If delivery is unsuccessful after these
            attempts, the package will be returned to our warehouse.
          </li>
          <li>
            <strong>Re-shipping Charges:</strong> In cases of non-delivery due
            to incorrect address, refusal of delivery, or unavailability of the
            recipient after multiple attempts, you may be responsible for the
            re-shipping charges to have the order sent out again. Refunds for
            such returned orders (if applicable) will be processed after
            deducting the original shipping costs and any return processing fees.
          </li>
        </ul>

        <h2>7. Delivery Delays and Unforeseen Circumstances</h2>
        <p>
          While we strive for timely deliveries, please understand that various
          external factors can occasionally lead to delays. These may include,
          but are not limited to:
        </p>
        <ul>
          <li>Extreme weather conditions</li>
          <li>National holidays or festivals</li>
          <li>Political disruptions or strikes</li>
          <li>Unforeseen logistical challenges by the courier partner</li>
          <li>Customs clearance (if applicable, though unlikely for domestic)</li>
        </ul>
        <p>
          We will do our best to keep you informed in case of significant delays
          and appreciate your patience and understanding in such situations.
        </p>

        <h2>8. Damage During Transit</h2>
        <p>
          We take utmost care in packaging our products to prevent damage during
          transit. However, if you receive a package that appears to be damaged
          or tampered with, please:
        </p>
        <ul>
          <li>
            <strong>Do not accept the delivery</strong> if the damage is severe.
          </li>
          <li>
            If you accept it, make sure to take clear photos/videos of the
            damaged packaging <strong>before</strong> opening the package.
          </li>
          <li>
            Contact our customer support team at{" "}
            <a href="mailto:yajveerayurved@gmail.com">
              yajveerayurved@gmail.com
            </a>{" "}
            within <strong>24 hours</strong> of receiving the damaged parcel,
            providing your order details and the photos/videos.
          </li>
          <li>
            Refer to our <strong>Return & Refund Policy</strong> for detailed instructions on
            handling damaged items.
          </li>
        </ul>

        <h2>9. Missing Items in Shipment</h2>
        <p>
          In the rare event that your order arrives with missing items, please
          contact our customer support at{" "}
          <a href="mailto:yajveerayurved@gmail.com">
            yajveerayurved@gmail.com
          </a>{" "}
          within <strong>24 hours</strong> of delivery. Please provide your
          order number and details of the missing items. We will investigate
          the matter promptly.
        </p>

        <h2>10. Shipping Policy Updates</h2>
        <p>
          Yajveer Ayurvedic reserves the right to update or modify this Shipping
          Policy at any time without prior notice. Any changes will be
          effective immediately upon posting on our website. It is your
          responsibility to review this policy periodically for updates.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          For any questions, concerns, or assistance regarding your shipment,
          please do not hesitate to contact our dedicated customer support team:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:yajveerayurved@gmail.com">
              yajveerayurved@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone/WhatsApp:</strong> +91-7405430230 (Available Monday-Friday, 10 AM - 6 PM IST)
          </li>
        </ul>
        <p>We are here to help!</p>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;