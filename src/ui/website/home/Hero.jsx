import { useEffect } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero({ sliders }) {
  // useEffect(() => {
  //   if (sliders?.length > 0) {
  //     const link = document.createElement("link");
  //     link.rel = "preload";
  //     link.as = "image";
  //     link.href = sliders[0].image;
  //     link.fetchPriority = "high";
  //     document.head.appendChild(link);
  //   }
  // }, [sliders]);
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
