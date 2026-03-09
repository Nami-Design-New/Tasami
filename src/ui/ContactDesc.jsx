import { useTranslation } from "react-i18next";

export default function ContactDesc() {
  const { t } = useTranslation();
  return (
    <div className="contact-info-wrapper">
      <h3 className="info-title">{t("contact_info_title")}</h3>
      <p className="info-desc">{t("contact_info_description")}</p>

      <h5 className="info-subtitle">{t("contact_info_how_can_we_help")}</h5>
      <ul className="info-list">
        <li>{t("contact_info_service_inquiry")}</li>
        <li>{t("contact_info_suggestions")}</li>
        <li>{t("contact_info_report_issue")}</li>
        <li>{t("contact_info_collaboration")}</li>
      </ul>

      <p className="info-footer">{t("contact_info_welcome_message")}</p>
    </div>
  );
}
