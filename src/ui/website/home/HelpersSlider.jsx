import { Link } from "react-router";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import HelperCard from "../../cards/HelperCard";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

export default function HelpersSlider({ helpers }) {
  const { t } = useTranslation();
  return (
    <section className="helpers-slider">
      <div className="slider-header">
        <div className="text">
          <h2>{t("website.home.heplersTitle")}</h2>
          <p>{t("website.home.heplersSubtitle")}</p>
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
        style={{ height: "100%" }}
      >
        {helpers.map((helper) => (
          <SwiperSlide
            key={helper.id}
            style={{ height: "auto", cursor: "pointer" }}
          >
            <HelperCard helper={helper} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
