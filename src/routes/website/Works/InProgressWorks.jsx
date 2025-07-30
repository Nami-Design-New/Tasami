import React from "react";
import InProgressCard from "../../../ui/cards/InProgressCard";

export default function InProgressWorks() {
  const cardsData = [
   {
  id: 1,
  title: "تنفيذ موقع إلكتروني لبيع الكتب",
  date: "1 أغسطس 2025",
  type: "مؤسسة",
  triangleImage: "/icons/triangle.svg",
},

    {
      id: 2,
      title: "تطبيق متابعة المهام للفرق الصغيرة",
      date: "5 أغسطس 2025",
      type: "مؤسسة",
      triangleImage: "/icons/bluetriangle.svg",
      hasHelper: false,
      status: "stopped",
      statusDate: "25 يوليو 2025 | 14:45",
    },
    {
      id: 3,
      title: "تطبيق متابعة المهام للفرق الصغيرة",
      date: "5 أغسطس 2025",
      type: "مؤسسة",
      triangleImage: "/icons/graytriangle.svg",
      hasHelper: false,
       helper: {
    id: 1,
    name: "رحاب سعيد",
    image: "/images/p1.png",
    rating: "4.9",
    country: "مصر",
    status: true,
  },
    },
  ];

  return (
    <div className="in-progress-works mt-30">
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
