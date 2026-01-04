import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";

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
      <Swiper
        spaceBetween={8}
        breakpoints={{
          0: { slidesPerView: 2 },
          375: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          992: { slidesPerView: 6 },
        }}
        style={{ height: "100%", paddingBottom: "10px" }}
        modules={[Scrollbar]}
        scrollbar={{ draggable: true, dragSize: 90, hide: false }}
      >
        {tabs.map((tab) => (
          <SwiperSlide style={{ height: "auto" }} key={tab.id}>
            <button
              className={`tab-button ${activeTabId === tab.id ? "active" : ""}`}
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
          <p>{currentTab.document_type}</p>
        </div>
        <div className="exp-info-box">
          <h5>{t("website.assistants.issuer")}</h5>
          <p>{currentTab.document_auth}</p>
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
    </>
  );
}
