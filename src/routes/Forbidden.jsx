import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  DASHBOARD_NOTIFICATIONS_PATH,
  ROLE_REDIRECTS,
} from "../utils/constants";
import forbiddenBro from "../assets/sys-icons/forbidden-bro.svg";

export default function Forbidden() {
  const { t } = useTranslation();
  const location = useLocation();

  const isDashboardContext =
    location.state?.from?.pathname?.startsWith(ROLE_REDIRECTS.dashboard) ||
    new URLSearchParams(location.search).get("context") === "dashboard";

  const roleRedirectPath = Object.values(ROLE_REDIRECTS).find((path) =>
    location.pathname.startsWith(path)
  );

  const roleKey = Object.keys(ROLE_REDIRECTS).find(
    (key) => ROLE_REDIRECTS[key] === roleRedirectPath
  );

  return (
    <div className="error-page">
      <div className="container">
        <img src={forbiddenBro} alt={t("pageNotFound.alt")} />

        <h1 className="error-title">{t("forbidden.title")}</h1>

        <p className="error-description">{t("forbidden.description")}</p>

        <Link
          to={
            isDashboardContext
              ? DASHBOARD_NOTIFICATIONS_PATH
              : roleRedirectPath || "/"
          }
          className="button"
        >
          {t("pageNotFound.return")}{" "}
          {roleKey
            ? roleKey.charAt(0).toUpperCase() + roleKey.slice(1)
            : t("pageNotFound.homepage")}
        </Link>
      </div>
    </div>
  );
}
