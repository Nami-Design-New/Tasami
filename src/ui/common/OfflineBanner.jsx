import { useTranslation } from "react-i18next";
import CustomButton from "../CustomButton";

const OfflineBanner = ({ onRetry, message }) => {
  const { t } = useTranslation();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className="alert alert-warning d-flex align-items-center justify-content-between gap-3 m-0 rounded-0"
      role="status"
      aria-live="polite"
      style={{ position: "sticky", top: 0, zIndex: 9999 }}
    >
      <div>
        <strong>{t("offline.title")}</strong>{" "}
        <span>{message || t("offline.message")}</span>
      </div>
      <CustomButton
        type="button"
        onClick={handleRetry}
        color="fire"
        size="small"
      >
        {t("offline.retry")}
      </CustomButton>
    </div>
  );
};

export default OfflineBanner;
