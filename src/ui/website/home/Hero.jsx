import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero({ sliders }) {
  return (
    <div className="hero-section">
      <Swiper
        slidesPerView={1}
        // effect="fade"
        speed={800}
        centeredSlides
        className="hero_slider"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, EffectFade]}
        observer={false}
        observeParents={false}
        watchOverflow={true}
        resizeObserver={false}
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="img">
              <img
                src={slide.image}
                alt={slide.title}
                // width="1920"
                // height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={"high"}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  aspectRatio: "375 / 178",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
