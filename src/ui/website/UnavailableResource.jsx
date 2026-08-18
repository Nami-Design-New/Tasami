import { useTranslation } from "react-i18next";
import { getApiErrorDetails } from "../../utils/apiErrors";
import EmptySection from "../EmptySection";

export default function UnavailableResource({
  error,
  fallbackMessage,
  height = "450px",
}) {
  const { t } = useTranslation();
  const { isUnavailable, message } = getApiErrorDetails(error);
  const displayMessage = isUnavailable
    ? message || fallbackMessage
    : error
      ? t("messages_error")
      : fallbackMessage;

  return <EmptySection height={height} message={displayMessage} />;
}
