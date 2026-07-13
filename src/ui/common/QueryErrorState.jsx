import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  API_ERROR_KINDS,
  getErrorMessage,
  isApiError,
} from "../../lib/apiError";
import CustomButton from "../CustomButton";

export default function QueryErrorState({ error, onRetry, compact = false }) {
  const { t } = useTranslation();
  const notFound =
    isApiError(error) && error.kind === API_ERROR_KINDS.NOT_FOUND;

  return (
    <div
      className={`text-center ${compact ? "p-3" : "p-5"}`}
      role="alert"
      aria-live="polite"
    >
      <h3>{t(notFound ? "errors.api.notFoundTitle" : "errors.api.loadTitle")}</h3>
      <p className="text-muted">{getErrorMessage(error, t)}</p>
      {!notFound && typeof onRetry === "function" && (
        <CustomButton type="button" onClick={onRetry} color="secondary">
          {t("errors.api.retry")}
        </CustomButton>
      )}
    </div>
  );
}

QueryErrorState.propTypes = {
  error: PropTypes.instanceOf(Error),
  onRetry: PropTypes.func,
  compact: PropTypes.bool,
};

