// HelpersSlider.jsx
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HelperCard from "../../cards/HelperCard";

const helpers = [
  {
    id: 1,
    name: "انس تركي",
    country: "السعودية",
    rating: 6,
    image: "/images/p2.png",
    status: true,
  },
  {
    id: 2,
    name: "مها صالح",
    country: "الإمارات",
    rating: 10,
    image: "/images/p1.png",
    status: true,
  },
  {
    id: 3,
    name: "انس تركي",
    country: "السعودية",
    rating: 8,
    image: "/images/p2.png",
    status: true,
  },
  {
    id: 4,
    name: "مها صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
  },
  {
    id: 5,
    name: "مني صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
  },
];

export default function HelpersSlider() {
  return (
    <section className="helpers-slider container">
      <div className="slider-header">
        <div className="text">
          <h2>المساعدون الشخصيون</h2>
          <p>أبرز المساعدون المشتركين في المنصة</p>
        </div>
        <a href="/personal-helpers" className="view-all">
          عرض الكل
        </a>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={48}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {helpers.map((helper) => (
          <SwiperSlide key={helper.id}>
            <HelperCard helper={helper} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
