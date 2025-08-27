import { Link } from "react-router";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GoalCard from "../../cards/GoalCard";
import { t } from "i18next";

export default function GoalSlider() {
  const goals = [
    {
      id: 1,
      name: "سلطان حسن",
      title: "إنشاء متجر لبيع مستلزمات الطباعة ثلاثية الأبعاد في السعودية.",
      date: "16 فبراير 2025",
      type: "ريادي",
      offers: 12,
      image: "/images/profile1.png",
      status: true,
    },
    {
      id: 2,
      name: "علياء السالم",
      title:
        "تطوير تطبيق لتسهيل الوصول إلى الخدمات الصحية في الإمارات للمواطنين والمقيمين.",
      date: "10 مارس 2025",
      type: "تقنية",
      offers: 8,
      image: "/images/profile2.png",
      status: false,
    },
    {
      id: 3,
      name: "محمد العلي",
      title: "إنشاء منصة تعليمية لتعليم البرمجة للأطفال في العالم العربي.",
      date: "5 أبريل 2025",
      type: "تعليم",
      offers: 15,
      image: "/images/profile2.png",
      status: true,
    },
    {
      id: 4,
      name: "سارة القحطاني",
      title: "تطوير موقع إلكتروني لبيع المنتجات اليدوية والحرفية في الكويت.",
      date: "20 مايو 2025",
      type: "ريادي",
      offers: 10,
      image: "/images/profile1.png",
      status: false,
    },
  ];
  return (
    <div className="goal-slider">
      <div className="slider-header">
        <div className="text">
          <h2> {t("website.personalGoals")} </h2>
          <p> {t("")} </p>
        </div>
        <Link to="/Personal-goals" className="view-all">
          عرض الكل
        </Link>
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
            <GoalCard {...goal} showfav={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
