import React from "react";

export default function StarRate({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt"></i>}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <i key={i} className="far fa-star"></i>
      ))}
      <span className="rating-number">({rating.toFixed(1)})</span>
    </div>
  );
}
