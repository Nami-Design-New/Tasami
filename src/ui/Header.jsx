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
            <NavLink to="/">Home</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/how-it-works">How It Works</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/fleet">Fleet</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li onClick={handleCloseMenu}>
            <NavLink to="/memberships">Memberships types</NavLink>
          </li>

          <li onClick={handleCloseMenu} className="hide-lg">
            <NavLink to="/login">Login</NavLink>
          </li>

          <li onClick={handleCloseMenu} className="hide-lg">
            <NavLink to="/register">Register</NavLink>
          </li>

          <button className="close" onClick={handleCloseMenu}>
            <i className="fa-light fa-xmark"></i>
          </button>
        </ul>

        <div className="actions">
          <Link to="/login">Login</Link>
          <Link to="/register" className="button">
            Register
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
