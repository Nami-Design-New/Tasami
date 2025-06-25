import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router";
import GoalCard from "../../cards/GoalCard";

export default function GoalSlider() {
  const goals = [
    {
      id: 1,
      name: "سلطان حسن",
      title: "إنشاء متجر لبيع مستلزمات الطباعة ثلاثية الأبعاد في السعودية.",
      country: "السعودية",
      date: "16 فبراير 2025",
      type: "ريادي - تجارة إلكترونية",
      offers: 12,
      image: "/images/profile1.png",
      status: true,
    },
    {
      id: 2,
      name: "علياء السالم",
      title: "تطوير تطبيق لتسهيل الوصول إلى الخدمات الصحية في الإمارات للمواطنين والمقيمين.",
      country: "الإمارات",
      date: "10 مارس 2025",
      type: "تقنية - تطبيقات موبايل",
      offers: 8,
      image: "/images/profile2.png",
      status: false,
    },
    {
      id: 3,
      name: "محمد العلي",
      title: "إنشاء منصة تعليمية لتعليم البرمجة للأطفال في العالم العربي.",
      country: "مصر",
      date: "5 أبريل 2025",
      type: "تعليم - تقنية",
      offers: 15,
      image: "/images/profile2.png",
      status: true,
    },
    {
      id: 4,
      name: "سارة القحطاني",
      title: "تطوير موقع إلكتروني لبيع المنتجات اليدوية والحرفية في الكويت.",
      country: "الكويت",
      date: "20 مايو 2025",
      type: "ريادي - تجارة إلكترونية",
      offers: 10,
      image: "/images/profile1.png",
      status: false,
    }
  ];
  return (
    <div className="goal-slider container">
      <div className="slider-header">
        <div className="text">
          <h2>الأهداف الشخصية</h2>
          <p>
            استعرض جميع الأهداف المنشورة على المنصة
          </p>
        </div>
        <Link to="/Personal-goals" className="view-all">عرض الكل</Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {goals.map((goal) => (
          <SwiperSlide key={goal.id}>
            <GoalCard {...goal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
