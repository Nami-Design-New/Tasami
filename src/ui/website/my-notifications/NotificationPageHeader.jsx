import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import RoundedBackButton from "../../website-auth/shared/RoundedBackButton";

export default function NotificationPageHeader() {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="platform-header m-0">
        <RoundedBackButton>
          {" "}
          <i className="fa-solid fa-angle-right"></i>
        </RoundedBackButton>
        <h2 className="platform-header__title">{t("notification.title")}</h2>
      </div>
      <CustomButton
        style={{
          borderRadius: "100px",
          backgroundColor: "#0248960A",
          color: "#0D0D0D",
        }}
      >
        {t("notification.mark_all_read")}
      </CustomButton>
    </div>
  );
}
