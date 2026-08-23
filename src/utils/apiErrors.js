const UNAVAILABLE_RESOURCE_CODES = new Set([404, 410, 422]);

export function createApiResponseError(responseData, fallbackMessage) {
  const error = new Error(responseData?.message || fallbackMessage);
  error.status = responseData?.code;
  error.responseData = responseData;
  return error;
}

export function getApiErrorDetails(error) {
  const rawCode =
    error?.response?.data?.code ?? error?.response?.status ?? error?.status;
  const parsedCode = Number(rawCode);
  const code = Number.isFinite(parsedCode) ? parsedCode : undefined;
  const message =
    error?.response?.data?.message ||
    error?.responseData?.message ||
    error?.message;

  return {
    code,
    message,
    isUnavailable: UNAVAILABLE_RESOURCE_CODES.has(code),
  };
}
