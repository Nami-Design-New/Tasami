import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OfferCard from "../../cards/OfferCard";
import { Link } from "react-router";

const offers = [
  {
    id: 1,
    name: "علي الزهراني",
    rating: 4.8,
    title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
    country: "البحرين",
    type: "مؤسس - تمكين المرأة",
    price: 2200,
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
    price: 2500,
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
    price: 2200,
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
    price: 2500,
    image: "/images/p1.png",
    status: true,
  },
  {
    id: 5,
    name: "علي الزهراني",
    rating: 4.8,
    title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
    country: "البحرين",
    type: "مؤسس - تمكين المرأة",
    price: 2200,
    image: "/images/p2.png",
    status: true,
  },
];

export default function OffersSlider() {
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
