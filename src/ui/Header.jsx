import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const headerRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) headerRef.current.classList.add("scrolled");
      else headerRef.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setClosing(false);
    }, 300);
  };

  return (
    <header className="main-header" ref={headerRef}>
      <nav className="container">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </Link>

        <ul className={`nav-links ${showMenu ? "active" : ""} ${closing ? "closing" : ""}`}>
          <button className="close-btn" onClick={handleCloseMenu}>
            <i className="fa-light fa-xmark"></i>
          </button>
          {["/", "/how-it-works", "/about", "/services", "/contact"].map((path, index) => (
            <li key={index} onClick={handleCloseMenu}>
              <NavLink to={path}>{getLinkText(path)}</NavLink>
            </li>
          ))}
          <li className="mobile-only" onClick={handleCloseMenu}>
            <NavLink to="/login">تسجيل الدخول</NavLink>
          </li>
          <li className="mobile-only" onClick={handleCloseMenu}>
            <NavLink to="/register">إنشاء حساب</NavLink>
          </li>
        </ul>

      <div className="actions">
  <Link to="/login" className="auth-btn login-btn">تسجيل الدخول</Link>
  <Link to="/register" className="auth-btn register-btn">إنشاء حساب</Link>
</div>


        <div className="menu-toggler" onClick={() => setShowMenu(true)}>
          <span></span><span></span><span></span>
        </div>
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
