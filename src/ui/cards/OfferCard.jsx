import { Link } from "react-router";
import { useState } from "react";

const OfferCard = ({ offer }) => {
   const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(prev => !prev);
  };
  return (
    <Link
      to={`/offer/${offer.id}`}
      className="offer-card text-decoration-none text-dark"
    >
      <div className="image-wrapper">
        <img src={offer.image} alt={offer.name} className="avatar" />
        {offer.status && <span className="status-dot"></span>}
      </div>

      <div className="info">
        <div className="info-header">
          <h3>{offer.name}</h3>
          <span className="rating">
            <i className="fa-solid fa-star text-warning"></i> {offer.rating}
          </span>
        </div>
        <p className="title ellipsis " style={{ maxWidth: "240px" }}>
          {offer.title}
        </p>
      </div>

      <div className="data">
        <span className="item mx-2">
          <img src="/icons/title.svg"></img> {offer.type}
        </span>

       <div className="item price">
  <span>
    <img src="/icons/cash.svg" alt="icon" className="mx-2" />
    {offer.price} <img src="/icons/ryal.svg" alt="ريال" />
  </span>
  <div
    onClick={(e) => {
      e.preventDefault(); 
      e.stopPropagation();
      toggleBookmark();
    }}
  >
    <i className={`fa-solid fa-bookmark ${bookmarked ? "active" : ""}`}></i>
  </div>
</div>

      </div>
    </Link>
  );
};

export default OfferCard;
