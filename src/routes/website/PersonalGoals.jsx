import React from "react";
import { useState } from "react";
import GoalCard from "../../ui/cards/GoalCard";
import SectionHeader from "../../ui/website/home/SectionHeader";
import useFilteredList from "../../hooks/useFilteredList";
import FilteredModal from "../../ui/modals/FilteredModal";
export default function PersonalGoals() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const goals = [
    {
      id: 1,
      name: "أحمد العلي",
      title: "إنشاء متجر الكتروني لبيع مستلزمات الطباعة ثلاثية الأبعاد",
      country: "السعودية",
      date: "20 مارس 2025",
      type: "تجارة رقمية",
      offers: 15,
      image: "/images/profile2.png",
      status: true,
    },
    {
      id: 2,
      name: "سلطان حسن",
      title: "إنشاء متجر الكتروني لبيع مستلزمات الطباعة ثلاثية الأبعاد",
      country: "السعودية",
      date: "16 فبراير 2025",
      type: "ريادة إلكترونية",
      offers: 12,
      image: "/images/p2.png",
      status: false,
    },
    {
      id: 3,
      name: "رحاب السعيد",
      title: "تطوير تطبيق جوال لمراقبة الصحة الشخصية",
      country: "الإمارات",
      date: "20 مارس 2025",
      type: "صحة - تكنولوجيا",
      offers: 8,
      image: "/images/p1.png",
      status: true,
    },
    {
      id: 4,
      name: "سلطان حسن",
      title: "إنشاء متجر الكتروني لبيع مستلزمات الطباعة ثلاثية الأبعاد",
      country: "السعودية",
      date: "16 فبراير 2025",
      type: "ريادة إلكترونية",
      offers: 12,
      image: "/images/profile1.png",
      status: true,
    },
    {
      id: 5,
      name: "منى القحطاني",
      title: "إنشاء منصة الكترونية لتقديم دورات تفاعلية",
      country: "الكويت",
      date: "5 مايو 2025",
      type: "تعليم إلكتروني",
      offers: 15,
      image: "/images/p1.png",
      status: false,
    },
    {
      id: 6,
      name: "رحاب السعيد",
      title: "تطوير تطبيق جوال لمراقبة الصحة الشخصية",
      country: "الإمارات",
      date: "20 مارس 2025",
      type: "صحة - تكنولوجيا",
      offers: 8,
      image: "/images/p1.png",
      status: true,
    },
  ];

  const {
    activeTab,
    setActiveTab,
    searchValue,
    setSearchValue,
    tabs,
    filteredItems,
  } = useFilteredList(goals, "type", ["title", "name"]);

  const filters = [
    {
      label: "الدوله",
      placeholder: "اختر المدينة",
      options: [
        { value: "riyadh", name: "السعودية" },
        { value: "jeddah", name: "مصر " },
        { value: "cairo", name: "القاهرة" },
      ],
    },
    {
      label: "المدينه",
      placeholder: "اختر المدينة",
      options: [
        { value: "riyadh", name: "الرياض" },
        { value: "jeddah", name: "جدة" },
        { value: "cairo", name: "القاهرة" },
      ],
    },
    {
      label: "جنسية المساعد الشخصي",
      placeholder: "اختر جنسية المساعد الشخصي",
      options: [
        { value: "sa", name: "السعودية" },
        { value: "eg", name: "مصر" },
        { value: "ae", name: "الإمارات" },
      ],
    },

    {
      label: "المجال",
      placeholder: "اختر المجال",
      options: [
        { value: "trade", name: "تجارة" },
        { value: "tech", name: "تقنية" },
        { value: "health", name: "صحة" },
      ],
    },
    {
      label: "التخصص",
      placeholder: "اختر التخصص",
      options: [
        { value: "coding", name: "برمجة" },
        { value: "design", name: "تصميم" },
        { value: "medicine", name: "طب" },
      ],
    },
    {
      label: "جنس المستفيد",
      placeholder: "اختر جنس المستفيد",
      options: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "أنثى" },
      ],
    },
  ];

  return (
    <section className="personal-goals page">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-12">
            <SectionHeader
              title="الأهداف الشخصية"
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              resultCount={filteredItems.length}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onFilterClick={() => setShowFilterModal(true)}
            />
          </div>

          <div className="row g-3 col-lg-9 col-12 mt-4">
            {filteredItems.map((goal) => (
              <div className="col-12 col-md-6 col-lg-4" key={goal.id}>
                <GoalCard {...goal} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FilteredModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        filters={filters}
        showValueRange={true}
        showAgeRange={true}
        showRating={true}
      />
    </section>
  );
}
