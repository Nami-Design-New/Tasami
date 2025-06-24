// HelpersSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import HelperCard from "../../cards/HelperCard";  

const helpers = [
    {
        id: 1,
        name: "انس تركي",
        country: "السعودية",
        rating: 4.4,
        type: "ريادي",
        members: 40,
        price: 248,
        image: "/images/p2.png",
        status: true,
    },
    {
        id: 2,
        name: "مها صالح",
        country: "الإمارات",
        rating: 4.7,
        type: "تقنية",
        members: 35,
        price: 212,
        image: "/images/p1.png",
        status: true,
    },
    {
        id: 3,
        name: "انس تركي",
        country: "السعودية",
        rating: 4.4,
        type: "ريادي",
        members: 40,
        price: 228,
        image: "/images/p2.png",
        status: true,
    },
    {
        id: 4,
        name: "مها صالح",
        country: "الإمارات",
        rating: 4.7,
        type: "تقنية",
        members: 35,
        price: 292,
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
        spaceBetween={35}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
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
