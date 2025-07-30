import React from "react";
import PendingCard from "../../../ui/cards/PendingCard";

export default function PendingWorks() {
  const cardsData = [
    {
      title: "إنشاء متجر إلكتروني لبيع مستلزمات الطباعة ثلاثية الأبعاد",
      date: "20 مارس 2025",
      type: "مؤسسة",
      progress: 1,
      triangleImage: "/icons/graytriangle.svg",
      steps: [
        { number: "1", label: "بدأ التنفيذ" },
        { number: "2", label: "التخطيط" },
      ],
    },
    {
      title: "تطوير تطبيق جوال لتسهيل الوصول إلى خدمات الرعاية الصحية",
      date: "20 مارس 2025",
      type: "مؤسسة",
      offers: "2+ عروض مبدئية",
      progress: 1,
      triangleImage: "/icons/triangle.svg",
      steps: [
        { number: "1", label: "العروض" },
        { number: "2", label: "الدفع" },
        { number: "3", label: "التخطيط" },
        { number: "4", label: "بدأ التنفيذ" },
      ],
    },
    {
      title: "تطوير تطبيق جوال لتسهيل الوصول إلى خدمات الرعاية الصحية",
      date: "20 مارس 2025",
      type: "مؤسسة",
      offers: "3+ عروض مبدئية",
      progress: 3,
      triangleImage: "/icons/bluetriangle.svg",
      steps: [
        { number: "1", label: "العروض" },
        { number: "2", label: "الدفع" },
        { number: "3", label: "التخطيط" },
        { number: "4", label: "بدأ التنفيذ" },
      ],
    },
  ];

  return (
    <div className="pending-works">
      <div className="container">
        <div className="row">
          {cardsData.map((card, index) => (
            <div  key={index}>
              <PendingCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
