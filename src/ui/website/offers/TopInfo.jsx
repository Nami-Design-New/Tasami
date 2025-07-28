import React from "react";

export default function TopInfo({ offer }) {
  return (
    <div className="top-info col-lg-4 col-12">
      <div style={{ position: "relative" }}>
        <img src={offer.image} alt={offer.name} className="avatar" />
        {offer.status && <span className="status-dot"></span>}
      </div>

      <div className="details">
        <div className="d-flex flex-1 justify-content-between ">
          <div className="personal-info">
            <h5>{offer.name}</h5>
            <div className="country">
              <img src="/icons/flag.svg" />
              {offer.country}
            </div>
          </div>
          <div className="rating">
            <img src="/icons/hz-bars.svg" />
            <span>11</span>
          </div>
        </div>
      </div>
    </div>
  );
}
