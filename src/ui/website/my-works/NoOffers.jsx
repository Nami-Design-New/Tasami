import { useTranslation } from "react-i18next";
import alertIcon from "../../../assets/icons/alert-icon.svg";
export default function NoOffers() {
  const { t } = useTranslation();

  return (
    <div className="no-groups">
      <img src={alertIcon} alt="No offers" />
      <h1>{t("works.myOffers.noOffers.title")}</h1>
      <p>{t("works.myOffers.noOffers.description")}</p>
    </div>
  );
}
