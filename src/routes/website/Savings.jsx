import React from "react";
import OfferCard from "../../ui/cards/OfferCard";

export default function SavingsPage() {
  const Offers = [
    {
      id: 1,
      name: "أنس تركي",
      country: "السعودية",
      rating: 6,
      image: "/images/p2.png",
    //   status: true,
      title: "مساعدة منزلية لمدة أسبوع",
      type: "عمالة منزلية",
      price: "2500",
    },
    {
      id: 2,
      name: "مها صالح",
      country: "الإمارات",
      rating: 10,
      image: "/images/p1.png",
      status: true,
      title: "جليسة أطفال بدوام جزئي",
      type: "رعاية أطفال",
      price: "1800",
    },
    {
      id: 3,
      name: "محمد علي",
      country: "السعودية",
      rating: 8,
      image: "/images/p2.png",
    //   status: true,
      title: "عامل نظافة لمدة شهر",
      type: "نظافة",
      price: "3200",
    },
  ];

  return (
    <div className="savings-page mt-30">
      <div className="container">

        <div className="row g-3">
          {Offers.map((offer) => (
            <div className="col-md-6 col-lg-4" key={offer.id}>
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
