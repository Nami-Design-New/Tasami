import { Link } from "react-router";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import HelperCard from "../../cards/HelperCard";
import { Autoplay } from "swiper/modules";

export default function HelpersSlider({ helpers }) {
  return (
    <section className="helpers-slider">
      <div className="slider-header">
        <div className="text">
          <h2>المساعدون الشخصيون</h2>
          <p>أبرز المساعدون المشتركين في المنصة</p>
        </div>
        <Link to="/personal-helpers" className="view-all">
          عرض الكل
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        breakpoints={{
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
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
