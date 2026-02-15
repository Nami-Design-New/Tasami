import { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/images/logo.svg";
import useSettings from "../hooks/website/settings/useSettings";
import useGetCountersNotify from "../hooks/website/useGetCountersNotify";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";
import LangDropdown from "./website/LangDropdown";
import PlatformModal from "./website/platform/PlatformModal";
import UserDropDown from "./website/UserDropDown";

export default function Header() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isAuthed, user } = useSelector((state) => state.authRole);
  const { counterNotify } = useGetCountersNotify();

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
      <nav className=" p-0">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <ul className={`nav-links container-lg ${openMenu ? "open" : ""}`}>
          <li
            onClick={() => setOpenMenu(false)}
            className={"d-none  d-lg-flex  second-color"}
          >
            <NavLink to={"/"}>{t("website.header.home")}</NavLink>
          </li>
          {user && (
            <>
              <li onClick={() => setOpenMenu(false)} className={"second-color"}>
                <NavLink
                  className={"d-none align-items-center gap-2 d-lg-flex"}
                  to={"/my-works"}
                >
                  {t("website.header.myWorks")}
                  {counterNotify?.total_of_unread_work_without_finished > 0 && (
                    <span className="notification_span">
                      {counterNotify?.total_of_unread_work_without_finished}
                    </span>
                  )}
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)} className={"second-color"}>
                <NavLink to={"/my-profile"} className={"d-none  d-lg-flex"}>
                  {t("website.header.myAccount")}
                </NavLink>
              </li>
            </>
          )}
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/about"}>{t("website.header.aboutUs")}</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/how-it-works"}>
              {t("website.header.howitWorks")}
            </NavLink>
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
          )}
          {isAuthed && (
            <CustomButton
              size="small"
              style={{ whiteSpace: "nowrap" }}
              variant="outlined"
              onClick={() => {
                user.about ? navigate("my-platform") : setShowModal(true);
                setOpenMenu(false);
              }}
              className="mobile-only  gap-2 align-items-center   rounded-pill"
            >
              <i className="fa-regular fa-robot mx-1"></i>
              {t("profile.assistant")}{" "}
              {counterNotify?.total_of_platform > 0 && (
                <span className="notification_span">
                  {counterNotify?.total_of_platform}
                </span>
              )}
            </CustomButton>
          )}
        </ul>

        <div className="actions">
          {" "}
          <Link className="communites-link" to="/reels">
            {/* <img src={communities} /> */}
            <span>{t("website.header.communities")}</span>
          </Link>
          <LangDropdown />
          {isAuthed && (
            <Link to="/notifications" className="notification-btn">
              <i className="fa-regular fa-bell">
                {settings?.notification_count > 0 && (
                  <Badge>
                    {settings?.notification_count > 99
                      ? "99+"
                      : settings?.notification_count}
                  </Badge>
                )}
              </i>
            </Link>
          )}
          {isAuthed && (
            <CustomButton
              size="small"
              className="d-none d-lg-flex rounded-pill  "
              variant="outlined"
              style={{ fontSize: "14px", whiteSpace: "nowrap" }}
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
              {counterNotify?.total_of_platform > 0 && (
                <span className="notification_span">
                  {counterNotify?.total_of_platform}
                </span>
              )}
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
