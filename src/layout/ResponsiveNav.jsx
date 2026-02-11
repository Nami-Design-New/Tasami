import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import navLogo from "../assets/icons/navlogo.svg";
import { useSelector } from "react-redux";

function ResponsiveNav() {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="small_menu">
      <NavLink to="/" className="menu_item">
        <img src={navLogo} alt="fav" />
        <span>{t("nav.start")}</span>
      </NavLink>
      <NavLink
        aria-label={t("nav.myWorks")}
        to="/my-works"
        className="menu_item "
      >
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center position-relative">
          <i className="fa-solid fa-file-lines"></i>
          <span>{t("nav.myWorks")}</span>{" "}
          <span
            className="notification_span position-absolute"
            style={
              lang === "ar"
                ? { top: "-12px", left: "-8px" }
                : { top: "-12px", left: "8px" }
            }
          >
            0
          </span>
        </div>
      </NavLink>
      <NavLink to="/my-profile" className="menu_item">
        <i className="fa-regular fa-user"></i>
        <span>{t("nav.myProfile")}</span>
      </NavLink>
    </div>
  );
}

export default ResponsiveNav;
