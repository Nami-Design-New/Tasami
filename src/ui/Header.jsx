import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import LangDropdown from "./website/LangDropdown";
import UserDropDown from "./website/UserDropDown";
import CustomButton from "./CustomButton";
import PlatformModal from "./website/platform/PlatformModal";
import { Badge } from "react-bootstrap";
import useSettings from "../hooks/website/settings/useSettings";
import CustomLink from "./CustomLink";
export default function Header() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isAuthed, user } = useSelector((state) => state.authRole);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const menu = document.querySelector(".nav-links");
      const toggler = document.querySelector(".toggle_menu");

      if (
        openMenu &&
        !menu.contains(e.target) &&
        !toggler.contains(e.target) &&
        !e.target.closest(".nav-links a")
      ) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [openMenu]);

  const handleToggleMenu = () => setOpenMenu(!openMenu);

  return (
    <header className="main-header" ref={headerRef}>
      <nav className="container-lg p-0">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
        <ul className={`nav-links container-lg ${openMenu ? "open" : ""}`}>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/"}>{t("website.header.home")}</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/my-works"}>{t("website.header.myWorks")}</NavLink>
          </li>
          {user && (
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to={"/how-it-works"}>
                {t("website.header.howitWorks")}
              </NavLink>
            </li>
          )}
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/about"}>{t("website.header.aboutUs")}</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/contact"}>{t("website.header.contactUs")}</NavLink>
          </li>
          {!isAuthed && (
            <>
              <li className="mobile-only">
                <NavLink to="/login">{t("website.header.login")}</NavLink>
              </li>
              <li className="mobile-only">
                <NavLink to="/register">{t("website.header.signUp")}</NavLink>
              </li>
            </>
          )}{" "}
          {isAuthed && (
            <CustomButton
              size="small"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                user.about ? navigate("my-platform") : setShowModal(true);
                setOpenMenu(false);
              }}
              className="mobile-only"
            >
              <i className="fa-regular fa-robot mx-1"></i>
              {t("profile.assistant")}
            </CustomButton>
          )}
        </ul>

        <div className="actions">
          <LangDropdown />
          {isAuthed && (
            <Link to="/notifications" className="notification-btn">
              <i className="fa-regular fa-bell">
                {settings?.notification_count >= 0 && (
                  <Badge>
                    {settings?.notification_count > 99
                      ? "99+"
                      : settings?.notification_count}
                  </Badge>
                )}
              </i>
            </Link>
          )}
          <Link className="communites-link" to="/reels">
            <img src="./icons/communities.svg" />
            <span>{t("website.header.communities")}</span>
          </Link>{" "}
          {isAuthed && (
            <CustomButton
              size="small"
              className="d-none d-sm-flex"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                if (user) {
                  if (
                    user?.country !== null &&
                    user?.city !== null &&
                    user?.nationality !== null
                  ) {
                    user.about ? navigate("my-platform") : setShowModal(true);
                  } else {
                    navigate("/customize-services");
                  }
                }
              }}
            >
              <i className="fa-regular fa-robot"></i>
              {t("profile.assistant")}
            </CustomButton>
          )}
          {isAuthed && <UserDropDown />}
          {!isAuthed && (
            <CustomLink
              type="outlined"
              to="/login"
              className="auth-btn login-btn"
              size="small"
            >
              {t("website.header.login")}
            </CustomLink>
          )}
          {openMenu ? (
            <button className="toggle_menu" onClick={handleToggleMenu}>
              <i className="fa-light fa-xmark"></i>
            </button>
          ) : (
            <button className="toggle_menu" onClick={handleToggleMenu}>
              <i className="fa-light fa-bars"></i>
            </button>
          )}
        </div>
      </nav>
      <PlatformModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
}
