import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import subArrow from "../../assets/sys-icons/subArrow.svg";
import participantsAndStaff from "../../assets/dashboard-icons/participants-and-staff.svg";
import listManagement from "../../assets/dashboard-icons/list-management.svg";
import websiteManagment from "../../assets/dashboard-icons/website-managment.svg";
import useAdminPermissions from "../../hooks/auth/dashboard/useAdminPermissions";
import {
  DASHBOARD_PERMISSIONS,
  SUBSCRIBERS_AND_TEAM_PERMISSIONS,
  LIST_MANAGEMENT_PERMISSIONS,
  WEBSITE_MANAGEMENT_PERMISSIONS,
} from "../../utils/dashboardPermissions";

export default function SidebarNavigation() {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const { hasAnyPermission } = useAdminPermissions();

  const sections = [
    {
      eventKey: "1",
      icon: participantsAndStaff,
      iconAlt: "markiting-icon",
      title: t("dashboard.subscribers_and_team"),
      permission: SUBSCRIBERS_AND_TEAM_PERMISSIONS,
      items: [
        {
          to: "user-accounts",
          label: t("dashboard.subscribers"),
          permission: DASHBOARD_PERMISSIONS.USERS,
        },
        {
          to: "teams",
          label: t("dashboard.myTeam"),
          permission: DASHBOARD_PERMISSIONS.EMPLOYEES,
        },
      ],
    },
    {
      eventKey: "3",
      icon: listManagement,
      iconAlt: "list-management",
      title: t("dashboard.list_management"),
      permission: LIST_MANAGEMENT_PERMISSIONS,
      items: [
        {
          to: "list-management/operating-sectors",
          label: t("dashboard.operating_areas"),
          permission: DASHBOARD_PERMISSIONS.REGIONS,
        },
        {
          to: "list-management/working-groups",
          label: t("dashboard.working_groups"),
          permission: DASHBOARD_PERMISSIONS.WORKING_GROUPS,
        },
        {
          to: "list-management/fields-and-specializations",
          label: t("dashboard.fields_specializations"),
          permission: [
            DASHBOARD_PERMISSIONS.CATEGORIES,
            DASHBOARD_PERMISSIONS.SUBCATEGORIES,
          ],
        },
        {
          to: "list-management/administrative-systems",
          label: t("dashboard.admin_systems"),
          permission: DASHBOARD_PERMISSIONS.TASK_SYSTEMS,
        },
      ],
    },
    {
      eventKey: "4",
      icon: websiteManagment,
      iconAlt: "website-managment",
      title: t("dashboard.website_management"),
      permission: WEBSITE_MANAGEMENT_PERMISSIONS,
      items: [
        {
          to: "violations-management",
          label: t("dashboard.violations"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "social-links-management",
          label: t("dashboard.social_links"),
          permission: DASHBOARD_PERMISSIONS.SOCIAL_LINKS,
        },
        {
          to: "content-management",
          label: t("dashboard.content_management"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "faq-management",
          label: t("dashboard.faq"),
          permission: DASHBOARD_PERMISSIONS.FAQS,
        },
        {
          to: "tasks-management",
          label: t("dashboard.task_categories"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "subscription-management",
          label: t("dashboard.subscription_management"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "banners",
          label: t("dashboard.ad_banners"),
          permission: DASHBOARD_PERMISSIONS.BANNERS,
        },
        {
          to: "nationalities-management",
          label: t("dashboard.nationalities"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "about-content",
          label: t("dashboard.aboutTasamii"),
          permission: DASHBOARD_PERMISSIONS.SETTINGS,
        },
        {
          to: "public-notifications",
          label: t("dashboard.publicNotifications"),
          permission: DASHBOARD_PERMISSIONS.GENERAL_NOTIFICATIONS,
        },
      ],
    },
  ];

  const visibleSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => hasAnyPermission(item.permission)),
    }))
    .filter(
      (section) =>
        hasAnyPermission(section.permission) && section.items.length > 0,
    );

  return (
    <>
      <Accordion className={lang === "en" && "en"}>
        {visibleSections.map((section) => (
          <Accordion.Item eventKey={section.eventKey} key={section.eventKey}>
            <Accordion.Header>
              <div className="icon">
                <img src={section.icon} alt={section.iconAlt} />
              </div>
              <div className="d-flex flex-column">
                <h6>{section.title}</h6>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              <ul className="sub_navigation_menu">
                {section.items.map((item) => (
                  <li className="sub_nav_item" key={item.to}>
                    <NavLink to={item.to}>
                      <img src={subArrow} alt="arrow" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
