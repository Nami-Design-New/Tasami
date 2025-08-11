import React from "react";

const FeatureCard = ({ title, subtitle, icon }) => {
  return (
    <div className="feature-card">
      <div className="feature-content">
        <div>
          <h5 className="feature-title">{title}</h5>
          <p className="feature-subtitle mt-2">{subtitle}</p>
        </div>
       {icon && <i className={`${icon} feature-icon`}></i>}
      </div>
    </div>
  );
};

export default FeatureCard;
