import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import UserDropDown from "./website/UserDropDown";
import LangDropdown from "./website/LangDropdown";
import { useTranslation } from "react-i18next";

export default function Header() {
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) headerRef.current.classList.add("scrolled");
      else headerRef.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav className="container">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </Link>

        {/* <div className={`layer ${openMenu ? "open" : ""}`}></div> */}

        <ul className={`nav-links ${openMenu ? "open" : ""}`}>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/"}>{t("website.header.home")}</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/how-it-works"}>
              {t("website.header.howitWorks")}
            </NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/about"}>{t("website.header.aboutUs")}</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to={"/contact"}>{t("website.header.contactUs")}</NavLink>
          </li>

          <li className="mobile-only">
            <NavLink to="/login">{t("website.header.login")}</NavLink>
          </li>
          <li className="mobile-only">
            <NavLink to="/register">{t("website.header.signUp")}</NavLink>
          </li>
        </ul>

        <div className="actions">
          <Link to="/login" className="auth-btn login-btn">
            {t("website.header.login")}{" "}
          </Link>
          <LangDropdown />

          <UserDropDown />
        </div>

        <button className="toggle_menu" onClick={handleToggleMenu}>
          <i className="fa-light fa-bars"></i>
        </button>
      </nav>
    </header>
  );
}
