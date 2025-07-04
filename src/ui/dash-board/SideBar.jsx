import { NavLink } from "react-router";
import SidebarNavigation from "./SidebarNavigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SideBar({ hoverExpand, setHoverExpand, collapsed }) {
  const [sideClass, setSideClass] = useState("");
  const lang = useSelector((state) => state.language.lang);

  // Check if screen is larger than tablet size
  const isLargeScreen = () => {
    return window.matchMedia("(min-width: 992px)").matches;
  };

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
      className={`side_bar  ${sideClass} ${lang === "en" ? "en" : "ar"}`}
      onMouseEnter={() => {
        if (isLargeScreen()) {
          setHoverExpand(true);
        }
      }}
      onMouseLeave={() => {
        if (isLargeScreen()) {
          setHoverExpand(false);
        }
      }}
    >
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
            تسامي
          </div>
        </span>
      </div>

      {/* navigation menu */}
      <ul className="navigation_menu">
        <li className="nav_item mb-2">
          <NavLink to="/dashboard" end>
            <div className="icon">
              <img src="/sys-icons/Dashboard.svg" alt="dashboard" />
            </div>
            <h6>الرئيسية</h6>
          </NavLink>
        </li>
        <li className="nav_item mb-2">
          <NavLink to="notifications" end>
            <div className="icon">
              <img src="/sys-icons/notification.svg" alt="notifications" />
            </div>
            <h6>التنبيهات</h6>
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
            <h6> المهام </h6>
          </NavLink>
        </li>
        <li className="nav_item mb-2">
          <NavLink to="profile" end>
            <div className="icon">
              <img src="/icons/data-icon.svg" alt="emploment data Icon" />
            </div>
            <h6> البيانات الوظيفيه </h6>
          </NavLink>
        </li>
        <li className="nav_item mb-2">
          <NavLink to="reports/users" end>
            <div className="icon">
              <img src="/sys-icons/Reports.svg" alt="Analytics" />
            </div>
            <h6> تقارير الاداء </h6>
          </NavLink>
        </li>
        <SidebarNavigation />
      </ul>
    </aside>
  );
}
