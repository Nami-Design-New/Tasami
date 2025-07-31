import React from "react";
import HelperCard from "./HelperCard";
import { Link } from "react-router";

export default function InProgressCard({
  title,
  date,
  type,
  triangleImage,
  status,
  statusDate = "",
  helper,
}) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { label: "مكتمل", className: "status-badge success" };
      case "stopped":
        return { label: "متوقف", className: "status-badge danger" };
      default:
        return null;
    }
  };

  const statusInfo = status ? getStatusStyle(status) : null;

  return (
      <Link to={`/works-details/1`} className="pending-card-link">
    <div className="pending-card">
      {helper && (
        <div className="helper-section">
          <HelperCard helper={helper} />
        </div>
      )}
      <div className="pending-info">
        <div className="card-header">
          <img src={triangleImage} alt="triangle" className="triangle-icon" />
          <div className="title">{title}</div>
        </div>

        <div className="card-info">
          <div className="info-item">
            <img src="/icons/title.svg" alt="building" />
            <span>{type}</span>
          </div>
          <div className="info-item">
            <img src="/icons/date.svg" alt="calendar" />
            <span>{date}</span>
          </div>
        </div>

        {statusInfo && statusDate && (
          <div className={`status-date-box ${statusInfo.className}`}>
            <span className="status-text">{statusInfo.label}</span>
            <span className="status-date">{statusDate}</span>
          </div>
        )}
      </div>
    </div>
        </Link>

  );
}
