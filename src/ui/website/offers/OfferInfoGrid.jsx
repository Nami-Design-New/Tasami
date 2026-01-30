import { useTranslation } from "react-i18next";
import ryal from "../../../assets/icons/ryal.svg";
export default function OfferInfoGrid({ offer }) {
  const { t } = useTranslation();
  return (
    <div className="info-grid">
      <div className="info-box info-box-grow-min-width ">
        <h4 className="label">{t("website.offerDetails.field")}</h4>
        <p className="value">{offer.category_title}</p>
      </div>

      <div className="info-box info-box-grow-min-width">
        <h4 className="label">{t("website.offerDetails.specialty")}</h4>
        <p className="value">{offer.sub_category_title}</p>
      </div>

      <div className="info-box info-box-grow-min-width">
        <h4 className="label">{t("website.offerDetails.helpValue")}</h4>
        <p className="value">
          {offer.help_service.price} <img src={ryal} alt="ريال" />
        </p>
      </div>

      <div className="info-box info-box-grow-min-width">
        <h4 className="label">{t("beneficiaryIdentityPreference")}</h4>
        <p className="value">{t(`${offer.preferred_gender}`)}</p>
      </div>

      <div className="info-box info-box-grow-min-width">
        <h4 className="label">{t("website.offerDetails.ageRange")}</h4>
        <div className="value">
          <p className="value">
            {offer?.help_service?.from_age === 0 ||
            offer?.help_service?.to_age === 0
              ? t("undefined")
              : `${offer?.help_service?.from_age} -
                      ${offer?.help_service?.to_age}`}{" "}
          </p>
          {/* {offer.help_service.from_age} - {offer.help_service.to_age} */}
        </div>
      </div>

      <div className="info-box info-box-grow-min-width ">
        <h4 className="label">{t("website.offerDetails.duration")}</h4>
        <p className="value">
          {offer.help_service.duration}{" "}
          {offer.help_service.duration < 10 ? t("days") : t("day")}
        </p>
      </div>
    </div>
  );
}
