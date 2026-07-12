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
import useAdminPermissions from "../../hooks/auth/dashboard/useAdminPermissions";
import { DASHBOARD_PERMISSIONS } from "../../utils/dashboardPermissions";
export default function SideBar({ hoverExpand, setHoverExpand, collapsed }) {
  const [sideClass, setSideClass] = useState("");
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const { hasAnyPermission } = useAdminPermissions();

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

  const mainNavigationItems = [
    {
      to: "/dashboard",
      end: true,
      icon: homeIcon,
      iconAlt: "dashboard",
      label: t("dashboard.main"),
      permission: DASHBOARD_PERMISSIONS.HOME,
    },
    {
      to: "notifications",
      end: true,
      icon: notificationsIcon,
      iconAlt: "notifications",
      label: t("dashboard.notifications.title"),
    },
    {
      to: "tasks",
      end: true,
      icon: tasksIcon,
      iconAlt: "Manage-Listings-icon",
      label: t("dashboard.my_tasks"),
      permission: DASHBOARD_PERMISSIONS.TASKS,
    },
    {
      to: "profile",
      end: true,
      icon: employmentDataIcon,
      iconAlt: "employment-data",
      label: t("dashboard.employment_data"),
    },
    {
      to: "reports/users",
      end: true,
      icon: performanceReportsIcon,
      iconAlt: "reports",
      label: t("dashboard.performance_reports"),
      permission: DASHBOARD_PERMISSIONS.REPORTS,
    },
    {
      to: "withdraw-requests",
      end: true,
      icon: balanceWithdrawalIcon,
      iconAlt: "withdraw requests",
      label: t("dashboard.withdraw_requests"),
      permission: DASHBOARD_PERMISSIONS.WITHDRAW_REQUESTS,
    },
  ];

  const visibleMainNavigationItems = mainNavigationItems.filter((item) =>
    hasAnyPermission(item.permission),
  );

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
        {visibleMainNavigationItems.map((item) => (
          <li className="nav_item mb-2" key={item.to}>
            <NavLink to={item.to} end={item.end}>
              <div className="icon">
                <img src={item.icon} alt={item.iconAlt} />
              </div>
              <h6>{item.label}</h6>
            </NavLink>
          </li>
        ))}

        {/* Sub Navigation Accordion */}
        <SidebarNavigation />
      </ul>
    </aside>
  );
}
