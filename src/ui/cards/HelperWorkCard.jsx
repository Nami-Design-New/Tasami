import React from "react";
import { Link, useNavigate } from "react-router"; 

export default function HelperWorkCard({ helper, bgColor = "#e9f9ff" }) {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/helper-detail`); 
  };

  return (
    <div className="helper-work-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
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

            <Link
              to={`/chat/${helper.id}`}
              state={{ name: helper.name }}
              className="chat-icon"
              onClick={(e) => e.stopPropagation()} 
            >
              <img src="/icons/Chat.svg" alt="chat" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
