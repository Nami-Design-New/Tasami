// pages/.../Helpers.jsx
import React from "react";
import HelperWorkCard from "../../../ui/cards/HelperWorkCard";

const RecentHelpers = [
  {
    id: 1,
    name: "انس تركي",
    country: "السعودية",
    rating: 11,
    image: "/images/p2.png",
    status: true,
  },
  {
    id: 2,
    name: "مها صالح",
    country: "الإمارات",
    rating: 10,
    image: "/images/p1.png",
    status: true,
  },
];

const LastHelpers = [
  {
    id: 1,
    name: "مها صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
  },
  {
    id: 2,
    name: "مني صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
  },
];

export default function Helpers() {
  return (
    <div className="helpers">
      <div className="row">
        <h5 className="hed my-3"> الأحدث</h5>
        {RecentHelpers.map((helper) => (
          <div className="col-md-6 mb-4" key={helper.id}>
            <HelperWorkCard
              helper={helper}
              bgColor="#e9f9ff"
              iconColor="blue"
            />
          </div>
        ))}
      </div>

      <div className="row">
        <h5 className="hed my-3"> المساعدون السابقون </h5>
        {LastHelpers.map((helper) => (
          <div className="col-md-6 mb-4" key={helper.id}>
            <HelperWorkCard
              helper={helper}
              bgColor="#fff8e1"
              iconColor="yellow"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
