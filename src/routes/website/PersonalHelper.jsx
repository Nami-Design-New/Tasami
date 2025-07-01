import React, { useState } from "react";
import SectionHeader from "../../ui/website/home/SectionHeader";
import HelperCard from "../../ui/cards/HelperCard";
import useFilteredList from "../../hooks/useFilteredList";
import FilteredModal from "../../ui/modals/FilteredModal";

export default function PersonalHelper() {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const helpers = [
    { id: 1, name: "انس تركي", country: "السعودية", rating: 4.4, type: "ريادي", members: 40, price: 248, image: "/images/p2.png", status: true },
    { id: 2, name: "مها صالح", country: "الإمارات", rating: 4.7, type: "تقنية", members: 35, price: 212, image: "/images/p1.png", status: true },
    { id: 3, name: "انس تركي", country: "السعودية", rating: 4.4, type: "ريادي", members: 40, price: 228, image: "/images/p2.png", status: true },
    { id: 4, name: "مها صالح", country: "الإمارات", rating: 4.7, type: "تقنية", members: 35, price: 292, image: "/images/p1.png", status: true }
  ];
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
    useFilteredList(helpers, "type", ["title", "name"]);
  const filters = [
    {
      label: "جنسية المساعد الشخصي", placeholder: "اختر", options: [
        { value: "sa", name: "السعودية" },
        { value: "eg", name: "مصر" },
        { value: "ae", name: "الإمارات" },
      ]
    },
    {
      label: "مدينة المساعد الشخصي", placeholder: "اختر", options: [
        { value: "riyadh", name: "الرياض" },
        { value: "jeddah", name: "جدة" },
        { value: "cairo", name: "القاهرة" },
      ]
    },
    {
      label: "المجال", placeholder: "اختر المجال", options: [
        { value: "trade", name: "تجارة" },
        { value: "tech", name: "تقنية" },
        { value: "health", name: "صحة" },
      ]
    },
    {
      label: "التخصص", placeholder: "اختر التخصص", options: [
        { value: "coding", name: "برمجة" },
        { value: "design", name: "تصميم" },
        { value: "medicine", name: "طب" },
      ]
    },
    {
      label: "جنس المساعد الشخصي", placeholder: "اختر", options: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "أنثى" },
      ]
    },
  ];

  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-12">
            <SectionHeader
              title="المساعدون الشخصيون"
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              resultCount={filteredItems.length}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onFilterClick={() => setShowFilterModal(true)}
            />
          </div>
          <div className="row g-5 col-lg-9 col-12 mt-4" >
            {filteredItems.map((helper) => (
              <div className="col-12 col-md-6 col-lg-5" key={helper.id}>
                <HelperCard helper={helper} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <FilteredModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        filters={filters}
        showValue={true}
        showAge={true}
        showRating={true}
      />

    </section>
  );
}
