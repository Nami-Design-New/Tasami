import React from "react";
import InProgressCard from "../../../ui/cards/InProgressCard";

export default function InProgressWorks() {
  const cardsData = [
    {
      id: 1,
      title: "تنفيذ موقع إلكتروني لبيع الكتب",
      date: "1 أغسطس 2025",
      type: "مؤسسة",
      offers: "عرض واحد",
      triangleImage: "/icons/triangle.svg",
      hasHelper: true,
    },
    {
      id: 2,
      title: "تطبيق متابعة المهام للفرق الصغيرة",
      date: "5 أغسطس 2025",
      type: "فرد",
      triangleImage: "/icons/graytriangle.svg",
      hasHelper: false,
    },
  ];

  return (
    <div className="in-progress-works mt-4">
      <div className="container">
        <div className="row">
          {cardsData.map((card) => (
            <div className="col-12 col-md-6 col-lg-4" key={card.id}>
              <InProgressCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
