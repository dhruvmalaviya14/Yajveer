import { useEffect } from 'react';
import "../CSS/Greetingform.css";
import { FaCheckCircle, FaShoppingBag, FaHome, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";
import confetti from 'canvas-confetti';

export default function GreetingForm() {
  useEffect(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }, []);

  return (
    <div className="greeting-container">
      <div className="greeting-card">
        <div className="centered-checkmark-container">
          <FaCheckCircle className="checkmark-icon" />
        </div>

        <h1 className="greeting-title">Order Confirmed!</h1>
        
        <div className="message-group tight-spacing">
          <p className="delivery-message tight-line">
            <FaShoppingBag className="icon" /> 
            Delivery arriving in <span className="highlight">5-7 business days</span>
          </p>
          
          <p className="receipt-message tight-line">
            <FaEnvelope className="icon" />
            Payment receipt will be issued after payment.
          </p>

          <p className="thank-you-message tight-line">
            Thank you for supporting <strong>Yajveer Ayurveda</strong><br />
            Your wellness journey begins now!
          </p>
        </div>

        <Link to="/" className="continue-btn">
          <FaHome className="btn-icon" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
