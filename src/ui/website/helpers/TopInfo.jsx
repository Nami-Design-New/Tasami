import React from "react";
export default function TopInfo({ helper }) {
  return (
    <div className="top-info col-lg-4 col-12">
      <div style={{ position: "relative" }}>
        <img src={helper.image} alt={helper.name} className="avatar" />
        {helper.status && <span className="status-dot"></span>}
      </div>

      <div className="details">
        <div className="d-flex flex-1 justify-content-between ">
          <div className="personal-info">
            <h5>{helper.name}</h5>
            <div className="country">
              <img src="icons/flag.svg" />
              {helper.country}
            </div>
          </div>
          <div className="rating">
            <img src="icons/hz-bars.svg" />
            <span>11</span>
          </div>
        </div>
      </div>
    </div>
  );
}
