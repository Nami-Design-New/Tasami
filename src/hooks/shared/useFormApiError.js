import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getErrorMessage, isValidationError } from "../../lib/apiError";

export default function useFormApiError(watch) {
  const { t } = useTranslation();
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  useEffect(() => {
    if (typeof watch !== "function") return undefined;
    const subscription = watch(() => setApiErrorMessage(null));
    return () => subscription.unsubscribe();
  }, [watch]);

  const clearApiError = useCallback(() => setApiErrorMessage(null), []);

  const handleApiError = useCallback(
    (error) => {
      if (!isValidationError(error)) return false;
      setApiErrorMessage(getErrorMessage(error, t));
      return true;
    },
    [t],
  );

  return { apiErrorMessage, clearApiError, handleApiError };
}

