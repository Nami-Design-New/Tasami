import React from "react";

const CurrentPlanCard = ({ plan }) => {
  return (
    <div className="plan-card current-plan">
      <h5 className="plan-title">الخطة الحالية</h5>
      <div className="plan-header">
        <div className="plan-name">
          <img src="/icons/Silverpackage.svg" alt="PackageIcon" className="plan-icon" />
          {plan.name}
        </div>
        <p className="plan-free-label">مجاني مدي الحياة</p>
      </div>
      <ul className="features-list">
        {plan.features.map((feature, index) => (
          <li key={index} className="feature-item">
            <div className="feature-text">
              <i className="fa-solid fa-check feature-check-icon"></i>
              {feature.text}
            </div>
            <span className="feature-value">{feature.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentPlanCard;