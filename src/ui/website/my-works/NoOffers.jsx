import { useTranslation } from "react-i18next";

export default function NoOffers() {
  const { t } = useTranslation();

  return (
    <div className="no-groups">
      <img src="/icons/alert-icon.svg" alt="No offers" />
      <h1>{t("works.myOffers.noOffers.title")}</h1>
      <p>{t("works.myOffers.noOffers.description")}</p>
    </div>
  );
}
