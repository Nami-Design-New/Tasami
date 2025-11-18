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
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center p-5">
        {/* Offline Icon */}
        <svg
          fill="#0d0d0d18"
          width="120px"
          height="120px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>no-wifi-line</title> {/* paths (unchanged) */}
        </svg>

        {/* Title */}
        <h2 className="display-5 fw-bold text-dark mb-3">
          {t("offline.title")}
        </h2>

        {/* Message */}
        <p className="lead text-muted mb-5" style={{ maxWidth: "500px" }}>
          {message || t("offline.message")}
        </p>

        {/* Retry Button */}
        <CustomButton onClick={handleRetry} color="fire" size="large">
          {t("offline.retry")}
        </CustomButton>
      </div>
    </div>
  );
};

export default OfflineBanner;
