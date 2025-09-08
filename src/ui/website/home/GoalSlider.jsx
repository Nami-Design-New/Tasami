import { Link } from "react-router";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GoalCard from "../../cards/GoalCard";
import { t } from "i18next";

export default function GoalSlider({ goals }) {
  return (
    <div className="goal-slider">
      <div className="slider-header">
        <div className="text">
          <h2> {t("website.personalGoals.header.title")} </h2>
          <p> {t("website.personalGoals.header.subTitle")} </p>
        </div>
        <Link to="/Personal-goals" className="view-all">
          عرض الكل
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {goals.map((goal) => (
          <SwiperSlide key={goal.id}>
            <GoalCard goal={goal} showfav={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
