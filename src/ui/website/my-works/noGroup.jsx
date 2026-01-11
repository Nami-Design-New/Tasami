import { useTranslation } from "react-i18next";

export default function NoGroup() {
  const { t } = useTranslation();

  return (
    <div className="no-groups">
      <img src="icons/alert-icon.svg" alt={t("no_group_alt")} />
      <h1>{t("no_group_title")}</h1>
      <p>{t("no_group_description")}</p>
    </div>
  );
}
