import React, { useState } from "react";
import PaymentModal from "../modals/PaymentModal";

const PlanCard = ({ plan }) => {
        const [showPaymentModal, setShowPaymentModal] = useState(false);
    
  return (
    <div className="plan-card other-plan">
      <img src={`/icons/${plan.icon}`} alt={plan.name} className="plan-image" />
      <h5 className="plan-name-title">{plan.name}</h5>
      <hr className="plan-divider" />
      <div className="commission-row">
        <div className="commission-info">
          <i className="fa-solid fa-check commission-check-icon"></i>
          <span>{plan.desc}</span>
        </div>
        <span className="commission-value">{plan.commission}</span>
      </div>
      <hr className="plan-divider" />
      <div className="subscribe-section">
        <button className="subscribe-btn" onClick={() => setShowPaymentModal(true)}>اشترك</button>
        <div className="price-container">
          <div className="main-price">
            <span className="plan-price">{plan.price}</span>
            <img src="/icons/ryal.svg" alt="ريال" className="currency-icon" />
          </div>
          <div className="monthly-price">
            25 <img src="/icons/ryal.svg" alt="ريال" className="currency-icon" /> شهريا
          </div>
        </div>
      </div>
    <PaymentModal showModal={showPaymentModal} setShowModal={setShowPaymentModal} />

    </div>
  );
};

export default PlanCard;