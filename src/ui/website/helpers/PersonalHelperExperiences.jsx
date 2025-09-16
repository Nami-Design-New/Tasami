import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function PersonalHelperExperiences({ tabs }) {
  const { t } = useTranslation();

  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const currentTab = tabs.find((tab) => tab.id === activeTabId);

  if (!currentTab)
    return (
      <div className="empty-data">
        <p>{t("website.platform.cv.noExperience")}</p>
      </div>
    );

  return (
    <>
      <div className="exp-info-tabs">
        <Swiper
          style={{ margin: 0 }}
          modules={[FreeMode]}
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          grabCursor={true}
        >
          {tabs.map((tab) => (
            <SwiperSlide key={tab.id}>
              <button
                className={`tab-button ${
                  activeTabId === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.category_title}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="exp-info-grid">
          <div className="exp-info-box">
            <h5>{t("website.assistants.qualification")}</h5>
            <p>{currentTab.qualification_text}</p>
          </div>
          <div className="exp-info-box">
            <h5 className="value">
              {t("website.assistants.years_of_experience")}
            </h5>
            <p className="value">{currentTab.number_of_years}</p>
          </div>
        </div>
      </div>
    </>
  );
}
