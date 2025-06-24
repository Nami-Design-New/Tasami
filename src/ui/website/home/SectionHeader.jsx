import React from "react";
import { Link } from "react-router";

export default function SectionHeader({
  title,
  tabs = [],
  activeTab,
  onTabChange,
  resultCount,
  placeholder = "ابحث هنا",
  onSearchChange,
  searchValue = "",
  showBack = true,
}) {
  return (
    <section className="section-header">
      <div className="page-header">
        {showBack && (
          <Link to="/" className="back-btn">
            <i className="fa-solid fa-angle-right"></i>
          </Link>
        )}
        <h1>{title}</h1>
      </div>

      <div className="filters">
        <div className="filter-row">
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
          <button>
            <i className="fa-regular fa-filter-circle-xmark"></i>
          </button>
        </div>
      </div>

      {tabs.length > 0 && (
        <div className="tags-row">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={`tag ${activeTab === tab ? "active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      )}

      <div className="total">
        <strong>{resultCount}</strong> {title}
      </div>
    </section>
  );
}
