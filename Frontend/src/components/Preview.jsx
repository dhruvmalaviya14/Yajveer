// import { useState, useMemo } from "react";
// import "../CSS/Home/ClientReview.css";
// import { useSelector } from "react-redux";
// import userlogo from "../assets/User.jpg";
// import Fuse from 'fuse.js'; 

// const ProductReview = ({ productName }) => {
//   console.log("Product Name:", productName);
//   const { data: Reviews = [] } = useSelector((state) => state.reviews);
//   consol.log(Reviews);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 4;

  
//   const filteredReviews = useMemo(() => {
//     if (!productName || !Reviews.length) return [];


//     const fuseOptions = {
//       keys: ['productName'], 
//       threshold: 0.4, // Lower = more strict, Higher = more lenient (0.0 to 1.0)
//       distance: 100, // Maximum allowed distance
//       minMatchCharLength: 2, // Minimum character length for a match
//       includeScore: true, // Include match score in results
//       ignoreLocation: true, // Ignore location of match in string
//       shouldSort: true, // Sort results by score
//     };

//     const fuse = new Fuse(Reviews, fuseOptions);
//     const results = fuse.search(productname);

//     // Filter results by score (lower score = better match)
//     const goodMatches = results.filter(result => result.score <= 0.5);
    
//     console.log(`Fuse.js found ${goodMatches.length} matches for "${productName}"`);
//     console.log('Match scores:', goodMatches.map(r => ({ name: r.item.productName, score: r.score })));

//     return goodMatches.map(result => result.item);
//   }, [Reviews, productName]);

//   const totalReviews = filteredReviews.length;
  
//   const nextReviews = () => {
//     if (totalReviews > itemsPerPage) {
//       setCurrentIndex((prev) => (prev + itemsPerPage) % totalReviews);
//     }
//   };
  
//   const prevReviews = () => {
//     if (totalReviews > itemsPerPage) {
//       setCurrentIndex((prev) => {
//         const newIndex = prev - itemsPerPage;
//         return newIndex < 0 ? totalReviews - itemsPerPage : newIndex;
//       });
//     }
//   };
  
//   const visibleReviews = useMemo(() => {
//     if (totalReviews === 0) return [];
    
//     return Array.from({ length: Math.min(itemsPerPage, totalReviews) }, (_, i) => {
//       const index = (currentIndex + i) % totalReviews;
//       return filteredReviews[index];
//     });
//   }, [filteredReviews, currentIndex, totalReviews]);

//   return (
//     <div className="reviews-wrapper">
//       <div className="reviews-header">
//         <h3>Customer Reviews</h3>
//         {totalReviews > 0 && (
//           <span className="review-count">({totalReviews} reviews found)</span>
//         )}
//       </div>
      
//       {totalReviews === 0 ? (
//         <div className="no-reviews-msg">
//           <p>No reviews available for this product yet.</p>
//           <small>Be the first to review this product!</small>
//         </div>
//       ) : (
//         <div className="reviews-slider">
//           {totalReviews > itemsPerPage && (
//             <button 
//               className="arrow left" 
//               onClick={prevReviews}
//               disabled={currentIndex === 0}
//             >
//               ❮
//             </button>
//           )}
          
//           <div className="review-cards-container">
//             {visibleReviews.map((review, idx) => (
//               <div className="review-card" key={review._id || idx}>
//                 <div className="review-header">
//                   <img src={userlogo} alt="User" className="user-image" />
//                   <div className="user-info">
//                     <h4 className="user-name">{review.name}</h4>
//                     <div className="user-rating">
//                       {"★".repeat(review.rating)}
//                       {"☆".repeat(5 - review.rating)}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="review-text">"{review.review}"</p>
//                 <small className="review-product-name">
//                   Review for: {review.productName}
//                 </small>
//               </div>
//             ))}
//           </div>
          
