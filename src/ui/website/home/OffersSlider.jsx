import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OfferCard from "../../cards/OfferCard";
import { Link } from "react-router";

export default function OffersSlider({ offers }) {
  console.log("offers -------------", offers);

  return (
    <section className="offers-slider">
      <div className="slider-header">
        <div className="text">
          <h2>عروض المساعدة</h2>
          <p>جميع المساعدات التي يقدمها المساعدون</p>
        </div>
        <Link to="/offers" className="view-all">
          عرض الكل
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <OfferCard offer={offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
