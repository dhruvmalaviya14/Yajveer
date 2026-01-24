import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import MainNav from "../mainnav";
import Footer from "./Footer";
import Sidebar from "../Home/sidebar";
import Sidebar1 from "../Home/sidebar1";
import React, { useState } from "react";
import "../../CSS/Footer/returnpolicy.css";

export default function ReturnPolicy() {
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

      <div className="return-policy-container">
        <h1>Refund and Returns Policy</h1>
        <h2>OVERVIEW</h2>
        <p>
          At <b>The Yajveer Ayurveda</b>, we aim to give our customers the highest quality products. If you are not fully happy with what you bought, we are ready to support you.
        </p>

        <h2>RETURNS</h2>
        <h3>Who Can Return:</h3>
        <ul>
          <li>You can return your item within 30 days of purchase. After 30 days, we cannot give a refund or exchange.</li>
          <li>To return a product, it must be unused, in the same condition as you got it, and packed in the original box.</li>
          <li>Some items like opened supplements, oils, or personal care products cannot be returned for health and safety reasons.</li>
        </ul>
        <h3>Non-returnable items:</h3>
          <ul>
            <li>Gift vouchers</li>
            <li>Digital software downloads</li>
            <li>Certain personal and health care products</li>
          </ul>

        <h2>PROCESS FOR RETURNS</h2>
        <ol>
            <li>To start a return, contact our support team at [insert email/contact number] and share your order details.</li>
            <li>After we approve the return, we will give you the address to send the product back.</li>
            <li>You must pay for the return shipping. These shipping charges will not be refunded.</li>
        </ol>

        <h2>REFUNDS</h2>
        <h3>Eligibility for Refunds:</h3>
        <ul>
            <li>After we receive and check your returned item, we will let you know if your refund is approved or denied.</li>
            <li>If approved, we will start the refund process. The money will be sent to your original payment method within 5–10 working days.</li>
        </ul><br></br>
        <p className="xyz"><b>Partial Refunds:</b> In certain situations, only partial refunds are granted (if applicable):</p>
        <ul>
            <li>Items that are damaged, not in original condition, or missing parts not caused by our mistake.</li>
            <li>Items returned more than 30 days after you received them.</li>
        </ul>

        <h2>Late or Missing Refunds</h2>
        <p>If you haven’t received a refund yet, please follow these steps:</p>
        <ol>
            <li>Check your bank account or payment method used at the time of purchase.</li>
            <li>Contact your credit card company, as it may take some time before your refund is officially posted.</li>
            <li>If you’ve done all of the above and still have not received your refund, please contact us at [insert email/contact number].</li>
        </ol>


        <h2>EXCHANGES</h2>
        <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at [insert email/contact number] and we will assist you.</p>

        <h2>SHIPPING RETURNS</h2>
        <p>To return your product, you should mail it to [insert return address].<br></br>
        You are responsible for return shipping costs unless the item is defective or we made an error with your order.</p>

        <h2>CONTACT US</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul>
            <li>By email: yajveerayurved@gmail.com</li>
            <li>By visiting this page on our website: <a href="https://yajveer-cqp2.vercel.app/" className="yajveerweb">https://yajveer-cqp2.vercel.app/</a></li>
            <li>By phone number: +917688800303</li>
        </ul>
      </div>
      <Footer/>
    </>
  );
}
