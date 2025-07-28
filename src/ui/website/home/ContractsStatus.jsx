import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
Chart.register(ArcElement, Tooltip, Legend);

const data = [
  {
    id: 1,
    title: "اجمالي الاعمال",
    count: 128,
  },
  {
    id: 2,
    title: "بانتظار التنفيذ",
    count: 38,
  },
  {
    id: 3,
    title: "قيد التنفيذ",
    count: 32,
  },
  {
    id: 4,
    title: "مكتمله",
    count: 58,
  },

];

export default function ContractsStatus() {
 
  return (
    <section className="contracts-status container">
      <div className="slider-header">
        <div className="text">
          <h2>اعمالي</h2>
          <p>راجع وتابع اعمالك بسهولة</p>
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
        {data.map((stat) => (
          <SwiperSlide key={stat.id}>
            <div className="contract-status__card">
              <h3 className="contract-status__card-title">{stat.title}</h3>
              <p className="contract-status__card-count">{stat.count}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
