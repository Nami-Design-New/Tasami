import React from 'react';
import ProfileCard from '../../../ui/cards/ProfileCard';
import FeatureCard from '../../../ui/cards/FeatureCard';

export default function MyPlatform() {
  const cardsData = [
    {
      title: "عقود فردية نشطة",
      subtitle: "1 من 1",
    },
    {
      title: "المجموعات النشطة",
      subtitle: "1 من 2",
    },
    {
      title: "مدة الاشتراك",
      subtitle: "6 أشهر",
      icon: "fa-regular fa-clock"
    },
    {
      title: "بداية الاشتراك",
      subtitle: "23-12-2025",
      icon: "fa-regular fa-calendar-plus" 
    },
    {
      title: "نهاية الاشتراك",
      subtitle: "20-12-2025",
      icon: "fa-regular fa-calendar-xmark"
    }
  ];

  return (
    <div className="MyPlatform-page mt-30">
      <div className="container">
        <div className="info-box mb-4 d-flex align-items-start gap-2">
          <i className="fa-regular fa-circle-exclamation fs-5 mt-1"></i>
          <p>
            تقدم هذه المنصة مجموعة من الأدوات لإدارة أعمالك وأنشطتك كمساعد شخصي باحترافية وتحقيق أفضل تجربة لعملائك
          </p>
        </div>

        <ProfileCard />

        <div className="row mt-4">
          {cardsData.map((card, index) => (
            <div className="col-md-4" key={index}>
              <FeatureCard
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
