// src/pages/PersonalGoals.js
import React from "react";
import GoalCard from "../../ui/cards/GoalCard";
import SectionHeader from "../../ui/website/home/SectionHeader";
import useFilteredList from "../../hooks/useFilteredList";

export default function PersonalGoals() {
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

  const { activeTab, setActiveTab, searchValue, setSearchValue, tabs, filteredItems } =
    useFilteredList(goals, "type", ["title", "name"]);

  return (
    <section className="personal-goals page">
      <div className="container">
      <SectionHeader
        title="الأهداف الشخصية"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        resultCount={filteredItems.length}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="row g-3">
        {filteredItems.map((goal) => (
          <div className="col-12 col-md-6 col-lg-4" key={goal.id}>
            <GoalCard {...goal} />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
