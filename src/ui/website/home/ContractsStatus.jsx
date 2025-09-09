import { useTranslation } from "react-i18next";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ContractsStatus({ stats }) {
  const { t } = useTranslation();
  return (
    <section className="contracts-status">
      <div className="slider-header">
        <div className="text">
          <h2>{t("website.home.myWroksTitle")}</h2>
          <p>{t("website.home.myWroksSubtitle")}</p>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="contract-status__card">
            <h3 className="contract-status__card-title">
              {t("website.home.totalWork")}
            </h3>
            <p className="contract-status__card-count">{stats.total_works}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="contract-status__card">
            <h3 className="contract-status__card-title">
              {t("website.home.inProgress")}
            </h3>
            <p className="contract-status__card-count">
              {stats.progress_works}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="contract-status__card">
            <h3 className="contract-status__card-title">
              {t("website.home.pending")}
            </h3>
            <p className="contract-status__card-count">{stats.waiting_works}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="contract-status__card">
            <h3 className="contract-status__card-title">
              {t("website.home.completed")}
            </h3>
            <p className="contract-status__card-count">
              {" "}
              {stats.completed_works}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
