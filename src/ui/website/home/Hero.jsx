import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import React from "react";

export default function Hero() {
  const slides = [
    {
      id: 1,
      image: "/images/slide1.png",
      title: "img1",
    },
    {
      id: 2,
      image: "/images/slide2.png",
      title: "img2",
    },
    {
      id: 3,
      image: "/images/slide3.png",
      title: "img3",
    },
  ];

  return (
    <div className="hero-section">
      <div className="container">

   
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="img">
              <img src={slide.image} alt={slide.title} />      
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
       </div>
  );
}
