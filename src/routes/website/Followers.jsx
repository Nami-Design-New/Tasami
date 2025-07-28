import React from 'react'
import HelperCard from "../../ui/cards/HelperCard";

export default function Followers() {
    const helpers = [
  {
    id: 1,
    name: "انس تركي",
    country: "السعودية",
    rating: 6,
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
  {
    id: 3,
    name: "انس تركي",
    country: "السعودية",
    rating: 8,
    image: "/images/p2.png",
    status: true,
  },]
  return (
<div className="follwers-page mt-30">
      <div className="container">

        <div className="row g-3">
          {helpers.map((helper) => (
            <div className="col-md-6 col-lg-4" key={helper.id}>
              <HelperCard helper={helper} />
            </div>
          ))}
        </div>
      </div>
    </div>  )
}
