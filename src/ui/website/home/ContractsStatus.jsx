import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Link } from "react-router";
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
  // const totalContracts = 128;
  // const data = {
  //   labels: ["بانتظار التنفيذ", "قيد التنفيذ", "مكتملة"],
  //   datasets: [
  //     {
  //       data: [30, 25, 45],
  //       backgroundColor: ["#e97b2c", "#63c5f9", "#20407c"],
  //       borderWidth: 0,
  //       cutout: "70%",
  //     },
  //   ],
  // };

  // const options = {
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: {
  //       callbacks: {
  //         label: (context) => `${context.label}: ${context.parsed}%`,
  //       },
  //     },
  //   },
  // };

  return (
    <section className="contracts-status container">
      <div className="slider-header">
        <div className="text">
          <h2>اعمالي</h2>
          <p>راجع وتتبع اعمالك بسهولة</p>
        </div>
        <Link to="/my-works" className="view-all">
          عرض الكل
        </Link>
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
