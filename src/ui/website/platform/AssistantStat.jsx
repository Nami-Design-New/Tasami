import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";

export default function AssistantStat() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);

  if (!user) return null;

  const items = [
    {
      title: t("website.platform.activeContracts"),
      value: (
        <>
          {user.active_individual_contracts} {t("website.platform.from")}{" "}
          {user.all_individual_contracts}
        </>
      ),
    },
    {
      title: t("website.platform.activeGroups"),
      value: (
        <>
          {user.active_groups} {t("website.platform.from")}{" "}
          {user.non_active_groups}
        </>
      ),
    },
    {
      title: t("website.platform.subscriptionPeriod"),
      value: (
        <>
          <span>{user.my_package_details.package.type_title}</span>
          {/* <img src="/icons/clock.svg" alt="clock" /> */}
        </>
      ),
    },
    {
      title: t("website.platform.startDate"),
      value: (
        <>
          <span>{user.my_package_details.start_date}</span>
          {/* <img src="/icons/calendar-check.svg" alt="start" /> */}
        </>
      ),
    },
    {
      title: t("website.platform.endDate"),
      value: (
        <>
          <span>
            {user.my_package_details.end_date
              ? user.my_package_details.end_date
              : "--"}
          </span>
          {/* <img src="/icons/calendar-x.svg" alt="end" /> */}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="exp-info-grid mt-3 d-none d-md-flex">
        {/* Desktop grid */}
        {items.map((item, idx) => (
          <div key={idx} className="exp-info-box ">
            <h5>{item.title}</h5>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
      {/* Mobile swiper */}
      <div className="exp-info-grid d-md-none mt-3">
        <Swiper
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            375: { slidesPerView: 3 },
          }}
          style={{ height: "100%", paddingBottom: "10px" }}
          modules={[Scrollbar]}
          scrollbar={{ draggable: true, dragSize: 90, hide: false }}
        >
          {items.map((item, idx) => (
            <SwiperSlide style={{ height: "auto" }} key={idx}>
              <div className="exp-info-box h-100">
                <h5>{item.title}</h5>
                <p>{item.value}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
