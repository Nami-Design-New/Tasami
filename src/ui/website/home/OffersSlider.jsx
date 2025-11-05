import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OfferCard from "../../cards/OfferCard";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function OffersSlider({ offers }) {
  const { t } = useTranslation();
  return (
    <section className="offers-slider">
      <div className="slider-header">
        <div className="text">
          <h2>{t("website.home.offersTitle")}</h2>
          <p>{t("website.home.offersSubtitle")}</p>
        </div>
        <Link to="/offers" className="view-all">
          {t("showAll")}
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        observer={false}
        observeParents={false}
        watchOverflow={true}
        resizeObserver={false}
      >
        {offers.map((offer, index) => (
          <SwiperSlide
            key={offer.id}
            style={{ height: "100%" }}
            virtualIndex={index}
          >
            <OfferCard offer={offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
