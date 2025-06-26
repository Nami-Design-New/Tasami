import React, { useState } from "react";
import SectionHeader from "../../ui/website/home/SectionHeader";
import HelperCard from "../../ui/cards/HelperCard";
import useFilteredList from "../../hooks/useFilteredList";

export default function PersonalHelper() {
  const helpers = [
    { id: 1, name: "انس تركي", country: "السعودية", rating: 4.4, type: "ريادي", members: 40, price: 248, image: "/images/p2.png", status: true },
    { id: 2, name: "مها صالح", country: "الإمارات", rating: 4.7, type: "تقنية", members: 35, price: 212, image: "/images/p1.png", status: true },
    { id: 3, name: "انس تركي", country: "السعودية", rating: 4.4, type: "ريادي", members: 40, price: 228, image: "/images/p2.png", status: true },
    { id: 4, name: "مها صالح", country: "الإمارات", rating: 4.7, type: "تقنية", members: 35, price: 292, image: "/images/p1.png", status: true }
  ];

  const { activeTab, setActiveTab, searchValue, setSearchValue, tabs, filteredItems } =
     useFilteredList(helpers, "type", ["title", "name"]);
  return (
    <section className="personal-helpers page">
        <div className="container">
      <SectionHeader
        title="المساعدون الشخصيون"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        resultCount={filteredItems.length}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="row g-5">
        {filteredItems.map((helper) => (
          <div className="col-12 col-md-6 col-lg-4" key={helper.id}>
            <HelperCard helper={helper} />
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
