import { useState, useEffect } from "react";
import product1 from "../../assets/Karela.jpg";
import product4 from "../../assets/Moringa.jpg";
import product3 from "../../assets/KJP.jpg";
import product2 from "../../assets/Jamun.jpg";
import product5 from "../../assets/B12P.jpg";
import product6 from "../../assets/Diabetes.jpg";
import "../../CSS/Home/slider.css";
import { Link } from "react-router";
import { useSelector } from "react-redux";
const Slider = () => {
  const { data: products } = useSelector((state) => state.cart);
  const slides = [
    {
      text: "Diabets Powder for Sugar Control",
      subText: "Naturally support glucose levels with Diabetsss.",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product6,
    },
    {
      text: "Pure Karela Power for Sugar Control",
      subText: "Support healthy glucose naturally with bitter melon.",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product1,
    },
    {
      text: "Jamun Magic for Healthy Blood Sugar",
      subText:
        "A tasty, traditional remedy to manage sugar levels and promote digestion.",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product2,
    },
    {
      text: "Karela Jamun Blend – Double the Benefit",
      subText:
        "Two powerful ingredients combined to help regulate blood sugar naturally.",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product3,
    },
    {
      text: "Moringa Boost for Natural Wellness",
      subText: "Vitamins and antioxidants for energy and sugar balance.",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product4,
    },
    {
      text: "B12 Energy Powder for Daily Vitality",
      subText:
        "Boost your energy and support nerve health—especially for diabetic needs",
      buttonText: "Explore Shop",
      buttonLink: "/shop",
      image: product5,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] bg-green-50 overflow-hidden mslider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`ms1 absolute top-0 left-0 w-full h-full flex  md:flex-row items-center transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left Side: Text and Button */}
          <div className="ms2 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center ">
            <h2 className="ms3 text-3xl md:text-5xl font-bold text-green-800 mb-4">
              {slide.text}
            </h2>
            <p className="subh text-lg md:text-xl text-gray-500 mb-6">
              {slide.subText}
            </p>
            {products?.length > 0 && (
              <Link
                to={`/product/${products[0]._id}`}
                className="butt inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
              >
                {slide.buttonText}
              </Link>
            )}
          </div>
          {/* Right Side: Image */}
          <div className="ri w-full md:w-1/2 h-full">
            <img
              src={slide.image}
              alt="Ayurvedic Product"
              className="w-full sm:w-[90%] md:w-full h-auto object-cover"
            />
          </div>
        </div>
      ))}

      {/* Slider Dots */}
      <div className="dot absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-green-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
