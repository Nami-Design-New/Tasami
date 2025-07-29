import React from "react";

export default function PendingCard({
  title,
  date,
  type,
  offers,
  progress,
  triangleImage,
}) {
  const stageSteps = ["بدأ التنفيذ", "التخطيط", "الدفع", "المعرض"];

  return (
    <div className="pending-card">
      <div className="card-header">
        <img src={triangleImage} alt="triangle" className="triangle-icon" />
        <div className="title">{title}</div>
      </div>

      <div className="card-info">
        <div>
          <img src="/icons/date.svg" alt="calendar" />
          <span>{date}</span>
        </div>
        <div>
          <img src="/icons/title.svg" alt="building" />
          <span>{type}</span>
        </div>
        {offers && (
          <div>
            <img src="/icons/offers-icon.svg" alt="offer" />
            <span>{offers}</span>
          </div>
        )}
      </div>

      <div className="progress-bar">
       
      </div>
    </div>
  );
}
