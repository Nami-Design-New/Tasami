import { useTranslation } from "react-i18next";

export default function GoalInfoGrid({ goal }) {
  const { t } = useTranslation();

  return (
    <div className="info-grid ">
      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.field")}</div>
        <div className="value">{goal?.category_title}</div>
      </div>
      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.specialty")}</div>{" "}
        <div className="value">{goal?.sub_category_title}</div>
      </div>{" "}
      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.startDate")}</div>
        <div className="value">{goal?.goal?.help_start_date}</div>
      </div>
      <div className="info-box info-box-grow-min-width ">
        <div className="label">{t("website.offerDetails.preferredGender")}</div>
        <div className="value">{t(`${goal?.preferred_gender}`)}</div>
      </div>
      <div
        style={{
          minWidth: "100%",
        }}
        className="info-box info-box-grow-min-width "
      >
        <div className="label">{t("website.offerDetails.expectedData")}</div>
        <div className="value">{goal?.goal?.expected_duration_new_human}</div>
      </div>
    </div>
  );
}
