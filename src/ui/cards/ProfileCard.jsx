import React from "react";

export default function ProfileCard() {
  return (
    <div className="profile-card">
    <div className="user">
      <img
        src="/images/profile1.png"
        alt="User Avatar"
        className="avatar"
      />
      <div className="content">
        <h6> محمد سمير</h6>
        <span>ID: 345654</span>
      </div>
      <div className="rating">
        <img src="/icons/hz-bars.svg" />
        <span>11</span>
      </div>
    </div>
        </div>

  );
}
