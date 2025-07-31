import React from "react";

export default function GroupCard({ member, onClick }) {
  return (
    <div className="group-member-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="badge">{member.rating}%</div>
      <div className="image-box">
        <img src={member.image} alt={member.name} className="avatar" />
        {member.status && <span className="status-dot"></span>}
      </div>
      <span className="name mt-2">{member.name}</span>
      <div className="rating">
        <img src="/icons/medal.svg" alt="medal" />
        <span>{member.rating}</span>
      </div>
    </div>
  );
}
