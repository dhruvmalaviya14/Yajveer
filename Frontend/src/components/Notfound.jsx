import { useEffect } from "react";
import "../CSS/Notfound.css";
import {useNavigate} from "react-router";
export default function Notfound() {
  const navigate = useNavigate();
  useEffect(() => {
    const elements = document.querySelectorAll(".nf-animate");
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`;
      el.classList.add("animate");
    });
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="nf-container">
      <div className="nf-floating-herbs">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="nf-floating-herb" style={{
            '--delay': `${i * 3}s`,
            '--duration': `${15 + Math.random() * 10}s`,
            '--size': `${20 + Math.random() * 30}px`,
            '--opacity': `${0.3 + Math.random() * 0.5}`,
            '--startX': `${Math.random() * 100}%`,
            '--startY': `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      <div className="nf-content nf-animate">
        <div className="nf-border"></div>
        <div className="nf-symbol"></div>

        <div className="nf-error-box">
          <h1 className="nf-code">404</h1>
          <div className="nf-divider"></div>
          <h2 className="nf-title">Sacred Page Not Found</h2>
        </div>

        <button
          onClick={handleGoHome}
          className="nf-button nf-animate"
          aria-label="Return to home"
        >
          <span className="nf-button-text">Return to Sacred Space</span>
          <span className="nf-button-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 2L4 7v10h3v-7h10v7h3V7l-8-5zm0 2.5L18 7v3h-2V8h-3v7h-2V8H8v2H6V7l6-4.5z" />
            </svg>
          </span>
          <span className="nf-button-hover"></span>
        </button>
      </div>
    </div>
  );
}