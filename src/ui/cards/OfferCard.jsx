import { Link } from "react-router";

const OfferCard = ({ offer }) => {
  return (
    <Link
      to={`/offer/${offer.id}`}
      className="offer-card text-decoration-none text-dark"
    >
      <div className="image-wrapper">
        <img src={offer.image} alt={offer.name} className="avatar" />
        {offer.status && <span className="status-dot"></span>}
        <i className="fa-regular fa-heart favorite"></i>
      </div>

      <div className="info">
        <div className="info-header">
          <h3>{offer.name}</h3>
          <span className="rating">
            <i className="fa-solid fa-star text-warning"></i> {offer.rating}
          </span>
        </div>
        <p className="title ellipsis " style={{ width: "240px" }}>
          {offer.title}
        </p>
      </div>

      <div className="data">
        <span className="item">
          <img src="/icons/title.svg"></img> {offer.type}
        </span>

        <div className="item">
          <img src="/icons/cash.svg" alt="icon" />
          <span>
            {offer.price2} <img src="/icons/ryal.svg" alt="ريال" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
