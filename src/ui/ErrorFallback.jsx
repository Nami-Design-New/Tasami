import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Link,
  useLocation,
  useRouteError,
} from "react-router";
import errorImg from "../assets/sys-icons/error.svg";
import {
  API_ERROR_KINDS,
  getErrorMessage,
  isApiError,
} from "../lib/apiError";
import { reportError } from "../lib/errorReporter";
import { ROLE_REDIRECTS } from "../utils/constants";
import CustomButton from "./CustomButton";

export default function ErrorFallback() {
  const { t } = useTranslation();
  const error = useRouteError();
  const location = useLocation();

  useEffect(() => {
    const reportableRouteError =
      isRouteErrorResponse(error) && error.status >= 500;
    const reportableApiError =
      isApiError(error) &&
      [API_ERROR_KINDS.NETWORK, API_ERROR_KINDS.SERVER].includes(error.kind);
    const unexpectedError = error instanceof Error && !isApiError(error);
    if (reportableRouteError || reportableApiError || unexpectedError) {
      reportError(error, { area: "route-error", path: location.pathname });
    }
  }, [error, location.pathname]);

  const getErrorDetails = () => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        title: t("errors.api.loadTitle"),
        message: t(
          error.status === 404
            ? "errors.api.notFound"
            : "errors.api.unknown",
        ),
      };
    }

    if (isApiError(error)) {
      return {
        status: error.apiCode || error.httpStatus || 500,
        title: t("errors.appTitle"),
        message: getErrorMessage(error, t),
      };
    }

    return {
      status: 500,
      title: t("errors.unexpectedTitle"),
      message: t("errors.unexpectedMessage"),
    };
  };

  const { status, title, message } = getErrorDetails();
  const roleRedirectPath = Object.values(ROLE_REDIRECTS).find((path) =>
    location.pathname.startsWith(path),
  );
  const roleKey = Object.keys(ROLE_REDIRECTS).find(
    (key) => ROLE_REDIRECTS[key] === roleRedirectPath,
  );

  return (
    <div className="error-page" role="alert">
      <div className="container">
        <img src={errorImg} alt={t("pageNotFound.alt")} />
        <h1 className="error-title">
          {t("errors.oops")} {title} ({status})
        </h1>
        <p className="error-description">{message}</p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <CustomButton type="button" onClick={() => window.location.reload()}>
            {t("errors.api.reload")}
          </CustomButton>
          <Link to={roleRedirectPath || "/"} className="button">
            {t("pageNotFound.return")} {" "}
            {roleKey
              ? roleKey.charAt(0).toUpperCase() + roleKey.slice(1)
              : t("pageNotFound.homepage")}
          </Link>
        </div>
      </div>
    </div>
  );
}
