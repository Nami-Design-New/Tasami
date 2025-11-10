import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

export default function SidebarNavigation() {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();

  return (
    <>
      <Accordion className={lang === "en" && "en"}>
        {/* === Subscribers & Team === */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="icon">
              <img
                src="/sys-icons/markiting-promotion.svg"
                alt="markiting-icon"
              />
            </div>
            <div className="d-flex flex-column">
              <h6>{t("dashboard.subscribers_and_team")}</h6>
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="user-accounts">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.subscribers")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="teams">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.team")}</span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* === List Management === */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="icon">
              <img src="/sys-icons/guest-details.svg" alt="Analytics" />
            </div>
            <div className="d-flex flex-column">
              <h6>{t("dashboard.list_management")}</h6>
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="list-management/operating-sectors">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.operating_areas")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/working-groups">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.working_groups")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/fields-and-specializations">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.fields_specializations")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/administrative-systems">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.admin_systems")}</span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* === Website Management === */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <div className="icon">
              <img src="/sys-icons/website-manage.svg" alt="Analytics" />
            </div>
            <div className="d-flex flex-column">
              <h6>{t("dashboard.website_management")}</h6>
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="violations-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.violations")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="social-links-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.social_links")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="content-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.content_management")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="faq-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.faq")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="tasks-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.task_categories")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="subscription-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.subscription_management")}</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="banners">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>{t("dashboard.ad_banners")}</span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
