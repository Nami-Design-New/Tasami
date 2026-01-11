import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import navLogo from "../assets/icons/navlogo.svg";

function ResponsiveNav() {
  const { t } = useTranslation();

  return (
    <div className="small_menu">
      <NavLink to="/" className="menu_item">
        <img src={navLogo} alt="fav" />
        <span>{t("nav.start")}</span>
      </NavLink>
      <NavLink
        aria-label={t("nav.myWorks")}
        to="/my-works"
        className="menu_item"
      >
        <i className="fa-solid fa-file-lines"></i>
        <span>{t("nav.myWorks")}</span>
      </NavLink>
      <NavLink to="/my-profile" className="menu_item">
        <i className="fa-regular fa-user"></i>
        <span>{t("nav.myProfile")}</span>
      </NavLink>
    </div>
  );
}

export default ResponsiveNav;
