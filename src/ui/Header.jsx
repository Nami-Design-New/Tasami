import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import UserDropDown from "./website/UserDropDown";

export default function Header() {
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

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

        <div className={`layer ${openMenu ? "open" : ""}`}></div>

        <ul className={`nav-links ${openMenu ? "open" : ""}`}>
          {["/", "/how-it-works", "/about", "/services", "/contact"].map((path, i) => (
            <li key={i} onClick={() => setOpenMenu(false)}>
              <NavLink to={path}>{getLinkText(path)}</NavLink>
            </li>
          ))}
          <li className="mobile-only">
            <NavLink to="/login">تسجيل الدخول</NavLink>
          </li>
          <li className="mobile-only">
            <NavLink to="/register">إنشاء حساب</NavLink>
          </li>
        </ul>

        <div className="actions">
          <Link to="/login" className="auth-btn login-btn">تسجيل الدخول</Link>
         <UserDropDown />

        </div>

        <button className="toggle_menu" onClick={handleToggleMenu}>
          <i className="fa-light fa-bars"></i>
        </button>
      </nav>
    </header>
  );

  function getLinkText(path) {
    switch (path) {
      case "/": return "الرئيسية";
      case "/how-it-works": return "كيف تعمل المنصة";
      case "/about": return "عن تسامي";
      case "/contact": return "اتصل بنا";
      default: return "";
    }
  }
}
