import axios from "axios";
import { getToken, removeToken } from "../utils/token";
import {
  API_ERROR_KINDS,
  assertSuccessfulApiResponse,
  normalizeApiError,
} from "./apiError";
import { reportError } from "./errorReporter";

const AUTH_REQUEST_PATTERN = /auth\/(?:dh-)?(?:login|register|send-code|confirm-code|reset-password)/i;
const activeRedirects = new Set();

const redirectOnce = (target) => {
  if (typeof window === "undefined" || activeRedirects.has(target)) return;
  if (window.location.pathname === target) return;
  activeRedirects.add(target);
  window.location.replace(target);
};

const isAuthenticationRequest = (config) =>
  config?.skipAuthRedirect === true || AUTH_REQUEST_PATTERN.test(config?.url || "");

export function createApiClient({ tokenKey, loginPath, area }) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken(tokenKey);
    const lang = localStorage.getItem("i18nextLng") || "ar";
    config.headers["Accept-Language"] = lang;
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      try {
        return assertSuccessfulApiResponse(response);
      } catch (error) {
        if (error.kind === API_ERROR_KINDS.UNKNOWN) {
          reportError(error, { area, operation: "malformed-api-envelope" });
        }
        throw error;
      }
    },
    (error) => {
      const normalizedError = normalizeApiError(error);

      if (normalizedError.kind === API_ERROR_KINDS.AUTHENTICATION) {
        if (!isAuthenticationRequest(error.config)) {
          removeToken(tokenKey);
          redirectOnce(loginPath);
        }
      } else if (normalizedError.kind === API_ERROR_KINDS.FORBIDDEN) {
        redirectOnce("/forbidden");
      } else if (
        normalizedError.kind === API_ERROR_KINDS.SERVER ||
        normalizedError.kind === API_ERROR_KINDS.NETWORK
      ) {
        reportError(normalizedError, {
          area,
          operation: error.config?.method,
        });
      }

      return Promise.reject(normalizedError);
    },
  );

  return instance;
}
