// ui/cards/HelperWorkCard.jsx
import React from "react";
import { Link } from "react-router";

export default function HelperWorkCard({ helper, bgColor = "#e9f9ff" }) {
  return (
    <Link to={`/helper-detail`} className="helper-work-card">
      <div className="content-wrapper" style={{ backgroundColor: bgColor }}>
        <div className="image-wrapper">
          <img src={helper.image} alt={helper.name} className="avatar" />
          {helper.status && <span className="status-dot"></span>}
        </div>

        <div className="info">
          <div className="info-header">
            <h3>{helper.name}</h3>
            <div className="rating">
              <img src="/icons/medal.svg" />
              <span>{helper.rating}</span>
            </div>
          </div>

          <div className="meta">
            <span className="country">
              <img src="/icons/flag.svg" alt="flag" />
              <span>{helper.country}</span>
            </span>

            <span className="chat-icon">
              <img src="/icons/Chat.svg" alt="chat" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

