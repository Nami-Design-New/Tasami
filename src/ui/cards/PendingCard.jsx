import React from "react";
import { Link } from "react-router";

export default function PendingCard({
  // id,
  title,
  date,
  type,
  offers,
  progress = 0,
  triangleImage,
  steps = [],
}) {
  return (
    <Link to={`/works-details/1`} className="pending-card-link">
      <div className="pending-card">
        <div className="pending-info">
          <div className="card-header">
            <img src={triangleImage} alt="triangle" className="triangle-icon" />
            <div className="title">{title}</div>
          </div>

          <div className="card-info">
            <div className="info-item">
              <img src="/icons/date.svg" alt="calendar" />
              <span>{date}</span>
            </div>
            <div className="info-item">
              <img src="/icons/title.svg" alt="building" />
              <span>{type}</span>
            </div>
            {offers && (
              <div className="info-item">
                <img src="/icons/offers-icon.svg" alt="offer" />
                <span>{offers}</span>
              </div>
            )}
          </div>

          <div className="progress-container">
            <div className="d-flex align-items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="progress-step">
                    <div className={`step-number ${index < progress ? "active" : ""}`}>
                      {step.number}
                    </div>
                    <div className={`step-label ${index < progress ? "active" : ""}`}>
                      {step.label}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`progress-connector ${
                        index < progress - 1 ? "active" : ""
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
