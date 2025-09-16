import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PersonalHelperDoc({ tabs = [] }) {
  const { t } = useTranslation();
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const currentTab = tabs.find((tab) => tab.id === activeTabId);
  if (!currentTab)
    return (
      <div className="empty-data">
        <p>{t("website.platform.cv.noDocuments")}</p>
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
            <h5>{t("website.assistants.type")}</h5>
            <p>{currentTab.document_type_title}</p>
          </div>
          <div className="exp-info-box">
            <h5>{t("website.assistants.issuer")}</h5>
            <p>{currentTab.document_auth_title}</p>
          </div>
          <div className="exp-info-box">
            <h5>{t("website.assistants.number")}</h5>
            <p>{currentTab.document_number}</p>
          </div>
          <div className="exp-info-box">
            <h5 className="value">{t("website.assistants.expiry_date")}</h5>
            <p className="value">{currentTab.end_date}</p>
          </div>
        </div>
      </div>
    </>
  );
}
