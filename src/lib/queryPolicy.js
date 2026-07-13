import { isApiError, isCancelledError } from "./apiError";

export function shouldRetryQuery(failureCount, error) {
  if (failureCount >= 1 || isCancelledError(error)) return false;
  return isApiError(error) && error.retryable;
}

