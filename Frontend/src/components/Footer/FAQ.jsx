import React, { useState } from "react";
import "../../CSS/Footer/FAQ.css";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import MainNav from "../mainnav";
import Footer from "./Footer";
import Sidebar from "../Home/sidebar";
import Sidebar1 from "../Home/sidebar1";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // open or close
  };

  const faqs = [
    {
      question: "What is Yajveer Diabetes Powder, and how does it work?",
      answer:
        "Yajveer Diabetes Powder is a herbal formulation designed to help manage diabetes naturally. It works by regulating blood sugar levels, improving insulin sensitivity, and supporting overall pancreatic health. The carefully selected ingredients in the powder help maintain optimal glucose metabolism, promoting better control of diabetes.",
    },
    {
      question: "Are Yajveer products safe to use?",
      answer:
        "Yes, all our products are made from natural and herbal ingredients, ensuring safety and efficacy. We adhere to strict quality standards and traditional Ayurvedic practices to deliver high-quality products that are safe for consumption.",
    },
    {
      question: "Can I stop my diabetes medication after taking this?",
      answer:
        "No, not without medical advice. Ayurvedic powders are supportive; they may help reduce dependency over time, but they are not substitutes for prescribed drugs unless advised by a qualified professional.",
    },
    {
      question: "What is Yajveer Jamun Seed Powder?",
      answer:
        "Jamun Seed Powder is made by drying and grinding the seeds of the Jamun fruit (Indian blackberry). It is rich in antioxidants, alkaloids, and flavonoids that are known to support blood sugar regulation, digestion, and overall wellness.",
    },
    {
      question: "Does it have any side effects?",
      answer: (
        <>
          <p>Rare, but possible:</p>
          <ul>
            <li>Hypoglycemia (if combined with other blood sugar meds)</li>
            <li>Mild constipation in some users</li>
            <li>Dry throat or mouth (take with sufficient water)</li>
            <li>Allergic reaction (rare)</li>
          </ul>
        </>
      ),
    },
    {
      question: "What are the main health benefits of Yajveer Karela Powder?",
      answer: (
        <ul>
          <li>Helps regulate blood sugar levels</li>
          <li>Improves insulin sensitivity</li>
          <li>Supports liver detoxification</li>
          <li>Aids digestion and metabolism</li>
          <li>Promotes weight loss</li>
          <li>Beneficial in skin disorders (acne, eczema)</li>
          <li>Helps manage cholesterol and lipid levels</li>
        </ul>
      ),
    },
    {
      question: "How should I store Karela Powder?",
      answer: (
        <ul>
          <li>Keep in a cool, dry place</li>
          <li>Store in an airtight glass or steel container</li>
          <li>Avoid exposure to heat, moisture, or direct sunlight</li>
        </ul>
      ),
    },
    {
      question: "What is Yajveer Moringa Leaf Powder?",
      answer:
        "Moringa powder is made by drying and grinding the leaves of the Moringa tree. It is a powerhouse of vitamins, minerals, antioxidants, and amino acids, making it a highly valued natural supplement.",
    },
    {
      question: "When is the best time to take it?",
      answer: (
        <ul>
          <li>Morning - for energy and nutrient boost</li>
          <li>Before meals - for blood sugar balance</li>
          <li>
            Avoid taking late at night—it may boost energy too much for restful
            sleep.
          </li>
        </ul>
      ),
    },
    {
      question: "What is Yajveer  Vitamin B12?",
      answer: (
        <>
          <p>
            Vitamin B12 (also called cobalamin) is a water-soluble vitamin
            essential for:
          </p>
          <ul>
            <li>🧠 Brain and nerve function</li>
            <li>🩸 Red blood cell formation</li>
            <li>🧬 DNA synthesis</li>
            <li>⚡ Energy metabolism</li>
          </ul>
        </>
      ),
    },
    {
      question: "Is B12 safe in pregnancy?",
      answer:
        "Yes, and it's very important. B12 supports fetal brain and nervous system development. Many prenatal vitamins include it.",
    },
    {
      question: "Are there any side effects?",
      answer: (
        <>
          <p>Product Possible Side Effects</p>
          <ul>
            <li>Jamun :- Low blood sugar, dry throat (rare)</li>
            <li>
              Karela :- Bitter taste, hypoglycemia, GI upset (if overused)
            </li>
            <li>Moringa :- Mild laxative effect, gas, nausea in high doses</li>
            <li>B12 :- Usually safe; rare cases: acne, restlessness</li>
          </ul>
        </>
      ),
    },
    {
      question: "How should I take them daily?",
      answer: (
        <>
          <p>Product Dosage (General) Best Time to Take</p>
          <ul>
            <li>Jamun :- ½-1 tsp Morning + evening before meals</li>
            <li>Karela :- ½-1 tsp Empty stomach, once or twice/day</li>
            <li>Moringa :- ½-1 tsp Morning (with breakfast)</li>
            <li>
              Vitamin B12 :- ½-1 tsp (3 gram) Morning (empty stomach or with
              food)
            </li>
          </ul>
          <p>
            💡 You can mix the powders together in warm water or smoothies
            (except for B12, which is often taken as a separate pill or spray).
          </p>
        </>
      ),
    },
    {
      question: "What is Ashwagandha?",
      answer:
        "Ashwagandha is a traditional Ayurvedic herb classified as an adaptogen, meaning it helps the body adapt to stress, balance hormones, and improve overall health. It has been used for over 3,000 years for boosting energy, focus, and vitality.",
    },
    {
      question: "Is it safe for daily use?",
      answer:
        "Yes. Ashwagandha is safe for long-term use when taken in moderate doses. Ayurvedic texts recommend it for daily rasayana (rejuvenation).",
    },
    {
      question:
        " Can I mix Ashwagandha with other herbs like moringa or triphala?",
      answer: (
        <>
          <p>Yes! Great combinations:</p>
          <ul>
            <li>With Moringa - for strength + energy</li>
            <li>With Brahmi or Shankhpushpi - for focus + calm</li>
            <li>With Triphala - for detox + rejuvenation</li>
          </ul>
        </>
      ),
    },
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2></Navbar2>
      <MainNav></MainNav>
      <div className="faq-container">
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span className="toggle-icon">
                  {openIndex === index ? "→" : "<<"}
                </span>
                <span className="question-text">{faq.question}</span>
              </div>
              <div
                className={`faq-answer ${openIndex === index ? "show" : ""}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
