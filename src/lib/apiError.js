import axios from "axios";
import i18n from "../utils/i18n";

export const API_ERROR_KINDS = Object.freeze({
  APPLICATION: "application",
  AUTHENTICATION: "authentication",
  BAD_REQUEST: "badRequest",
  CANCELLED: "cancelled",
  CONFLICT: "conflict",
  FORBIDDEN: "forbidden",
  NETWORK: "network",
  NOT_FOUND: "notFound",
  OFFLINE: "offline",
  RATE_LIMIT: "rateLimit",
  SERVER: "server",
  TIMEOUT: "timeout",
  UNKNOWN: "unknown",
  VALIDATION: "validation",
});

const ERROR_CONFIG = {
  400: [API_ERROR_KINDS.BAD_REQUEST, "errors.api.badRequest"],
  401: [API_ERROR_KINDS.AUTHENTICATION, "errors.api.authentication"],
  403: [API_ERROR_KINDS.FORBIDDEN, "errors.api.forbidden"],
  404: [API_ERROR_KINDS.NOT_FOUND, "errors.api.notFound"],
  409: [API_ERROR_KINDS.CONFLICT, "errors.api.conflict"],
  422: [API_ERROR_KINDS.VALIDATION, "errors.api.validation"],
  429: [API_ERROR_KINDS.RATE_LIMIT, "errors.api.rateLimit"],
  500: [API_ERROR_KINDS.SERVER, "errors.api.server"],
  503: [API_ERROR_KINDS.SERVER, "errors.api.unavailable"],
};

const translate = (key) => i18n.t(key, { defaultValue: key });

const getErrorConfig = (code) => {
  if (ERROR_CONFIG[code]) return ERROR_CONFIG[code];
  if (code >= 500) {
    return [API_ERROR_KINDS.SERVER, "errors.api.server"];
  }
  return [API_ERROR_KINDS.APPLICATION, "errors.api.unknown"];
};

const getServerMessage = (data) =>
  typeof data?.message === "string" && data.message.trim()
    ? data.message.trim()
    : null;

export class ApiError extends Error {
  constructor({
    httpStatus = null,
    apiCode = null,
    kind = API_ERROR_KINDS.UNKNOWN,
    messageKey = "errors.api.unknown",
    serverMessage = null,
    retryable = false,
    originalError = null,
  } = {}) {
    super(serverMessage || translate(messageKey));
    this.name = "ApiError";
    this.httpStatus = httpStatus;
    this.apiCode = apiCode;
    this.kind = kind;
    this.messageKey = messageKey;
    this.serverMessage = serverMessage;
    this.retryable = retryable;
    this.originalError = originalError;
  }
}

export const isApiError = (error) => error instanceof ApiError;

export const isValidationError = (error) =>
  isApiError(error) && error.kind === API_ERROR_KINDS.VALIDATION;

export const isCancelledError = (error) =>
  isApiError(error) && error.kind === API_ERROR_KINDS.CANCELLED;

export function assertSuccessfulApiResponse(response) {
  const data = response?.data;
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    !Object.prototype.hasOwnProperty.call(data, "code")
  ) {
    return response;
  }

  const apiCode = Number(data.code);
  if (apiCode === 200) {
    return response;
  }

  if (!Number.isFinite(apiCode)) {
    throw new ApiError({
      httpStatus: response.status,
      kind: API_ERROR_KINDS.UNKNOWN,
      messageKey: "errors.api.unknown",
      serverMessage: getServerMessage(data),
    });
  }

  const [kind, messageKey] = getErrorConfig(apiCode);
  throw new ApiError({
    httpStatus: response.status,
    apiCode,
    kind,
    messageKey,
    serverMessage: getServerMessage(data),
    retryable: false,
  });
}

export function normalizeApiError(error) {
  if (isApiError(error)) return error;

  if (axios.isCancel(error) || error?.code === "ERR_CANCELED") {
    return new ApiError({
      kind: API_ERROR_KINDS.CANCELLED,
      messageKey: "errors.api.cancelled",
      originalError: error,
    });
  }

  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
    return new ApiError({
      kind: API_ERROR_KINDS.TIMEOUT,
      messageKey: "errors.api.timeout",
      retryable: true,
      originalError: error,
    });
  }

  const httpStatus = Number(error?.response?.status) || null;
  if (httpStatus) {
    const [kind, messageKey] = getErrorConfig(httpStatus);
    return new ApiError({
      httpStatus,
      kind,
      messageKey,
      retryable: httpStatus >= 500,
      originalError: error,
    });
  }

  const offline =
    typeof navigator !== "undefined" && navigator.onLine === false;
  return new ApiError({
    kind: offline ? API_ERROR_KINDS.OFFLINE : API_ERROR_KINDS.NETWORK,
    messageKey: offline ? "errors.api.offline" : "errors.api.network",
    retryable: !offline,
    originalError: error,
  });
}

export function getErrorMessage(error, t = i18n.t.bind(i18n)) {
  if (!isApiError(error)) {
    return t("errors.api.unknown");
  }
  return error.serverMessage || t(error.messageKey);
}
