import { NavLink } from "react-router";
import SidebarNavigation from "./SidebarNavigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function SideBar({ hoverExpand, setHoverExpand, collapsed }) {
  const [sideClass, setSideClass] = useState("");
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  const isLargeScreen = () => window.matchMedia("(min-width: 992px)").matches;

  useEffect(() => {
    if (!collapsed) {
      setSideClass("expanded");
    } else if (hoverExpand && collapsed && isLargeScreen()) {
      setSideClass("hoverExpand");
    } else {
      setSideClass("");
    }
  }, [hoverExpand, collapsed]);

  return (
    <aside
      className={`side_bar ${sideClass} ${lang === "en" ? "en" : "ar"}`}
      onMouseEnter={() => {
        if (isLargeScreen()) setHoverExpand(true);
      }}
      onMouseLeave={() => {
        if (isLargeScreen()) setHoverExpand(false);
      }}
    >
      {/* Logo Section */}
      <div className="logo_wrapper">
        <span className="logo_container">
          <img
            src="/images/my-fav.svg"
            alt="fav"
            className="logo_img fav_logo"
          />
          <div
            className={`logo_name ${
              collapsed && !hoverExpand ? "hidden" : "visible"
            }`}
          >
            {t("dashboard.brand")}
          </div>
        </span>
      </div>

      {/* Main Navigation */}
      <ul className="navigation_menu">
        <li className="nav_item mb-2">
          <NavLink to="/dashboard" end>
            <div className="icon">
              <img src="/sys-icons/Dashboard.svg" alt="dashboard" />
            </div>
            <h6>{t("dashboard.main")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="notifications" end>
            <div className="icon">
              <img src="/sys-icons/notification.svg" alt="notifications" />
            </div>
            <h6>{t("dashboard.notifications.title")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="tasks" end>
            <div className="icon">
              <img
                src="/sys-icons/manage-listing.svg"
                alt="Manage-Listings-icon"
              />
            </div>
            <h6>{t("dashboard.my_tasks")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="profile" end>
            <div className="icon">
              <img src="/icons/data-icon.svg" alt="employment-data" />
            </div>
            <h6>{t("dashboard.employment_data")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="reports/users" end>
            <div className="icon">
              <img src="/sys-icons/Reports.svg" alt="reports" />
            </div>
            <h6>{t("dashboard.performance_reports")}</h6>
          </NavLink>
        </li>

        {/* Sub Navigation Accordion */}
        <SidebarNavigation />
      </ul>
    </aside>
  );
}
