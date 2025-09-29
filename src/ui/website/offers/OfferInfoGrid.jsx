import { useTranslation } from "react-i18next";

export default function OfferInfoGrid({ offer }) {
  const { t } = useTranslation();
  return (
    <div className="info-grid">
      <div className="info-box">
        <div className="label">{t("website.offerDetails.field")}</div>
        <div className="value">{offer.category_title}</div>
      </div>

      <div className="info-box">
        <div className="label">{t("website.offerDetails.specialty")}</div>
        <div className="value">{offer.sub_category_title}</div>
      </div>

      <div className="info-box">
        <div className="label">{t("website.offerDetails.helpValue")}</div>
        <div className="value">
          {offer.help_service.price} <img src="/icons/ryal.svg" alt="ريال" />
        </div>
      </div>

      <div className="info-box">
        <div className="label">{t("website.offerDetails.preferredGender")}</div>
        <div className="value">{offer.preferred_gender}</div>
      </div>

      <div className="info-box">
        <div className="label">{t("website.offerDetails.ageRange")}</div>
        <div className="value">
          {offer.help_service.from_age} - {offer.help_service.to_age}
        </div>
      </div>

      <div className="info-box">
        <div className="label">{t("website.offerDetails.duration")}</div>
        <div className="value">
          {offer.help_service.duration} {t("common.days")}
        </div>
      </div>
    </div>
  );
}
