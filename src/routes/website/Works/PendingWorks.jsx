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
    },
    {
      title: "تطوير تطبيق جوال لتسهيل الوصول إلى خدمات الرعاية الصحية",
      date: "20 مارس 2025",
      type: "مؤسسة",
      offers: "2+ عروض مبدئية",
      progress: 2,
      triangleImage: "/icons/triangle.svg",
    },
    {
      title: "تطوير تطبيق جوال لتسهيل الوصول إلى خدمات الرعاية الصحية",
      date: "20 مارس 2025",
      type: "مؤسسة",
      offers: "3+ عروض مبدئية",
      progress: 3,
      triangleImage: "/icons/bluetriangle.svg",
    },
  ];

  return (
    <div className="pending-works mt-30">
      <div className="container">
        <div className="row">
          {cardsData.map((card, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <PendingCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
