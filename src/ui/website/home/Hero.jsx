import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero({ sliders }) {
  return (
    <div className="hero-section">
      <Swiper
        slidesPerView={1}
        effect="fade"
        speed={2000}
        loop
        centeredSlides
        className="hero_slider"
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="img">
              <img src={slide.image} alt={slide.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
