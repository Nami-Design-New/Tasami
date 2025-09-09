import { Link } from "react-router";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GoalCard from "../../cards/GoalCard";
import { useTranslation } from "react-i18next";

export default function GoalSlider({ goals }) {
  const { t } = useTranslation();
  return (
    <div className="goal-slider">
      <div className="slider-header">
        <div className="text">
          <h2> {t("website.home.personalGoalsTitle")} </h2>
          <p> {t("website.home.personalGoalsSubtitle")} </p>
        </div>
        <Link to="/Personal-goals" className="view-all">
          {t("showAll")}
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
