import React, { useState } from "react";
import SectionHeader from "../../ui/website/home/SectionHeader";
import OfferCard from "../../ui/cards/OfferCard";
import useFilteredList from "../../hooks/useFilteredList";
export default function PersonalOffers() {
  const offers = [
    {
      id: 1,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس - تمكين المرأة",
      price1: 2200,
      price2: 1700,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 2,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة - تكنولوجيا المعلومات",
      price1: 2500,
      price2: 2000,
      image: "/images/p1.png",
      status: true,
    },
    {
      id: 3,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس - تمكين المرأة",
      price1: 2200,
      price2: 1700,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 4,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة - تكنولوجيا المعلومات",
      price1: 2500,
      price2: 2000,
      image: "/images/p1.png",
      status: true,
    },
  ];

  const { activeTab, setActiveTab, searchValue, setSearchValue, tabs, filteredItems } =
    useFilteredList(offers, "type", ["title", "name"]);

  return (
    <section className="personal-offers  page">
        <div className="container">
      <SectionHeader
        title="عروض المساعدة"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        resultCount={filteredItems.length}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="row g-3">
        {filteredItems.map((offer) => (
          <div className="col-12 col-md-6 col-lg-4" key={offer.id}>
            <OfferCard offer={offer} />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
