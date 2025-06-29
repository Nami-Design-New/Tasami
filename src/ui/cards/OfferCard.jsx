import { Link } from "react-router";

const OfferCard = ({ offer }) => {
  return (
    <Link to={`/offer/${offer.id}`} className="offer-card text-decoration-none text-dark">
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

        <p className="title">{offer.title}</p>

        <div className="meta">
          <span className="country">
            <i className="fa-regular fa-flag"></i> {offer.country}
          </span>
          <span className="type">
            <i className="fa-solid fa-tags"></i> {offer.type}
          </span>
        </div>

        <div className="prices">
          <span>
            <img src="/icons/Groups.svg" alt="icon" /> {offer.price1} <img src="/icons/ryal.svg" alt="ريال" />
          </span>
          <span>
            <img src="/icons/Group.svg" alt="icon" /> {offer.price2} <img src="/icons/ryal.svg" alt="ريال" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
