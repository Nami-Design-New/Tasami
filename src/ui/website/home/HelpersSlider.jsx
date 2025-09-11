import { Link } from "react-router";
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
          {t("showall")}{" "}
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 16 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        // ⚡ performance tweaks
        observer={false}
        observeParents={false}
        watchOverflow={true}
        resizeObserver={false}
        style={{ height: "100%" }}
      >
        {helpers.map((helper, index) => (
          <SwiperSlide
            key={helper.id}
            style={{ height: "auto", cursor: "pointer" }}
            virtualIndex={index}
          >
            <HelperCard helper={helper} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