//           {totalReviews > itemsPerPage && (
//             <button 
//               className="arrow right" 
//               onClick={nextReviews}
//               disabled={currentIndex + itemsPerPage >= totalReviews}
//             >
//               ❯
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductReview;


import { useState, useMemo } from "react";
import "../CSS/Home/ClientReview.css";
import { useSelector } from "react-redux";
import userlogo from "../assets/User.jpg";
import Fuse from 'fuse.js';

const ProductReview = ({ productName }) => {
  console.log("Product Name:", productName);
  const { data: Reviews = [] } = useSelector((state) => state.reviews);
  console.log(Reviews); // Fixed typo

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // Normalize all product names for better matching
  const normalizedProductName = productName?.trim().toLowerCase();

  // Map reviews to have 'productname' lowercase and trimmed for Fuse.js matching
  const normalizedReviews = useMemo(() => {
    return Reviews.map(r => ({
      ...r,
      productname: r.productname?.trim().toLowerCase() || ""
    }));
  }, [Reviews]);

  // Filter reviews for the given productName using Fuse.js
  const filteredReviews = useMemo(() => {
    if (!normalizedProductName || !normalizedReviews.length) return [];

    const fuseOptions = {
      keys: ['productname'],
      threshold: 0.4,
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
      shouldSort: true,
    };

    const fuse = new Fuse(normalizedReviews, fuseOptions);
    const results = fuse.search(normalizedProductName);

    // Optional: Relax score threshold if you want even partial matches to appear
    const goodMatches = results.filter(result => result.score <= 0.5);
    console.log(`Fuse.js found ${goodMatches.length} matches for "${normalizedProductName}"`);
    console.log('Match scores:', goodMatches.map(r => ({ name: r.item.productname, score: r.score })));

    return goodMatches.map(result => result.item);
  }, [normalizedProductName, normalizedReviews]);

  const totalReviews = filteredReviews.length;

  const nextReviews = () => {
    if (totalReviews > itemsPerPage) {
      setCurrentIndex((prev) => (prev + itemsPerPage) % totalReviews);
    }
  };

  const prevReviews = () => {
    if (totalReviews > itemsPerPage) {
      setCurrentIndex((prev) => {
        const newIndex = prev - itemsPerPage;
        return newIndex < 0 ? totalReviews - itemsPerPage : newIndex;
      });
    }
  };

  const visibleReviews = useMemo(() => {
    if (totalReviews === 0) return [];

    return Array.from({ length: Math.min(itemsPerPage, totalReviews) }, (_, i) => {
      const index = (currentIndex + i) % totalReviews;
      return filteredReviews[index];
    });
  }, [filteredReviews, currentIndex, totalReviews]);

  return (
    <div className="reviews-wrapper">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        {/* {totalReviews > 0 && (
          <span className="review-count">({totalReviews} reviews found)</span>
        )} */}
      </div>
      
      {totalReviews === 0 ? (
        <div className="no-reviews-msg">
          <p>No reviews available for this product yet.</p>
          <small>Be the first to review this product!</small>
        </div>
      ) : (
        <div className="reviews-slider">
          {totalReviews > itemsPerPage && (
            <button
              className="arrow left"
              onClick={prevReviews}
              disabled={currentIndex === 0}
            >
              ❮
            </button>
          )}
          
          <div className="review-cards-container">
            {visibleReviews.map((review, idx) => (
              <div className="review-card" key={review._id || idx}>
                <div className="review-header">
                  <img src={userlogo} alt="User" className="user-image" />
                  <div className="user-info">
                    <h4 className="user-name">{review.name}</h4>
                    <div className="user-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.review}"</p>
                <small className="review-product-name">
                  Review for: {review.productname}
                </small>
              </div>
            ))}
          </div>
          
          {totalReviews > itemsPerPage && (
            <button
              className="arrow right"
              onClick={nextReviews}
              disabled={currentIndex + itemsPerPage >= totalReviews}
            >
              ❯
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReview;
