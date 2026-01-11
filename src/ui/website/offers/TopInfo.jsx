export default function TopInfo({ offer }) {
  return (
    <div className="top-info">
      <div style={{ position: "relative" }}>
        <img src={offer.user.image} alt={offer.user.name} className="avatar" />
        {offer.status && <span className="status-dot"></span>}
      </div>

      <div className="details p-2">
        <div className="d-flex flex-1 justify-content-between ">
          <div className="personal-info">
            <h5>{offer.user.name}</h5>
            <div className="country">
              <img src="icons/flag.svg" />
              {offer.user.country.title}
            </div>
          </div>
          <div className="rating">
            <img src="icons/medal.svg" />
            <span>{offer.user.experience_level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
