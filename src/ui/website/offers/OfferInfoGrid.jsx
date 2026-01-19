import { useTranslation } from "react-i18next";
import ryal from "../../../assets/icons/ryal.svg";
export default function OfferInfoGrid({ offer }) {
  const { t } = useTranslation();
  return (
    <div className="info-grid">
      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.field")}</div>
        <div className="value">{offer.category_title}</div>
      </div>

      <div className="info-box info-box-grow-min-width">
        <div className="label">{t("website.offerDetails.specialty")}</div>
        <div className="value">{offer.sub_category_title}</div>
      </div>

      <div className="info-box info-box-grow-min-width">
        <div className="label">{t("website.offerDetails.helpValue")}</div>
        <div className="value">
          {offer.help_service.price} <img src={ryal} alt="ريال" />
        </div>
      </div>

      <div className="info-box info-box-grow-min-width">
        <div className="label">{t("beneficiaryIdentityPreference")}</div>
        <div className="value">{t(`${offer.preferred_gender}`)}</div>
      </div>

      <div className="info-box info-box-grow-min-width">
        <div className="label">{t("website.offerDetails.ageRange")}</div>
        <div className="value">
          <div className="value">
            {offer?.help_service?.from_age === 0 ||
            offer?.help_service?.to_age === 0
              ? t("undefined")
              : `${offer?.help_service?.from_age} -
                      ${offer?.help_service?.to_age}`}{" "}
          </div>
          {/* {offer.help_service.from_age} - {offer.help_service.to_age} */}
        </div>
      </div>

      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.duration")}</div>
        <div className="value">
          {offer.help_service.duration}{" "}
          {offer.help_service.duration < 10 ? t("days") : t("day")}
        </div>
      </div>
    </div>
  );
}
