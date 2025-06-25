import React, { useState } from "react";
import GoalCard from "../../ui/cards/GoalCard";
import { Link } from "react-router";
import SectionHeader from "../../ui/website/home/SectionHeader";
export default function PersonalGoals() {
  const [activeTab, setActiveTab] = useState("الكل");

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

  const types = [...new Set(goals.map((goal) => goal.type))];

  const tabs = ["الكل", ...types];

  const filteredGoals =
    activeTab === "الكل"
      ? goals
      : goals.filter((goal) => goal.type === activeTab);

  return (
    <div className="personal-goals container page">
   <SectionHeader
  title="الأهداف الشخصية"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  resultCount={filteredGoals.length}
/>

      <div className="row g-3">
        {filteredGoals.map((goal) => (
            <div className="col-12 col-md-6 col-lg-4">
          <GoalCard key={goal.id} {...goal} />
             </div>

        ))}
      </div>

      
    </div>
  );
}
