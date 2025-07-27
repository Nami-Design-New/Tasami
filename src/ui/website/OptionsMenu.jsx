import React from "react";

export default function OptionsMenu({ onInquiry, onReport }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="options-menu">
      <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
      {menuOpen && (
        <div className="options-list">
          <button
            onClick={() => {
              onInquiry();
              setMenuOpen(false);
            }}
          >
            استفسار
          </button>
          <button
            onClick={() => {
              onReport();
              setMenuOpen(false);
            }}
            className="text-danger"
          >
            إبلاغ عن مخالفة
          </button>
        </div>
      )}
    </div>
  );
}
