import { useTranslation } from "react-i18next";
import { Link, useRouteError, useLocation } from "react-router";
import { ROLE_REDIRECTS } from "../utils/constants";
import errorImg from "../assets/sys-icons/error.svg";

export default function ErrorFallback() {
  const { t } = useTranslation();
  const error = useRouteError();
  const location = useLocation();

  const getErrorDetails = () => {
    if (error instanceof Error) {
      return {
        status: 500,
        title: t("errors.appTitle"),
        message: error.message || t("errors.appMessage"),
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
    location.pathname.startsWith(path)
  );

  const roleKey = Object.keys(ROLE_REDIRECTS).find(
    (key) => ROLE_REDIRECTS[key] === roleRedirectPath
  );
  return (
    <div className="error-page">
      <div className="container">
        <img src={errorImg} alt={t("pageNotFound.alt")} />

        <h1 className="error-title">
          {t("errors.oops")} {title} ({status})
        </h1>

        <p className="error-description">{message}</p>

        <Link to={roleRedirectPath || "/"} className="button">
          {t("pageNotFound.return")}{" "}
          {roleKey
            ? roleKey.charAt(0).toUpperCase() + roleKey.slice(1)
            : t("pageNotFound.homepage")}
        </Link>
      </div>
    </div>
  );
}
