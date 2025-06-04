const Rating = ({ label, value }) => (
  <div className="user-dashboard__rating-item">
    <span className="user-dashboard__rating-label">{label}</span>
    <span className="user-dashboard__rating-stars">
      <i className="fa-solid fa-star"></i>
      {value}
    </span>
  </div>
);
export default Rating;
