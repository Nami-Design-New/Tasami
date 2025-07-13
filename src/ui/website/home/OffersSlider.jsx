import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OfferCard from "../../cards/OfferCard";

const offers = [
  {
    id: 1,
    name: "علي الزهراني",
    rating: 4.8,
    title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
    country: "البحرين",
    type: "مؤسس - تمكين المرأة",
    price1: 2200,
    price2: 1700,
    image: "/images/p2.png",
    status: true,
  },
  {
    id: 2,
    name: "فاطمة الجهني",
    rating: 4.5,
    title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
    country: "الإمارات",
    type: "مبتكرة - تكنولوجيا المعلومات",
    price1: 2500,
    price2: 2000,
    image: "/images/p1.png",
    status: true,
  },
  {
    id: 3,
    name: "علي الزهراني",
    rating: 4.8,
    title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
    country: "البحرين",
    type: "مؤسس - تمكين المرأة",
    price1: 2200,
    price2: 1700,
    image: "/images/p2.png",
    status: true,
  },
  {
    id: 4,
    name: "فاطمة الجهني",
    rating: 4.5,
    title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
    country: "الإمارات",
    type: "مبتكرة - تكنولوجيا المعلومات",
    price1: 2500,
    price2: 2000,
    image: "/images/p1.png",
    status: true,
  },
];

export default function OffersSlider() {
  return (
    <section className="offers-slider container">
      <div className="slider-header">
        <div className="text">
          <h2>عروض المساعدة</h2>
          <p>جميع المساعدات التي يقدمها المساعدون</p>
        </div>
        <a href="/offers" className="view-all">
          عرض الكل
        </a>
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
            <OfferCard offer={offer} /> {/* ← استخدام الكومبوننت */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
