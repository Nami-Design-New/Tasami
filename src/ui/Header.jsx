import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const header = useRef(null);
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.current.classList.add("animate");
      } else {
        header.current.classList.remove("animate");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setClosing(false);
    }, 300);
  };

  return (
    <header className="landing_header" ref={header}>
      <nav>
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="" />
        </Link>

        <ul
          className={`nav_links ${showMenu ? "active" : ""} ${
            closing ? "closing" : ""
          }`}
          ref={menuRef}
        >
          <li onClick={handleCloseMenu} className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/">الرئيسية</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/how-it-works">كيف تعمل المنصه</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/fleet">عن تسامي</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/services">الخدمات</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/memberships">الاسئله الشائعه</NavLink>
          </li>

          <li onClick={handleCloseMenu} className="hide-lg">
            <NavLink to="/login">تسجيل </NavLink>
          </li>

          <li onClick={handleCloseMenu} className="hide-lg">
            <NavLink to="/register">انشاء حساب</NavLink>
          </li>

          <button className="close" onClick={handleCloseMenu}>
            <i className="fa-light fa-xmark"></i>
          </button>
        </ul>

        <div className="actions">
          <Link to="/login"> تسجيل الدخول </Link>
          <Link to="/register" className="button">
            انشاء حساب
          </Link>
        </div>

        <div className="toggeler" onClick={() => setShowMenu(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}
