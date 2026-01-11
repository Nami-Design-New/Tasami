import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { ROLE_REDIRECTS } from "../utils/constants";
import notFound from "../assets/sys-icons/notFound.svg";

export default function PageNotFound() {
  const { t } = useTranslation();
  const location = useLocation();

  const roleRedirectPath = Object.values(ROLE_REDIRECTS).find((path) =>
    location.pathname.startsWith(path)
  );

  const roleKey = Object.keys(ROLE_REDIRECTS).find(
    (key) => ROLE_REDIRECTS[key] === roleRedirectPath
  );

  return (
    <div className="error-page">
      <div className="container">
        <img src={notFound} alt={t("pageNotFound.alt")} />

        <h1 className="error-title">{t("pageNotFound.title")}</h1>

        <p className="error-description">{t("pageNotFound.description")}</p>

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
