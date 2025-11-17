import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function OptionsMenu({ toggleButton, options = [] }) {
  const { lang } = useSelector((state) => state.language);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="options-menu" ref={menuRef}>
      {/* Trigger Icon */}
      <i
        className={`${
          toggleButton ? toggleButton : "fas fa-ellipsis-v"
        } options-toggle rouded-back-button`}
        onClick={toggleMenu}
      ></i>

      {/* Dropdown */}
      {menuOpen && (
        <div className={`options-list  ${lang === "en" ? "en" : ""} `}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`options-item ${option.className || ""}`}
              {...options?.props}
              onClick={() => {
                option.onClick?.();
                setMenuOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
