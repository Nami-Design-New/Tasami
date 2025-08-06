import React from "react";
import { Link } from "react-router";

export default function Community() {
  const users = [
    {
      id: 1,
      name: "منى محمد",
      avatar: "/images/profile1.png",
    },
    {
      id: 2,
      name: "أحمد علي",
      avatar: "/images/p2.png",
    },
    {
      id: 3,
      name: "سارة عبد الله",
      avatar: "/images/p1.png",
    },
  ];

  return (
    <div className="communit-page mt-30">
      <div className="container">
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-12" key={user.id}>
              <Link to={`/personal-community/${users.id}/consultations`}>
              <div className="community-card">
                <img src={user.avatar} alt={user.name} className="avatar" />
                <div className="name">{user.name}</div>
                <i className="fa-solid fa-angle-left arrow-icon"></i> 
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
