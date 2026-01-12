import { Link, NavLink } from "react-router";
import SidebarNavigation from "./SidebarNavigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import homeIcon from "../../assets/dashboard-icons/home.svg";
import notificationsIcon from "../../assets/dashboard-icons/notifications.svg";
import tasksIcon from "../../assets/dashboard-icons/tasks.svg";
import employmentDataIcon from "../../assets/dashboard-icons/employment-data.svg";
import performanceReportsIcon from "../../assets/dashboard-icons/performance-reports.svg";
import balanceWithdrawalIcon from "../../assets/dashboard-icons/balance-withdrawal.svg";
import favIcon from "../../assets/images/my-fav.svg";
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
          <Link to={"/dashboard"}>
            <img src={favIcon} alt="fav" className="logo_img fav_logo" />
          </Link>
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
              <img src={homeIcon} alt="dashboard" />
            </div>
            <h6>{t("dashboard.main")}</h6>
          </NavLink>
        </li>
        <li className="nav_item mb-2">
          <NavLink to="notifications" end>
            <div className="icon">
              <img src={notificationsIcon} alt="notifications" />
            </div>
            <h6>{t("dashboard.notifications.title")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="tasks" end>
            <div className="icon">
              <img src={tasksIcon} alt="Manage-Listings-icon" />
            </div>
            <h6>{t("dashboard.my_tasks")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="profile" end>
            <div className="icon">
              <img src={employmentDataIcon} alt="employment-data" />
            </div>
            <h6>{t("dashboard.employment_data")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="reports/users" end>
            <div className="icon">
              <img src={performanceReportsIcon} alt="reports" />
            </div>
            <h6>{t("dashboard.performance_reports")}</h6>
          </NavLink>
        </li>

        <li className="nav_item mb-2">
          <NavLink to="withdraw-requests" end>
            <div className="icon">
              <img src={balanceWithdrawalIcon} alt="withdraw requests" />
            </div>
            <h6>{t("dashboard.withdraw_requests")}</h6>
          </NavLink>
        </li>

        {/* Sub Navigation Accordion */}
        <SidebarNavigation />
      </ul>
    </aside>
  );
}
