export default function StarRate({ rating, isRating = true }) {
  const numericRating = Number(rating);
  const normalizedRating = Number.isFinite(numericRating)
    ? Math.min(Math.max(numericRating, 0), 5)
    : 0;
  const fullStars = Math.floor(normalizedRating);

  const halfStar = normalizedRating % 1 >= 0.5;
  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt half-star-icon"></i>}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <i key={i} className="far fa-star"></i>
      ))}
      {isRating && (
        <span className="rating-number">({normalizedRating.toFixed(1)})</span>
      )}
    </div>
  );
}
